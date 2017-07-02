import React, { Component } from 'react';
import Scroller from './components/Scroller';
import Main from './components/Main';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Scroller />
        <Main />
      </div>
    );
  }
}

export default App;
