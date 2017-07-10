import React from 'react';
import { getKey, formatData } from '../utils/helper_functions';
import stars from '../utils/stars.svg';
import emblems from '../utils/emblems';
import names from '../utils/names';
import PlanetDynamic from './PlanetDynamic';
import { bool, object, arrayOf, func } from 'prop-types';
import './styles/Card.css';

const Card = ({ info, toggleFavorites, favorites, activeAnim, inFavorites }) => {
  if (!info) {
    return <div>card</div>
  }

  const infoList = Object.keys(info).filter(e => e !== 'name')
          .filter(e => info[e].length !== 0)
          .map(key => {
            const value = formatData(key, info[key]);
            return (
              <div className="info" key={getKey()}>
                <h3 className="info-label">{key}</h3>
                <div className="info-value">{value}</div>
              </div>
            )
          });

  let planet = <span />
  let bgClass = 'bg';
  let bgCard = { backgroundImage: `url(${stars})` };

  if (Object.keys(info).includes('terrain')) {
    planet = <PlanetDynamic terrain={info.terrain.split(',')[0]} />;
    bgClass = 'bg bg-stars';
  } else {
    const emblem = emblems[names[info.name].emblem];
    if (names[info.name].emblem.includes('blueprint')) {
      bgClass = 'bg bg-vehicle';
      bgCard = {
        backgroundImage: `url(${emblem})`,
      }
    } else {
      bgClass = 'bg bg-emblem';
      bgCard = {
        backgroundImage: `url(${emblem})`,
        left: names[info.name].emblem === 'normal' ? '0%' : '25%',
        opacity: names[info.name].emblem === 'normal' ? '0.3' : '0.3',
        backgroundSize: names[info.name].emblem === 'normal' ? '95%' : '80%',
      }
    }
  }

  const cardClass = favorites.find(e => e.name === info.name) && !inFavorites ? 'card card-selected' : 'card ';
  const cardAnimation = activeAnim ? '' : 'card-animation';

  return (
    <article className={cardClass + cardAnimation}>
      <div className={bgClass} style={bgCard}></div>
      <div className="card-title-wrapper">
        <h2 className="card-title">{info.name}</h2>
        <button
          className="card-favorite-button"
          onClick={ () => toggleFavorites(info)}>
          Save
        </button>
      </div>
      <section className="info-wrapper">
        <section className="card-info-list">
          {infoList}
        </section>
        {planet}
      </section>
    </article>
  )
}

Card.propTypes = {
  info: object,
  toggleFavorites: func,
  favorites: arrayOf(object),
  activeAnim: bool
}

export default Card;
