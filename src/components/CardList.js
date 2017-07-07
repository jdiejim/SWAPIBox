import React from 'react';
import Card from './Card';
import { object, arrayOf, func } from 'prop-types';
import { getKey } from '../utils/helper_functions';
import './styles/CardList.css';

const CardList = ({ selectedData, favorites, toggleFavorites, inFavorites }) => {
  const selectedDataArray = selectedData.map(data =>
    <Card key={getKey()}
          info={data}
          toggleFavorites={toggleFavorites}
          favorites={favorites} />);

  const renderComponents = (!favorites.length && inFavorites) ? <div className="no-favorites">Please select some favorites to add here!!</div> : selectedDataArray;

  return (
    <section className="card-list">
      {renderComponents}
    </section>
  )
}

CardList.propTypes = {
  selectedData: arrayOf(object),
  favorites: arrayOf(object),
  toggleFavorites: func
}

export default CardList;
