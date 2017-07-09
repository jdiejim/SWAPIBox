import React from 'react';
import Button from './Button';
import { string, func } from 'prop-types';

import './styles/ButtonWrapper.css';

const ButtonWrapper = ({ handleClick, selectedButton }) => {
  return (
    <section className="button-wrapper">
      <Button
        title='people'
        handleClick={ handleClick }
        selectedButton={selectedButton}
      />
      <Button
        title='planets'
        handleClick={ handleClick }
        selectedButton={selectedButton}
      />
      <Button
        title='vehicles'
        handleClick={ handleClick }
        selectedButton={selectedButton}
      />
    </section>
  );
}

ButtonWrapper.propTypes = {
  handleClick: func,
  selectedButton: string
}

export default ButtonWrapper;
