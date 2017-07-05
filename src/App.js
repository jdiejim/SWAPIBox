import React, { Component } from 'react';
import People from './model/People';
import Scroller from './components/Scroller';
import Main from './components/Main';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      people: [],
    }
  }

  componentDidMount() {
    new People().fetchPeople(this);
  }

  render() {
    const { people } = this.state;

    return (
      <div className="App">
        <Scroller />
        <Main people={people} />
      </div>
    );
  }
}

export default App;
