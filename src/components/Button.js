import React from 'react';
import { string, func } from 'prop-types';
import './styles/Button.css';

const Button = ( { title, handleClick, selectedButton }) => {
  const buttonClass = selectedButton === title ? 'fetch-button selected-button' : 'fetch-button';

  return (
    <button className={buttonClass} onClick={ () => handleClick(title) }>
      {title}
    </button>
  );
}

Button.propTypes = {
  title: string,
  handleClick: func,
  selectedButton: string
}

export default Button;
