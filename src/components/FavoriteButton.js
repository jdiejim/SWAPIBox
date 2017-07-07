import React from 'react';
import { string, func, arrayOf, shape} from 'prop-types';

import './styles/FavoriteButton.css';

const FavoriteButton = ({ displayFavorites, favorites }) => {
  let length = !favorites ? 0 : favorites.length

  return (
    <div>
      <button onClick={displayFavorites}>
        FavoriteButton
        <h2>{length}</h2>
      </button>
    </div>
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

FavoriteButton.propTypes = {
  displayFavorites: func,
  favorites: arrayOf(allData)
}

export default FavoriteButton;
