import React from 'react';
import FavoriteButton from './FavoriteButton';
import { bool, object, arrayOf, func } from 'prop-types';
import './styles/Header.css';

const Header = ({ displayFavorites, favorites, inFavorites }) => {
  return (
    <header className="header">
      <FavoriteButton
        displayFavorites={displayFavorites}
        favorites={favorites}
        inFavorites={inFavorites}
      />
    </header>
  )
}

Header.propTypes = {
  displayFavorites: func,
  favorites: arrayOf(object),
  inFavorites: bool
}

export default Header;
