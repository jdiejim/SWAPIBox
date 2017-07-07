import React from 'react';
import Card from './Card';
import { getKey } from '../utils/helper_functions';
import './styles/CardList.css';

const CardList = ({ selectedData, favorites, toggleFavorites }) => {
  const selectedDataArray = selectedData.map(data =>
    <Card key={getKey()}
          info={data}
          toggleFavorites={toggleFavorites}
          favorites={favorites} />);

  return (
    <section>
      <Card info={{name: 'name', power: 'power', hello: 'hello', my: 'my'}} favorites={[]} />
      {selectedDataArray}
    </section>
  )
}

export default CardList;
