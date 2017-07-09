import React from 'react';
import { object } from 'prop-types';
import './styles/Scroller.css';

const Scroller = ({ film }) => {
  return (
    <section className="scroller">
      <div className="crawl">
          <div className="title-container">
            <h2 className="film-title">{film.title}</h2>
            <h3 className="film-episode">Episode: {film.episode}</h3>
          </div>
          <p className="film-text">{film.text}</p>
          <p className="film-date">Release Date: {film.date}</p>
      </div>
      <div className="star-wars">Star Wars</div>
    </section>
  )
}

Scroller.propTypes = {
  film: object
}

export default Scroller;
