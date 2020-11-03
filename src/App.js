
import React, { useState, useEffect } from 'react';
import Gameplay from './components/Gameplay.jsx'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import './CSS/CssV1.css'
import LandingPage from './components/LandingPage.jsx'
import LoadingPage from './components/LoadingPage.jsx'


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
        <Router>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/LoadingPage/:PlayerName" component={LoadingPage}/>
            <Route path="/Gameplay" component={Gameplay} />
          </Switch>
        </Router>
      </main> : "loading"}
    </div>
  );
}

export default App;
