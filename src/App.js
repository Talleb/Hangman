
import React, { useState, useEffect } from 'react';
import MainPage from './components/MainPage.jsx'
import Gameplay from './components/Gameplay.jsx'
import {BrowserRouter as HeadRouter, Switch, Route} from 'react-router-dom'
import './App.css';
import './CSS/CssV1.css'

function App() {
  const BackGrounds = ['Graveyard', 'House', 'Pumpkins', 'Woods', 'Bats']
  const BackGround = BackGrounds[Math.floor(Math.random() * 5)]
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
