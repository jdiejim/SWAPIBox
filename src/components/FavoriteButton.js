import React from 'react';
import xWing from '../utils/x-wing.svg';
import { bool, string, number, func, arrayOf, shape, oneOfType } from 'prop-types';
import './styles/FavoriteButton.css';

const FavoriteButton = ({ displayFavorites, favorites, inFavorites }) => {
  const length = favorites.length === 0 ? <span /> : <span>: {favorites.length}</span>;
  const bgImage = { backgroundImage: `url(${xWing})`};
  const favClass = inFavorites ? 'favorite-button in-favorites' : 'favorite-button';

  return (
      <button className={favClass} style={bgImage} onClick={displayFavorites}>
        <h2 className="favorite-button-label">Favorites{length}</h2>
      </button>
  );
}

const allData = shape({
  name: string,
  population: oneOfType([number, string]),
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
  favorites: arrayOf(allData),
  inFavorites: bool
};

export default FavoriteButton;
