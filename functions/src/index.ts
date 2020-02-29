import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';

admin.initializeApp();
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

app.use(corsHandler);
app.use(validateFirebaseIdToken);
app.get('/', (req, res) => {
  res.status(200).send(`Hello ${req.body.user.name}`);
});

exports.images = functions.https.onRequest(app);
