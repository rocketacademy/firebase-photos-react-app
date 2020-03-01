import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import Button from 'react-bootstrap/Button';
import {
  signInWithGoogle,
  signOut,
  unauthenticatedState,
  onAuthStateChange
} from '../firebase';

import 'bootstrap/dist/css/bootstrap.min.css';
import ImageWrap from './ImageWrap';
import UploadButton from './UploadButton';
import photograph from '../assets/icons/photograph.svg';
import { getUserImageUrls } from '../controllers/imageFetch';
import './App.css';
import Row from 'react-bootstrap/Row';

function App() {
  // Default auth status of user is not signed in.
  const [authStatus, setAuthStatus] = useState(unauthenticatedState);
  // Provides details of signed in user.
  const [user, setUser] = useState({ name: '', email: '' });
  // The user saved images.
  const [userImageUrls, setUserImageUrls] = useState(Array<string>());
  // Serves as a callback to update the image view when a new image is uploaded.
  const [uploadState, setUploadState] = useState();

  // Retrieves authentication information from firebase.
  // This runs similarly to componentDidMount().
  useEffect(() => {
    onAuthStateChange(setAuthStatus, setUser);
    if (authStatus.authenticated) {
      getUserImageUrls(setUserImageUrls);
    }
  }, [authStatus]);

  useEffect(() => {
    console.log('Updating user image urls');
    getUserImageUrls(setUserImageUrls);
  }, [uploadState]);

  if (!authStatus.authenticated) {
    // If user is not signed in.
    return (
      <div className="App">
        <header className="App-header">
          <div className="mt5">
            <img src={photograph} className="App-logo" alt="logo" />
            <div className="pa4">
              <h2>Welcome to a Photo App.</h2>
              <p style={{ color: 'gray' }}>Sign-in below to continue.</p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <GoogleButton
                onClick={() => {
                  console.log('Google button clicked');
                  signInWithGoogle();
                }}
              />
            </div>
          </div>
        </header>
      </div>
    );
  } else {
    // If user is signed in.
    return (
      <div className="App">
        <header className="App-header">
          <div className="pa2 pt4">
            <h2>Hi {user['name']}, this is your personal photo album.</h2>
            <p style={{ color: 'gray' }}>Add new images by uploading them.</p>
          </div>
          <div className="pb5">
            <Row>
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
                <UploadButton hook={setUploadState} />
              </span>
            </Row>
          </div>
          <div>
            <ImageWrap imageUrls={userImageUrls} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
