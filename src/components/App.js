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
      activeAnim: false,
      errorStatus: '',
      selectedButton: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.toggleFavorites = this.toggleFavorites.bind(this);
    this.displayFavorites = this.displayFavorites.bind(this);
  }

  componentDidMount() {
    const favorites = localStorage.getItem('favorites') ?
      JSON.parse(localStorage.getItem('favorites')) : '';
    if (favorites.length) {
      this.setState({ favorites })
    }
    // fetchData('/', this);
    window.addEventListener('scroll', this.stickyNav);
  }

  setLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(this.state.favorites));
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
    this.setLocalStorage();
  }

  handleClick(title) {
    if (this.state[title].length > 0) {
      this.setState({ selectedData: this.state[title], inFavorites: false, activeAnim: false, selectedButton: title });
    } else {
      this.setState({ isLoading: true, activeAnim: false, selectedButton: title })
      fetchData(title, this);
    }
  }

  displayFavorites() {
    const selectedData = this.state.favorites;
    this.setState({ selectedData, inFavorites: true, selectedButton: '' });
  }

  stickyNav() {
    const app = document.getElementById('root');
    const nav = document.querySelector('.header');

    if (window.scrollY >= 250) {
      app.style.paddingTop = `${nav.offsetHeight}px`;
      app.classList.add('fixed-nav');
    } else {
      app.style.paddingTop = '0px';
      app.classList.remove('fixed-nav');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.stickyNav);
  }

  render() {
    const { selectedData, favorites, film, inFavorites, isLoading, activeAnim, selectedButton } = this.state;

    return (
      <div className="App">
        <Scroller film={film}/>
        <Main
          selectedData={selectedData}
          favorites={favorites}
          isLoading={isLoading}
          activeAnim={activeAnim}
          handleClick={this.handleClick}
          toggleFavorites={this.toggleFavorites}
          displayFavorites={this.displayFavorites}
          inFavorites={inFavorites}
          selectedButton={selectedButton}
        />
      </div>
    );
  }
}

export default App;
