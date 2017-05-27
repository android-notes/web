import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import MarkDown from './component/markdown/MarkDown'
import MarkDown_It from './component/markdown-it/MarkDown_It'
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <MarkDown_It/>
      </div>
    );
  }
}

export default App;
