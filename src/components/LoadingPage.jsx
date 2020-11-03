import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom'
import io from 'socket.io-client'
import './LoadingPage.css'

const FrontEndSocket = io('http://localhost:8080');

const LoadingPage = ({match}) => {
    const [Users, setUsers] = useState([])
    console.log(match);
    
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
    
    return (
        <div className="App">
            <h1>Spooky Hangman</h1>
            {Users.length < 2 ? <h2>WAITING FOR PlAYER TWO</h2> : ""}  

            <div id="users">
              <h2>users</h2>
              {Users.map(user => <span key={user.id}>{user.userName}</span>)}
            </div>
            {Users.length < 2 ? "" : <NavLink to="/Gameplay" className="StartGame-Btn">Start Game</NavLink>}
        </div>
    )
}

export default LoadingPage;