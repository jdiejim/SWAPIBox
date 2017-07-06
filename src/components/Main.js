import React from 'react';
import Header from './Header';
import ButtonWrapper from './ButtonWrapper';
import CardList from './CardList';
import './styles/Main.css';

const Main = ({ selectedData }) => {
  return (
    <section>
      <Header />
      <ButtonWrapper />
      <CardList selectedData={selectedData} />
    </section>
  )
}

export default Main;
