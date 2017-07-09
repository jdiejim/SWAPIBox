import React from 'react';
import { bool, object, arrayOf, func } from 'prop-types';
import { getKey } from '../utils/helper_functions';
import darth from '../utils/darth-vader.gif';
import Card from './Card';
import Loader from './Loader';
import './styles/CardList.css';

const CardList = ({ selectedData, favorites, toggleFavorites, inFavorites, isLoading, activeAnim }) => {
  const cards = selectedData.map(data =>
    <Card
      key={getKey()}
      info={data}
      isLoading={isLoading}
      favorites={favorites}
      activeAnim={activeAnim}
      inFavorites={inFavorites}
      toggleFavorites={toggleFavorites}
    />
  );
  const favoriteMsg = (
    <div className="no-favorites">
      <h1 className="fav-msg">i find your lack of favorites disturbing!</h1>
      <img className="fav-img" src={darth} />
    </div>
  );
  const views = !favorites.length && inFavorites ? favoriteMsg : cards;
  const renderView = isLoading ? <Loader /> : views;

  return (
    <section className="card-list">
      {renderView}
    </section>
  )
}

CardList.propTypes = {
  selectedData: arrayOf(object),
  favorites: arrayOf(object),
  toggleFavorites: func,
  inFavorites: bool,
  isLoading: bool,
  activeAnim: bool
}

export default CardList;
