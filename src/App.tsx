import * as React from 'react';
import photograph from './assets/icons/photograph.svg';
import './App.css';
import GoogleButton from 'react-google-button';
import { signInWithGoogle } from './firebase/index';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={photograph} className="App-logo" alt="logo" />
        <p>Welcome to my Photo App.</p>
        <p>Sign-in below to continue.</p>
        <GoogleButton
          onClick={() => {
            console.log('Google button clicked');
            signInWithGoogle();
          }}
        />
      </header>
    </div>
  );
}

export default App;
