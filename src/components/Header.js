import React from 'react';
import FavoriteButton from './FavoriteButton';
import ButtonWrapper from './ButtonWrapper';
import { bool, string, object, arrayOf, func } from 'prop-types';
import './styles/Header.css';

const Header = ({ displayFavorites, favorites, inFavorites, handleClick, selectedButton }) => {
  return (
    <header className="header">
      <ButtonWrapper
        handleClick={handleClick}
        selectedButton={selectedButton}
      />
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
  inFavorites: bool,
  handleClick: func,
  selectedButton: string
}

export default Header;
