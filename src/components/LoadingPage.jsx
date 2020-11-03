import React, {useState, useEffect} from 'react';
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
             <h2>WAITING FOR PlAYER TWO</h2>  

            <div id="users">
              <h2>users</h2>
              {Users.map(user => <span key={user.id}>{user.userName}</span>)}
            </div>
            {Users.length < 2 ? "" : <button>Start Game</button>}
        </div>
    )
}

export default LoadingPage;