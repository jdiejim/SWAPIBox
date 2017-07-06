import React from 'react';
import Button from './Button';
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

export default ButtonWrapper;
