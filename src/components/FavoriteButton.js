import React from 'react';
import xWing from '../utils/x-wing.svg';
import { string, func, arrayOf, shape } from 'prop-types';
import './styles/FavoriteButton.css';

const FavoriteButton = ({ displayFavorites, favorites }) => {
  const length = favorites.length === 0 ? <span /> : <span>: {favorites.length}</span>;
  const bgImage = { backgroundImage: `url(${xWing})`};

  return (
      <button className="favorite-button" style={bgImage} onClick={displayFavorites}>
        <h2 className="favorite-button-label">Favorites{length}</h2>
      </button>
  );
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
});

FavoriteButton.propTypes = {
  displayFavorites: func,
  favorites: arrayOf(allData)
};

export default FavoriteButton;
