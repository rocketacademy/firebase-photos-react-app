import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleButton from 'react-google-button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to our Photos App.</p>
        <p>Sign-in below to continue.</p>
        <GoogleButton
          onClick={() => {
            console.log('Google button clicked');
          }}
        />
      </header>
    </div>
  );
}

export default App;
