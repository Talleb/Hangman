import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

import MainPage from './components/MainPage.jsx'
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
          <Route path="/loadingpage">
            <div className="App">
              <LoadingPage/>
            </div>
          </Route>
          <Route path="/mainpage">
            <div className="App">
              <MainPage/>
            </div>
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
      </main> : "loading"}
    </div>
  );
}

export default App;
