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
      favorites: [],
      inFavorites: false,
      people: [],
      planets: [],
      vehicles: [],
      film: {}
    }

    this.handleClick = this.handleClick.bind(this);
    this.toggleFavorites = this.toggleFavorites.bind(this);
    this.displayFavorites = this.displayFavorites.bind(this);
  }

  componentDidMount() {
    // fetchData('/', this);
  }

  toggleFavorites(info) {
    let favorites = this.state.favorites;
    if (!favorites.find(e => e.name === info.name)) {
      favorites.push(info);
    } else {
      favorites = favorites.filter(e => e.name !== info.name)
    }
    if (this.state.inFavorites) {
      this.setState({ selectedData: favorites, favorites });
    }
    this.setState({ favorites });
  }

  handleClick(title) {
    if (this.state[title].length > 0) {
      this.setState({ selectedData: this.state[title], inFavorites: false });
    } else {
      fetchData(title, this);
    }
  }

  displayFavorites() {
    const selectedData = this.state.favorites;
    this.setState({ selectedData, inFavorites: true });
  }

  render() {
    const { selectedData, favorites, film } = this.state;

    return (
      <div className="App">
        <Scroller film={film}/>
        <Main selectedData={selectedData}
              favorites={favorites}
              handleClick={this.handleClick}
              toggleFavorites={this.toggleFavorites}
              displayFavorites={this.displayFavorites}/>
      </div>
    );
  }
}

export default App;
