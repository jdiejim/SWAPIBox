import React from 'react';
import Card from './Card';
import './styles/CardList.css';

const CardList = () => {
  return (
    <section>
      <Card info={[0, 1]} />
    </section>
  )
}

export default CardList;
