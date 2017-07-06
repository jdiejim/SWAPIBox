import React from 'react';
import './styles/Scroller.css';

const Scroller = ({ film }) => {
  return (
    <section>
      <h2>{film.title}</h2>
      <h3>Episode: {film.episode}</h3>
      <h3>{film.text}</h3>
      <h3>{film.date}</h3>
    </section>
  )
}

export default Scroller;
