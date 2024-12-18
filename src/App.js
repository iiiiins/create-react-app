import React, { Component } from 'react';
import logo from './Quake_logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Quake Rankings
          </p>
          <a
            className="App-link"
            href="https://youtu.be/GZV1-pEY3po"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Rankings!
          </a>
        </header>
      </div>
    );
  }
}

export default App;
