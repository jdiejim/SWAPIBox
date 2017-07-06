import React from 'react';
import './styles/FavoriteButton.css';

const FavoriteButton = ({ displayFavorites }) => {
  return (
    <button onClick={displayFavorites}>
      FavoriteButton
    </button>
  )
}

export default FavoriteButton;
