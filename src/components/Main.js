import React from 'react';
import Header from './Header';
import CardList from './CardList';
import './styles/Main.css';

const Main = ({ people }) => {
  return (
    <section>
      <Header />
      <CardList people={people} />
    </section>
  )
}

export default Main;
