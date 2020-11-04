import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import './Gameplay.css'

const FrontEndSocket = io('http://localhost:8080');

export default function Gameplay({ match }) {
  const [Users, setUsers] = useState([])
  const [displayGame, setDisplayGame] = useState('none')
  const [guessedLetters, setGuessedLetters] = useState([])
  const [WordGuessed, setWordGuessed] = useState('')
  const [outputWord, setOutputWord] = useState([])
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  //+++++++ UseEffects
  useEffect(() => {
    let nameUrl = match.params.PlayerName

    //Sending name to Server
    FrontEndSocket.emit('UserInfo', nameUrl)

    //Reciving users array from Server & adding to Users
    FrontEndSocket.on('UsersArray', data => {
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

  //++++++++++ Functions
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
  function StartingTheGame(){
    if(Users.length >= 2){
      setDisplayGame('block')
    }
  }

  function getClass(letter) {
    let word = outputWord.find(word => word.text.indexOf(letter) > -1)
    if (word) {
      if(word.exists) return 'Right'
      else return 'Wrong'
    } else {
      return 'Active'
    }
  }


  return (
    <div>
      <h1>Spooky Hangman</h1>
      
      <div id="users">
        <h2>users</h2>
        {Users.map(user => <span key={user.id}>{user.userName}</span>)}
      </div>
      <button onClick={StartingTheGame}>Start Game!</button>

      <div id="Gameplay" style={{display:displayGame}}>
        <div className="TheMysteryWord">{ inputs }</div>
        <form onSubmit={SendGuessWord}>
          <label>Guess Word</label>
          <input onChange={(e) => { setWordGuessed(e.target.value) }} maxLength="15" type="text" placeholder="Send Text" />
          <input type="submit" value="Send" />
        </form>
        <div>
          {letters.map((letter) =>
            <button
              className={getClass(letter)}
              value={letter}
              key={letter}
              onClick={e => SendLetter(e)}> {letter}
            </button>)}
        </div>
      </div>
      
    </div>
  )
}
