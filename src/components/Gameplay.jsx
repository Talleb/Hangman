import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid';
import Alphabet from './Alphabet.js';
import './Gameplay.css'

const FrontEndSocket = io('http://localhost:8080');

export default function Gameplay({ match }) {
  const [guessedLetters, setGuessedLetters] = useState([])
  const [Users, setUsers] = useState([])
  const [WordGuessed, setWordGuessed] = useState('')
  const [outputWord, setOutputWord] = useState([])

  //need to Send info from the front end to the back end and connect both users
  useEffect(() => {
    console.log(match);
    let nameUrl = match.params.PlayerName

    //Sending name to Server
    FrontEndSocket.emit('UserInfo', nameUrl)

    //Reciving users array from Server & adding to Users
    FrontEndSocket.on('UsersArray', data => {
      console.log(data);  /** */
      console.log(WordGuessed);
      setUsers(data.Users)
      setGuessedLetters(data.guessedLetters)
    })
  }, [match])

  useEffect(() => {
    //Acceting GuessWord with user from server
    FrontEndSocket.on('GuessWord', data => {
      console.log(data);
      setOutputWord(data.currentGuessedWords)
      setGuessedLetters(data.guessedLetters)
    })
  }, [])

  let inputs = guessedLetters.map((letter, index) => (<span className={letter === '-' ? 'guesses' : 'chatting'} key={index+letter}>{letter}</span>))

  //Functions
  function SendGuessWord(e) {
    e.preventDefault()
    //Sending Guess Word to the server
    FrontEndSocket.emit('Messages', WordGuessed)

    e.target.value = ''
  }

  function SendLetter(e) {
    e.preventDefault()
    //Sending Letter to the server
    FrontEndSocket.emit('Messages', e.target.value)

  }

  return (
    <div>
      <h1>Spooky Hangman</h1>
      <div>
        <div id="users">
          <h2>users</h2>
          {Users.map(user => <span key={user.id}>{user.userName}</span>)}
        </div>

        <div className="chatting">
          {outputWord.map(outputWord => <span key={uuidv4()}>{outputWord.Text}</span>)}
        </div>

        <div>{ inputs }</div>

      </div>
      <form onSubmit={SendGuessWord}>
        <label>Guess Word</label>
        <input onChange={(e) => { setWordGuessed(e.target.value) }} maxLength="15" type="text" placeholder="Send Text" />
        <input type="submit" value="Send" />
      </form>
      <div>
        {Alphabet.map((Letter) =>
          <button
            className={Letter.class}
            value={Letter.name}
            key={Letter.name}
            onClick={e => SendLetter(e)}> {Letter.name}
          </button>)}
      </div>
    </div>
  )
}
