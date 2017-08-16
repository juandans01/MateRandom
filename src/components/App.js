import React, { Component } from 'react';
import Random from './Random'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="/MateIcon.png" alt="logo" className="App-logo" />
          <span className="App-title">MateRandom</span>
        </div>
        <Random/>
      </div>
    );
  }
}

export default App;
