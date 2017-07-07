import React from 'react';
import FavoriteButton from './FavoriteButton';
import { object, arrayOf, func } from 'prop-types';
import './styles/Header.css';

const Header = ({ displayFavorites, favorites }) => {
  return (
    <header className="header">
      Header
      <FavoriteButton displayFavorites={displayFavorites}
                      favorites={favorites}/>
    </header>
  )
}

Header.propTypes = {
  displayFavorites: func,
  favorites: arrayOf(object)
}

export default Header;
