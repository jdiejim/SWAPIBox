import React from 'react';
import { getKey } from '../utils/helper_functions';
import './styles/Card.css';

const Card = ({ info }) => {
  const infoList = info.map(el =>
    <div className="info" key={getKey()}>
      <h3 className="info-label">Home world</h3>
      <p className="info-value">Tatooie</p>
    </div>
  );

  return (
    <article className="card">
      <div className="card-title-wrapper">
        <h2 className="card-title">Luke Sky</h2>
        <button className="card-favorite-button">Star</button>
      </div>
      <ul className="card-info-list">
        {infoList}
      </ul>
    </article>
  )
}

export default Card;
