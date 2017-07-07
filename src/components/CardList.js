import React, { Component } from 'react';
import Card from './Card';
import { object, arrayOf, func } from 'prop-types';
import { getKey } from '../utils/helper_functions';
import './styles/CardList.css';

class CardList extends Component {
  render() {
    const { selectedData, favorites, toggleFavorites, inFavorites, isLoading } = this.props;

    if (isLoading) {
      return <div><img src="https://s-media-cache-ak0.pinimg.com/originals/8c/eb/27/8ceb278f34e209b8a6f0ceac1ebc3dad.gif" /></div>
    }

    const selectedDataArray = selectedData.map(data =>
      <Card key={getKey()}
            info={data}
            toggleFavorites={toggleFavorites}
            favorites={favorites} />);

    const renderComponents = (!favorites.length && inFavorites) ? <div className="no-favorites">Please select some favorites to add here!!</div> : selectedDataArray;

    return (
      <section className="card-list">
        {renderComponents}
      </section>
    )
  }
}

CardList.propTypes = {
  selectedData: arrayOf(object),
  favorites: arrayOf(object),
  toggleFavorites: func
}

export default CardList;
