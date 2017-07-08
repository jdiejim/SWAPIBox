import React from 'react';
import { getKey } from '../utils/helper_functions';
import stars from '../utils/stars.svg';
import PlanetDynamic from './PlanetDynamic';
import { object, arrayOf, func } from 'prop-types';
import './styles/Card.css';

const Card = ({ info, toggleFavorites, favorites, activeAnim }) => {
  if (!info) {
    return <div>card</div>
  }

  const infoList = Object.keys(info).map(key => {
    if (key !== 'name') {
      return (
        <div className="info" key={getKey()}>
          <h3 className="info-label">{key}</h3>
          <p className="info-value">{info[key]}</p>
        </div>
      )
    }
  }
  );

  const planet = Object.keys(info).includes('terrain') ? <PlanetDynamic terrain={info.terrain.split(',')[0]} /> : <span />;
  const cardClass = favorites.find(e => e.name === info.name) ? 'card card-selected ' : 'card ';
  const cardAnimation = activeAnim ? '' : 'card-animation';
  const bgCard = {
    backgroundImage: `url(${stars})`
  }

  return (
    <article className={cardClass + cardAnimation}>
      <div className="bg-stars" style={bgCard}></div>
      <div className="card-title-wrapper">
        <h2 className="card-title">{info.name}</h2>
        <button
          className="card-favorite-button"
          onClick={ () => toggleFavorites(info)}>
          Star
        </button>
      </div>
      <section className="info-wrapper">
        <ul className="card-info-list">
          {infoList}
        </ul>
        {planet}
      </section>
    </article>
  )
}

Card.propTypes = {
  info: object,
  toggleFavorites: func,
  favorites: arrayOf(object)
}

export default Card;
