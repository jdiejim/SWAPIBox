import React from 'react';
import Header from './Header';
import ButtonWrapper from './ButtonWrapper';
import CardList from './CardList';
import './styles/Main.css';

const Main = ({ selectedData, favorites, handleClick, toggleFavorites, displayFavorites}) => {
  return (
    <section>
      <Header displayFavorites={displayFavorites}
              favorites={favorites} />
      <ButtonWrapper handleClick={handleClick} />
      <CardList selectedData={selectedData}
                favorites={favorites}
                toggleFavorites={toggleFavorites} />
    </section>
  )
}

export default Main;
