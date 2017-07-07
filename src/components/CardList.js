import React from 'react';
import Card from './Card';
import Loader from './Loader';
import { bool, object, arrayOf, func } from 'prop-types';
import { getKey } from '../utils/helper_functions';
import './styles/CardList.css';

const CardList = ({ selectedData, favorites, toggleFavorites, inFavorites, isLoading }) => {
  if (isLoading) {
    return <Loader />
  }

  const cards = selectedData.map(data =>
    <Card
      key={getKey()}
      info={data}
      toggleFavorites={toggleFavorites}
      favorites={favorites}
    />
  );

  const favoriteMsg = (
    <div
      className="no-favorites">
      Please select some favorites to add here!!
    </div>
  )

  const renderComponents = (!favorites.length && inFavorites) ? favoriteMsg : cards;

  return (
    <section className="card-list">
      {renderComponents}
    </section>
  )
}

CardList.propTypes = {
  selectedData: arrayOf(object),
  favorites: arrayOf(object),
  toggleFavorites: func,
  inFavorites: bool,
  isLoading: bool
}

export default CardList;
