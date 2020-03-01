import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';

admin.initializeApp();
const db = admin.firestore();

const app = express();
const corsHandler = cors({ origin: true });

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const validateFirebaseIdToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log('Check if request is authorized with Firebase ID token');

  if (!req.headers.authorization) {
    console.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
      'or by passing a "__session" cookie.'
    );
    res.status(403).send('No token was passed in the Authorization header');
    return;
  }

  let idToken;
  if (req.headers.authorization) {
    console.log('Found "Authorization" header');
    idToken = req.headers.authorization;
  } else {
    res.status(403).send('Unauthorized token');
    return;
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    console.log('ID Token correctly decoded', decodedIdToken);
    req.body.user = decodedIdToken;
    next();
    return;
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized due to an error');
    return;
  }
};

// This retrieves the list of image urls of a user via his or her uid.
const fetchImageUrls = async (uid: string): Promise<Array<string>> => {
  // This array will contain the resultant user image urls.
  const imageUrls = new Array<string>();
  const imageUrlsRef = db.collection(`users/${uid}/images`);
  // Add each document into the resultant array.
  await imageUrlsRef.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      imageUrls.push(doc.data()['imageUrl']);
    });
  });
  return imageUrls;
};

// Add required middlewares.

// Handles cross-origin requests.
app.use(corsHandler);
// Authenticates user via token every time.
app.use(validateFirebaseIdToken);

app.get('/', async (req, res) => {
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  const uid: string = req.body.user.uid;
  console.log(`Retrieving images of user with uid: ${req.body.user.uid}`);
  res.send(JSON.stringify(await fetchImageUrls(uid)));
});

app.post('/', async (req, res) => {
  console.log(`Received ${JSON.stringify(req.body)}`);
  // This is the uid of the user who uploaded.
  const uid: string = req.body.user.uid;
  // Take reference to the directory of the user's image urls.
  const imageUrlsRef = db.collection(`users/${uid}/images`);

  try {
    // Add the image url to the directory on firestore.
    await imageUrlsRef.doc().set(req.body);
    // Respond with 200 OK status code if all goes well.
    res.status(200).send("User's saved image urls are successfully updated!");
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

exports.images = functions.https.onRequest(app);
