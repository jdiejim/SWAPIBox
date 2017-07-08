import React from 'react';
import './styles/Loaders.css';

const Loader = () => {
  return(
    <div>
      <h1 className="loading-title">Loading...</h1>
      <div className="bb8">
        <div className="antena antena-large"></div>
        <div className="antena antena-small"></div>
        <div className="bb8-head">
          <div className="eye">
            <div className="eye-reflection"></div>
            <div className="dimple"></div>
          </div>
          <div className="line-graphic"></div>
        </div>
        <div className="bb8-shadow">
          <div className="bb8-body">
            <div className="graphic"></div>
            <div className="graphic"></div>
            <div className="graphic"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader;
