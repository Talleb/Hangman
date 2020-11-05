import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import io from 'socket.io-client'
import './Gameplay.css'
import figure1 from '../images/Figure1.png'
import figure2 from '../images/Figure2.png'
import figure3 from '../images/Figure3.png'
import figure4 from '../images/Figure4.png'
import figure5 from '../images/Figure5.png'
import figure6 from '../images/Figure6.png'
import figure7 from '../images/Figure7.png'

const FrontEndSocket = io('/');

export default function Gameplay({ match }) {
  const [figure, setFigure] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  const [guessedLetters, setGuessedLetters] = useState([])
  const [Users, setUsers] = useState([])
  const [startG, setStartG] = useState(false)
  const [displayGame, setDisplayGame] = useState('none')
  const [WordGuessed, setWordGuessed] = useState('')
  const [outputWord, setOutputWord] = useState([])
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  let figureIndex = 0
  const figures = ["", figure1, figure2, figure3, figure4, figure5, figure6, figure7]
  const history = useHistory()

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
      console.log(data); // this is an object with currentGuessedWorsd and GuessedLetters
      data.currentGuessedWords[data.currentGuessedWords.length - 1].exists === true ? console.log('Right') : hangMan()
      setOutputWord(data.currentGuessedWords)
      setGuessedLetters(data.guessedLetters)

      let lastGuess =
        data.currentGuessedWords[data.currentGuessedWords.length - 1]

      if (lastGuess.text.length > 1 && !lastGuess.exists) {
        console.log(lastGuess);
        setShowMessage(true)
        setTimeout(() => {
          setShowMessage(false)
        }, 2500)
      }
    })
  }, [])

  let inputs = guessedLetters.map((letter, index) => (<span className={letter === '-' ? 'guesses' : 'chatting'} key={index + letter}>{letter}</span>))


  useEffect(() => {
    FrontEndSocket.on('startNow', data => {
      setStartG(data)
    })
    //If 2 users are online then show the GamePlay
    if (startG) {
      setDisplayGame('block')
    }

  }, [startG])
  //++++++++++ Functions
  function StartingTheGame() {
    //Code to start the game for all users via SockeIO
    FrontEndSocket.emit('StartGame', true)
  }

  function SendGuessWord(e) {
    e.preventDefault()
    //Sending Guess Word to the server
    FrontEndSocket.emit('Messages', WordGuessed)

    e.target.value = '' // need to find a way to reset the guessedWord input
  }

  function SendLetter(e) {
    e.preventDefault()
    //Sending Letter to the server
    FrontEndSocket.emit('Messages', e.target.value)
  }

  function getClass(letter) {
    let word = outputWord.find(word => word.text.indexOf(letter) > -1)
    if (word && word.text.length === 1) {
      if (word.exists) return 'Right'
      else return 'Wrong'
    } else {
      return 'Active'
    }
  }

  function hangMan() {
    figureIndex = figureIndex + 1
    console.log("Wrong")
    setFigure(figures[figureIndex])
  }

  function restart(e) {
    e.preventDefault()
    FrontEndSocket.emit('restart', true)
    console.log('Restarting!!')
    history.push('/')
  }

  return (
    <div>
      <h1>Spooky Hangman</h1>
      <div id="users">
        <h2>users</h2>
        {Users.map(user => <span key={user.id}>{user.userName}</span>)}
      </div>
      <div>
        <img src={figure} />
      </div>
      <div className="word-container">
        {
          showMessage
            ? <span className="error">Incorrect word!!</span>
            : inputs
        }
      </div>
      <button style={{ display: Users.length >= 2 ? 'block' : 'none', margin: '0 auto' }} onClick={StartingTheGame}>Start Game!</button>

      <div id="Gameplay" style={{ display: displayGame }}>
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
      <div>
        <button onClick={restart}>Restart</button>
      </div>

    </div >
  )
}
