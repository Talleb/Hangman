import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Communication.css'

function Communication() {

  const [messages, setMessages] = useState(['How are you?']);
  const [feedback, setFeedback] = useState('');
  
  const socket = io();

  const submit = (e) => {
    e.preventDefault();
    let text = e.target.childNodes[0].value;

    // removing this caused previous li elements to be replaced by the latest
    setMessages([...messages, text]) 

    socket.emit('chat message', text);

    e.target.childNodes[0].value = ""
    
    return false
  }

  // socket.on('connect', () => {
  //   setMessages([...messages, 'How do you do?'])
  // })

  useEffect(() => {

    socket.on('chat message', (payload) => {
      // setFeedback(payload)
      setMessages([...messages, payload.letter, payload.exists.toString()])
      console.log(messages);
      console.log('All letters from backend:');
      console.log(payload.allLetters);
    })

  }, [messages])


  return (
    <div>
      <ul id="messages">
        {
         messages.map((msg, i) => (<li key={i}>{msg}</li>))
        }
      </ul>
      <form action="" id="form" onSubmit={submit}>
        <input autoComplete="off" id="input" />
        <button>Send</button>

      </form>
      
    </div>
  );
}

export default Communication;
