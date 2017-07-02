import React from 'react';
import CardList from './CardList';
import './styles/Button.css';

const Button = ( { title }) => {
  return (
    <button>
      {title}
    </button>
  )
}

export default Button;
