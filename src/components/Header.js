import React from 'react';
import FavoriteButton from './FavoriteButton';
import './styles/Header.css';

const Header = ({ displayFavorites, favorites }) => {
  return (
    <section>
      Header
      <FavoriteButton displayFavorites={displayFavorites}
                      favorites={favorites}/>
    </section>
  )
}

export default Header;
