// StarryPopup.js

import React, { useState } from 'react';
import './StarryPopup.css';

function StarryPopup() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="starry-popup">
      <button onClick={togglePopup}>Show Popup</button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={togglePopup}>&times;</span>
            <h2>Starry Night</h2>
            <div className="stars-container">
              {/* Stars will be added here dynamically */}
              {Array.from({ length: 50 }).map((_, index) => (
                <div key={index} className="star"></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StarryPopup;
