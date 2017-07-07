import React from 'react';
import Header from './Header';
import ButtonWrapper from './ButtonWrapper';
import CardList from './CardList';
import { arrayOf, func, string, shape } from 'prop-types';
import './styles/Main.css';

const Main = ({ selectedData, favorites, handleClick, toggleFavorites, displayFavorites}) => {
  return (
    <section>
      <Header displayFavorites={displayFavorites}
              favorites={favorites} />
      <ButtonWrapper handleClick={handleClick} />
      <CardList selectedData={selectedData}
                favorites={favorites}
                toggleFavorites={toggleFavorites} />
    </section>
  )
}

const allData = shape({
  name: string,
  population: string,
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
  toggleFavorites: func
}

export default Main;
