import React from 'react';
import CardList from './CardList';
import './styles/Button.css';

const Button = ( { title, handleClick }) => {
  return (
    <button onClick={ () => handleClick(title) }>
      {title}
    </button>
  )
}

export default Button;
