import React from 'react';
import MainPage from './components/MainPage.jsx'
import Gameplay from './components/Gameplay.jsx'
import {BrowserRouter as HeadRouter, Switch, Route} from 'react-router-dom'
import './App.css';
import './CSS/CssV1.css'

function App() {
  return (
    <div className="App">
      <HeadRouter>
        <Switch>
          <Route path="/" exact component={MainPage}/>
          <Route path="/Gameplay" exact component={Gameplay}/>
        </Switch>
      </HeadRouter>
    </div>
  );
}

export default App;
