import React from 'react';
import Button from './Button';
import './styles/ButtonWrapper.css';

const ButtonWrapper = () => {
  return (
    <section>
      <Button title='people' />
      <Button title='planets' />
      <Button title='vehicles' />
    </section>
  )
}

export default ButtonWrapper;
