import React, {useState} from 'react'
import io from 'socket.io-client'

const FrontEndSocket = io('http://localhost:8080');

export default function Gameplay() {
  const [names, setNames] = useState([])

  //SocketIO
  FrontEndSocket.on('ChatInfo', name =>{
    setNames(name)
  })
  //Functions
  function GuessLetter(e) {
    let typeValue = e.target.value
  }
  
  return (
    <div id="chatBox">
      {names.map(name => <p key={name}>{name}</p>)}
      <input onChange={GuessLetter} type="text"/>
    </div>
  )
}
