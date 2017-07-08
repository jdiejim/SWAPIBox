import React from 'react';
import { getKey } from '../utils/helper_functions';
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

  const infoList = Object.keys(info)
                         .filter(e => e !== 'name')
                         .filter(e => info[e].length !== 0)
                         .map(key => (
                           <div className="info" key={getKey()}>
                            <h3 className="info-label">{key}</h3>
                            <p className="info-value">{info[key]}</p>
                          </div>
                        ));

  const planet = Object.keys(info).includes('terrain') ? <PlanetDynamic terrain={info.terrain.split(',')[0]} /> : <span />;
  const cardClass = favorites.find(e => e.name === info.name) && !inFavorites ? 'card card-selected ' : 'card ';
  const cardAnimation = activeAnim ? '' : 'card-animation';
  const emblem = emblems[names[info.name].emblem];
  const bgCard = {
    backgroundImage: `url(${emblem})`
  }

  return (
    <article className={cardClass + cardAnimation}>
      <div className="bg-stars" style={bgCard}></div>
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
