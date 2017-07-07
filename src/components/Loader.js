import React from 'react';
// import {} from 'prop-types';
import './styles/Loaders.css';

const Loader = () => {
  return(
    <div className="bb8">
      <div className="bb8-head">
        <div className="eye">
          <div className="eye-reflection"></div>
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
  )
}

export default Loader;
