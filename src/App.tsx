import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import Button from 'react-bootstrap/Button';
import {
  signInWithGoogle,
  signOut,
  unauthenticatedState,
  onAuthStateChange,
  getToken
} from './firebase';

import 'bootstrap/dist/css/bootstrap.min.css';
import photograph from './assets/icons/photograph.svg';
import { getDecodedId } from './controller';
import './App.css';

function App() {
  // Default auth status of user is not signed in.
  const [authStatus, setAuthStatus] = useState(unauthenticatedState);
  // Provides details of signed in user.
  const [user, setUser] = useState({ name: '', email: '' });
  // Retrieves authentication information from firebase.
  // This runs similarly to componentDidMount().
  useEffect(() => {
    return onAuthStateChange(setAuthStatus, setUser);
  }, []);

  if (!authStatus.authenticated) {
    // If user is not signed in.
    return (
      <div className="App">
        <header className="App-header">
          <img src={photograph} className="App-logo" alt="logo" />
          <div className="pa4">
            <p>Welcome to my Photo App.</p>
            <p>Sign-in below to continue.</p>
          </div>
          <GoogleButton
            onClick={() => {
              console.log('Google button clicked');
              signInWithGoogle();
            }}
          />
        </header>
      </div>
    );
  } else {
    // If user is signed in.
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <p>Hi {user['name']}.</p>
            <p>This is your personal photo album.</p>
          </div>
          <div className="pa2">
            <Button
              variant="primary"
              onClick={() => {
                console.log('Sign out button clicked');
                signOut();
              }}
            >
              Sign out
            </Button>
          </div>
          <div className="pa2">
            <Button
              variant="secondary"
              onClick={async () => {
                console.log('Refresh button clicked');
                const token = await getToken();
                getDecodedId(token);
              }}
            >
              Refresh
            </Button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
