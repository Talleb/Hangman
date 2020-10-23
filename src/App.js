import React, { useState, useEffect } from 'react';
import './App.css';
import MainPage from './components/MainPage.jsx'

function App() {
  const BackGrounds = ['Graveyard', 'House', 'Pumpkins', 'Woods', 'Bats']
  const BackGround = BackGrounds[Math.floor(Math.random() * Math.floor(5))]
  const [randomBackground, setRandomBackground] = useState(null);


  useEffect(() => {
    function RandomBG() {
      setRandomBackground(BackGround)
    }
    RandomBG();
  }, [BackGround])

  return (
    <div>{randomBackground ?
      <main className={randomBackground}>
        <MainPage />
      </main> : "loading"}
    </div>
  );
}

export default App;
