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
      film: {},
      isLoading: false,
      activeAnim: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.toggleFavorites = this.toggleFavorites.bind(this);
    this.displayFavorites = this.displayFavorites.bind(this);
  }

  componentDidMount() {
    // fetchData('/', this);
    // const promises = Promise.all([
    //   fetch('http://swapi.co/api/people/').then(res => res.json()).then(data => data.results.map(e => e.name)),
    //   fetch('http://swapi.co/api/people/?page=2').then(res => res.json()).then(data => data.results.map(e => e.name)),
    //   fetch('http://swapi.co/api/people/?page=3').then(res => res.json()).then(data => data.results.map(e => e.name)),
    //   fetch('http://swapi.co/api/people/?page=4').then(res => res.json()).then(data => data.results.map(e => e.name)),
    //   fetch('http://swapi.co/api/people/?page=5').then(res => res.json()).then(data => data.results.map(e => e.name)),
    //   fetch('http://swapi.co/api/people/?page=6').then(res => res.json()).then(data => data.results.map(e => e.name)),
    //   fetch('http://swapi.co/api/people/?page=7').then(res => res.json()).then(data => data.results.map(e => e.name)),
    //   fetch('http://swapi.co/api/people/?page=8').then(res => res.json()).then(data => data.results.map(e => e.name)),
    //   fetch('http://swapi.co/api/people/?page=9').then(res => res.json()).then(data => data.results.map(e => e.name)),
    // ])
    //
    // promises.then(data => {
    //   const red = data.reduce((arr, e) => {
    //     arr.push(...e)
    //     return arr;
    //   }, []);
    //
    //   console.log(red);
    // })
  }

  toggleFavorites(info) {
    let favorites = this.state.favorites;
    if (!favorites.find(e => e.name === info.name)) {
      favorites.push(info);
    } else {
      favorites = favorites.filter(e => e.name !== info.name)
    }
    if (this.state.inFavorites) {
      this.setState({ selectedData: favorites, favorites, activeAnim: true });
    }
    this.setState({ favorites, activeAnim: true });
  }

  handleClick(title) {
    if (this.state[title].length > 0) {
      this.setState({ selectedData: this.state[title], inFavorites: false, activeAnim: false });
    } else {
      this.setState({ isLoading: true, activeAnim: false })
      fetchData(title, this);
    }
  }

  displayFavorites() {
    const selectedData = this.state.favorites;
    this.setState({ selectedData, inFavorites: true });
  }

  render() {
    const { selectedData, favorites, film, inFavorites, isLoading, activeAnim } = this.state;

    return (
      <div className="App">
        <Scroller film={film}/>
        <Main selectedData={selectedData}
              favorites={favorites}
              isLoading={isLoading}
              activeAnim={activeAnim}
              handleClick={this.handleClick}
              toggleFavorites={this.toggleFavorites}
              displayFavorites={this.displayFavorites}
              inFavorites={inFavorites} />
      </div>
    );
  }
}

export default App;
