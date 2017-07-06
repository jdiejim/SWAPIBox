import React from 'react';
import Header from './Header';
import ButtonWrapper from './ButtonWrapper';
import CardList from './CardList';
import './styles/Main.css';

const Main = ({ selectedData, handleClick }) => {
  return (
    <section>
      <Header />
      <ButtonWrapper handleClick={handleClick}/>
      <CardList selectedData={selectedData} />
    </section>
  )
}

export default Main;
