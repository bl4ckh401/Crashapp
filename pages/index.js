import React, { useEffect, useState } from 'react';
import 'dotenv/config'
import GameOver from './components/GameOver';
import BetCard from './components/BetCard';
import { ConnectWallet } from '@thirdweb-dev/react';
import Ruler from './components/Ruler';
import { useTokenContext } from '../context/Token';


function isPrime(number) {
  if (number <= 1) {
    return false;
  }
  if (number <= 3) {
    return true;
  }
  if (number % 2 === 0 || number % 3 === 0) {
    return false;
  }
  let i = 5;
  while (i * i <= number) {
    if (number % i === 0 || number % (i + 2) === 0) {
      return false;
    }
    i += 6;
  }
  return true;
}

function App() {

  const rocketStyle = {
    transform: `rotate(${50}deg)`,
  };

  const handlePlaceBet = () => {
    // Logic for placing the bet
  };


  const [lastMultiplier, setLastMultiplier] = useState(0)

  const handleCancel = () => {
    // Logic for canceling the bet
  };

  const [multiplier, setMultiplier] = useState(1.00);
  const [gameStatus, setGameStatus] = useState('crashed');
  const [gameCrashed, setGameCrashed] = useState(true);

  const startGame = () => {
    const maxCrashDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
    let crashTime;

    // Generate a random crash time

    if(isPrime(Math.floor(Math.random()))){
      crashTime = Math.floor(Math.random() * maxCrashDuration);
    }else{
      crashTime = Math.floor(Math.random() * 30000);
    }


    const multiplierIncreaseRate = 0.01;

    const increaseMultiplier = async() => {
      if (gameStatus == 'running') {
        setMultiplier((prevMultiplier) => prevMultiplier + multiplierIncreaseRate);
        setLastMultiplier(multiplier)
      }else{
        setMultiplier(lastMultiplier);
      }
    };

    setTimeout(() => {
      setGameStatus('crashed');
    }, crashTime);

    const multiplierInterval = setInterval(increaseMultiplier, 500); // Increase every 0.1 second

    return () => clearInterval(multiplierInterval);
  };

  const handlePlayAgain = () => {
    setMultiplier(1.0);
    setGameStatus('running');
    startGame();
  };

  const star = () => {
    const count = 20;
    const scene = document.querySelector('.scene');
    let i = 0;

    while (i < count) {
      let star = document.createElement('i');
      let x = Math.floor(Math.random() * window.innerWidth);
      let duration = Math.random() * 1;
      let h = Math.random() * 100;

      star.style.left = x + 'px';
      star.style.width = '1px';
      star.style.height = h + 'px';
      star.style.animationDuration = duration + 's';

      scene.appendChild(star);
      i++;
    }
  };

  useEffect(() => {
    if (gameStatus === 'crashed') {
      setGameCrashed(true);
    }
    if (gameStatus === 'running') {
      startGame();
      star();
    }
  }, [gameStatus]);

  return (
    <>
      {gameStatus === 'running' ? (
        <div className='scene'>
          <ConnectWallet
            style={{ position:"absolute", top:0, right:0 }}
            theme="dark"
            btnTitle="Connect Wallet"
            className="w-full min-w-[400px]"
          />
          <Ruler multiplier={multiplier} />
          <div className='rocket'>
            <h2 style={{ color: 'white' }}>Multiplier: {multiplier.toFixed(2)}x</h2>
            <img src="/RocketShip.png" alt="Rocket" style={rocketStyle} />
          </div>
          <BetCard betAmount={10} multiplier={2} onPlaceBet={handlePlaceBet} onCancel={handleCancel} />
        </div>
      ) : (
        <GameOver multiplier={multiplier} onPlayAgain={handlePlayAgain} />
      )}
    </>
  );
}

export default App;
