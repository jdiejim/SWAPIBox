import React, { Component } from 'react';
import fetchData from '../model/fetchData';
import Scroller from './Scroller';
import Main from './Main';
import './styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedData: [],
    }
  }

  componentDidMount() {
    fetchData('vehicles', this)
  }

  render() {
    const { selectedData } = this.state;

    return (
      <div className="App">
        <Scroller />
        <Main selectedData={selectedData} />
      </div>
    );
  }
}

export default App;
