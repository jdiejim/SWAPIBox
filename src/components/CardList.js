import React from 'react';
import Card from './Card';
import { getKey } from '../utils/helper_functions';
import './styles/CardList.css';

const CardList = ({ selectedData }) => {
  const selectedDataArray = selectedData.map(person => <Card key={getKey()} info={person} />);

  return (
    <section>
      {selectedDataArray}
    </section>
  )
}

export default CardList;
