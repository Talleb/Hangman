import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid';

const FrontEndSocket = io('http://localhost:8080');

export default function Gameplay({match}) {
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
      setUsers(data)
    })
  }, [match])
  
  useEffect(()=>{
    //Acceting GuessWord with user from server
    FrontEndSocket.on('GuessWord', data=> {
      setOutputWord(data)
      console.log(data);
    })
  }, [WordGuessed])
  
  //Functions
  function SendGuessWord(e) {
    e.preventDefault()
    //Sending Guess Word to the server
    FrontEndSocket.emit('Messages', WordGuessed)
    
    e.target.value = ''
  }
  
  return (
    <div id="chatBox">
      <div id="users">
        Users
        {Users.map(user => <span key={user.id}>{user.userName}</span>)}
      </div>
    
      <form onSubmit={SendGuessWord}>
        <label>Guess Word</label>
        <input onChange={(e)=>{setWordGuessed(e.target.value)}} maxLength="1" type="text" placeholder="Send Text"/>
        <input type="submit" value="Send"/>
      </form>

      <div id="chatting">
        {outputWord.map(outputWord => <span key={uuidv4()}>{outputWord.Text}</span>)}
      </div>

      <Link to="/">HomePage</Link>
    </div>
  )
}
