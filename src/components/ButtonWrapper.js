import React from 'react';
import Button from './Button';
import { func } from 'prop-types';

import './styles/ButtonWrapper.css';

const ButtonWrapper = ({ handleClick }) => {
  return (
    <section>
      <Button title='people'
              handleClick={ handleClick } />
      <Button title='planets'
              handleClick={ handleClick } />
      <Button title='vehicles'
              handleClick={ handleClick } />
    </section>
  )
}

ButtonWrapper.propTypes = {
  handleClick: func
}

export default ButtonWrapper;
