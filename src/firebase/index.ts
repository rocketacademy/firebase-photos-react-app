import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBV08FcT_iCjbY3-_UKlrwlVhYlh7dcwzE',
  authDomain: 'photos-react-app.firebaseapp.com',
  databaseURL: 'https://photos-react-app.firebaseio.com',
  projectId: 'photos-react-app',
  storageBucket: 'photos-react-app.appspot.com',
  messagingSenderId: '544702107184',
  appId: '1:544702107184:web:49b51dde05ffedf015a7f5',
  measurementId: 'G-8C8G85B81H'
};

// This creates the Firebase app.
firebase.initializeApp(firebaseConfig);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
  await firebase.auth().signInWithRedirect(googleAuthProvider);
  firebase
    .auth()
    .getRedirectResult()
    .then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = result.credential as firebase.auth.OAuthCredential;
        const token = credential.accessToken;
        console.log(`Retrieved token: ${token}`);
      }
      // The signed-in user info.
      const user = result.user;
      console.log(`Signed in user: ${user}`);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      console.log(
        `Error ${errorCode}: ${errorMessage}. Affected user: ${email}`
      );
    });
};

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      console.log(
        `Error ${errorCode}: ${errorMessage}. Affected user: ${email}`
      );
    });
};

export const authenticatedState = { authenticated: true };
export const unauthenticatedState = { authenticated: false };

// This provides the authentication status of the user via callback.
export const onAuthStateChange = (authHook: Function, userHook: Function) => {
  return firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      // This token will be verified by the backend when fetching images.
      // const token = await user.getIdTokenResult();
      authHook(authenticatedState);
      userHook({ name: user.displayName, email: user.email });
    } else {
      authHook(unauthenticatedState);
      userHook({ name: '', email: '' });
    }
  });
};

// Fetches the most recent verification token to be used for authenticated requests.
export const getToken = () => {
  if (firebase.auth().currentUser != null) {
    // Returns to the user the verification token.
    return firebase.auth().currentUser!.getIdToken();
  } else {
    // User is not signed in.
    throw Error(
      'User needs to be signed in before a token can be issued by firebase'
    );
  }
};
