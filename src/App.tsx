import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import Button from 'react-bootstrap/Button';
import {
  signInWithGoogle,
  signOut,
  unauthenticatedState,
  onAuthStateChange
} from './firebase';

import 'bootstrap/dist/css/bootstrap.min.css';
import ImageWrap from './ImageWrap';
import photograph from './assets/icons/photograph.svg';
import { getUserImageUrls } from './controller';
import './App.css';

function App() {
  // Default auth status of user is not signed in.
  const [authStatus, setAuthStatus] = useState(unauthenticatedState);
  // Provides details of signed in user.
  const [user, setUser] = useState({ name: '', email: '' });
  // The user saved images.
  const [userImageUrls, setUserImageUrls] = useState(Array<string>());

  // Retrieves authentication information from firebase.
  // This runs similarly to componentDidMount().
  useEffect(() => {
    onAuthStateChange(setAuthStatus, setUser);
    if (authStatus.authenticated) {
      getUserImageUrls(setUserImageUrls);
    }
  }, [authStatus]);

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
          <div className="pa4">
            <p>Hi {user['name']}. This is your personal photo album.</p>
            <p>Add new images by drag dropping them here.</p>
          </div>
          <div>
            <ImageWrap imageUrls={userImageUrls} />
          </div>
          <div className='pa4'>
            <span>
              <span className="pa2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    console.log('Sign out button clicked');
                    signOut();
                  }}
                >
                  Sign out
                </Button>
              </span>
              <span className="pa2">
                <Button
                  variant="primary"
                  onClick={async () => {
                    console.log('Refresh button clicked');
                    getUserImageUrls(setUserImageUrls);
                  }}
                >
                  Refresh
                </Button>
              </span>
            </span>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
