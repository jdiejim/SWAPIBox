import React from 'react';
import planetColors from '../utils/planetColors';
import { string } from 'prop-types';
import './styles/PlanetDynamic.css';

const PlanetDynamic = ({ terrain }) => {
  const light = planetColors[terrain].l;
  const dark = planetColors[terrain].d;
  const planetStyle = { background: `linear-gradient(to top left, ${light} 20%, ${dark})` };
  const craterStyle = {
    boxShadow: `inset 1px 1px 5px ${'#163040'}, 0 0 7px ${dark}`,
    backgroundColor: `${dark}`
  };

  return (
    <div className="planet-wraper" style={planetStyle}>
      <div className="planet">
        <div className="crater" style={craterStyle}></div>
        <div className="crater" style={craterStyle}></div>
        <div className="crater" style={craterStyle}></div>
        <div className="crater" style={craterStyle}></div>
        <div className="crater" style={craterStyle}></div>
        <div className="crater" style={craterStyle}></div>
        <div className="crater" style={craterStyle}></div>
        <div className="crater" style={craterStyle}></div>
        <div className="crater" style={craterStyle}></div>
        <div className="crater" style={craterStyle}></div>
        <div className="crater" style={craterStyle}></div>
      </div>
    </div>
  );
}

PlanetDynamic.propTypes = {
  terrain: string
}

export default PlanetDynamic;
