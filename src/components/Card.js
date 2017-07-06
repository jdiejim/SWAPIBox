import React from 'react';
import { getKey } from '../utils/helper_functions';
import './styles/Card.css';

const Card = ({ info, toggleFavorites, favorites }) => {
  if (!info) {
    return <div>card</div>
  }
  const infoList = Object.keys(info).map(key =>
    <div className="info" key={getKey()}>
      <h3 className="info-label">{key}</h3>
      <p className="info-value">{info[key]}</p>
    </div>
  );

  const cardClass = favorites.find(e => e.name === info.name) ? 'card card-selected' : 'card';

  return (
    <article className={cardClass}>
      <div className="card-title-wrapper">
        <h2 className="card-title">{info.name}</h2>
        <button
          className="card-favorite-button"
          onClick={ () => toggleFavorites(info)}>
          Star
        </button>
      </div>
      <ul className="card-info-list">
        {infoList}
      </ul>
    </article>
  )
}

export default Card;
