import React from 'react';
import Header from './Header';
import CardList from './CardList';
import { arrayOf, func, string, number, bool, shape, oneOfType } from 'prop-types';
import './styles/Main.css';

const Main = ({ selectedData, favorites, handleClick, toggleFavorites, displayFavorites, isLoading, inFavorites, activeAnim, selectedButton }) => {
  return (
    <section>
      <Header
        displayFavorites={displayFavorites}
        favorites={favorites}
        inFavorites={inFavorites}
        handleClick={handleClick}
        selectedButton={selectedButton}
      />
      <CardList
        selectedData={selectedData}
        favorites={favorites}
        isLoading={isLoading}
        activeAnim={activeAnim}
        toggleFavorites={toggleFavorites}
        inFavorites={inFavorites}
      />
    </section>
  )
}

const allData = shape({
  name: string,
  population: oneOfType([string, number]),
  homeworld: string,
  species: string,
  language: string,
  climate: string,
  terrain: string,
  residents: arrayOf(string),
  model: string,
  passengers: string,
  vehicleClass: string,
})

Main.propTypes = {
  selectedData: arrayOf(allData),
  favorites: arrayOf(allData),
  handleClick: func,
  toggleFavorites: func,
  displayFavorites: func,
  isLoading: bool,
  inFavorites: bool,
  activeAnim: bool,
  selectedButton: string
}

export default Main;
