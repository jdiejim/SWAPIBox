import React from 'react';
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

export default FavoriteButton;
