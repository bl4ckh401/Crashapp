import React from 'react';

function Ruler({ multiplier }) {
  const rulerItems = [];
  const numLines = Math.floor(multiplier) + 1;

  for (let i = 0; i < numLines; i++) {
    rulerItems.push(
      <div key={i} className="ruler-item">
        <div className="ruler-line" />
        <div className="ruler-number">{i}x</div>
      </div>
    );
  }

  return <div className="ruler-container">{rulerItems.reverse()}</div>;
}

export default Ruler;
