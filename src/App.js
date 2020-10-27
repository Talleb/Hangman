import React from 'react';
import './App.css';
import Communication from './components/Communication';

function App() {
  return (
    <section>
        <h1>Hangman</h1>
        <div>
          <Communication />
        </div>
    </section>
  );
}

export default App;
