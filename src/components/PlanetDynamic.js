import React from 'react';
import planetColors from '../utils/planetColors';
import './styles/PlanetDynamic.css';

const PlanetDynamic = ({ terrain }) => {
  const light = planetColors[terrain].l;
  const dark = planetColors[terrain].d;
  const planetStyle = {
    background: `linear-gradient(to top left, ${light} 20%, ${dark})`,
  }
  
  return (
    <div className="planet-wraper" style={planetStyle}>
      <div className="planet"></div>
    </div>
  )
}

export default PlanetDynamic;
