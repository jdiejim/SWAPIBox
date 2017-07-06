import React from 'react';
import FavoriteButton from './FavoriteButton';
import './styles/Header.css';

const Header = ({ displayFavorites }) => {
  return (
    <section>
      Header
      <FavoriteButton displayFavorites={displayFavorites} />
    </section>
  )
}

export default Header;
