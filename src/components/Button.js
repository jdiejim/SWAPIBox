import React from 'react';
import { string, func } from 'prop-types';

import './styles/Button.css';

const Button = ( { title, handleClick }) => {
  return (
    <button onClick={ () => handleClick(title) }>
      {title}
    </button>
  )
}

Button.propTypes = {
  title: string,
  handleClick: func,
}

export default Button;
