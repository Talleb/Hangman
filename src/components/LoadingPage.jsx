import React, {useState, useEffect} from 'react';
import {NavLink, useHistory} from 'react-router-dom'
import io from 'socket.io-client'
import './LoadingPage.css'

const FrontEndSocket = io('http://localhost:8080');

const LoadingPage = ({match}) => {
    const [Users, setUsers] = useState([])
    const [startG, setStartG] = useState(false)
    //Variables
    let History = useHistory()

    useEffect(() => {
        let nameUrl = match.params.PlayerName
        //Sending name to Server
        FrontEndSocket.emit('UserInfo', nameUrl)
        //Reciving users array from Server & adding to Users
        FrontEndSocket.on('UsersArray', data => {
        setUsers(data)
        })
    }, [match])

    //When both users have loaded and someone Clicks Start Game Button then both users move to the /Gameplay Component
    useEffect(()=>{
        FrontEndSocket.on('StartG', data => {
            setStartG(data)
        })
        // need to fix the useState clean up function on this if state. Else everything works fine
        if(startG){
         History.push("/Gameplay")
        }
        
    }, [startG])
    //Functions
    function StartGameSocket() {  
        //Sending confirmation to all users that the game has started
        FrontEndSocket.emit('StartGame', true)
    }

    return (
        <div className="App">
            <h1>Spooky Hangman</h1>
            {Users.length < 2 ? <h2>WAITING FOR PlAYER TWO</h2> : ""}  

            <div id="users">
              <h2>users</h2>
              {Users.map(user => <span key={user.id}>{user.userName}</span>)}
            </div>
            {Users.length < 2 ? "" : <button onClick={StartGameSocket} className="StartGame-Btn">Start Game</button>}
        </div>
    )
}

export default LoadingPage;