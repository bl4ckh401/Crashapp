// GameOver.js
import React from 'react';

const GameOver = ({ multiplier, onPlayAgain }) => {
  return (
    <div className='scene'>
      <h1>Game Over</h1>
      <p style={{ color:'white' }}>Your final multiplier: {multiplier.toFixed(2)}x</p>
      <button onClick={onPlayAgain}>Play Again</button>
    </div>
  );
};

export default GameOver;
