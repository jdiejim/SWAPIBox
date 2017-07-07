import React from 'react';
import { object } from 'prop-types';
import './styles/Scroller.css';

const Scroller = ({ film }) => {
  return (
    <section>
      <h2 className="film-title">{film.title}</h2>
      <h3 className="film-episode">Episode: {film.episode}</h3>
      <h3 className="film-text">{film.text}</h3>
      <h3 className="film-date">{film.date}</h3>
    </section>
  )
}

Scroller.propTypes = {
  film: object
}

export default Scroller;
