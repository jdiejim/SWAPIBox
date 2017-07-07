import React from 'react';
import Card from './Card';
import { object, arrayOf, func } from 'prop-types';
import { getKey } from '../utils/helper_functions';
import './styles/CardList.css';

const CardList = ({ selectedData, favorites, toggleFavorites }) => {
  const selectedDataArray = selectedData.map(data =>
    <Card key={getKey()}
          info={data}
          toggleFavorites={toggleFavorites}
          favorites={favorites} />);

  return (
    <section className="card-list">
      <Card info={{name: 'name', power: 'power', hello: 'hello', my: 'my'}} favorites={[]} />
      {selectedDataArray}
    </section>
  )
}

CardList.propTypes = {
  selectedData: arrayOf(object),
  favorites: arrayOf(object),
  toggleFavorites: func
}

export default CardList;
