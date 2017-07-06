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
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetchData('people', this)
  }

  handleClick(title) {
    fetchData(title, this);
  }

  render() {
    const { selectedData } = this.state;

    return (
      <div className="App">
        <Scroller />
        <Main selectedData={selectedData}
              handleClick={this.handleClick}/>
      </div>
    );
  }
}

export default App;
