import React from 'react';
import Card from './Card';
import { getKey } from '../utils/helper_functions';
import './styles/CardList.css';

const CardList = ({ people }) => {
  const peopleArray = people.map(person => <Card key={getKey()} info={person} />);

  return (
    <section>
      {peopleArray}
    </section>
  )
}

export default CardList;
