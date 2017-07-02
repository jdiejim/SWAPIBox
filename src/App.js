import React, { Component } from 'react';
import { PEOPLE_URL } from './utils/constants';
import People from './model/People';
import Scroller from './components/Scroller';
import Main from './components/Main';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      people: []
    }
  }

  componentDidMount() {
    const people = new People();

    this.setState({
      people: people.getPeople()
    })
  }

  getSomething() {
    fetch(PEOPLE_URL)
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
        .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.people);
    return (
      <div className="App">
        <Scroller />
        <Main />
      </div>
    );
  }
}

export default App;
