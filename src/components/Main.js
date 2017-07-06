import React from 'react';
import Header from './Header';
import CardList from './CardList';
import './styles/Main.css';

const Main = ({ selectedData }) => {
  return (
    <section>
      <Header />
      <CardList selectedData={selectedData} />
    </section>
  )
}

export default Main;
