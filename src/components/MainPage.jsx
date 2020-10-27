import React, {useState} from 'react';
import io from 'socket.io-client'
import {useHistory} from 'react-router-dom'
import './MainPage.css'


const FrontEndSocket = io('http://localhost:8080/')

const MainPage = () => {
    const [userName, setUserName] = useState('')
    //Variables
    const history = useHistory()
    
    //Functions
    function submitName (e){
        e.preventDefault()
        history.push(`/Gameplay`)

        FrontEndSocket.emit('NameInfo', userName)
    }
    return (
        <div>
            <h1>Spooky Hangman</h1>
            <form onSubmit={submitName}>
                <label>Name</label>
                <input onChange={(e)=> setUserName(e.target.value)} type="text" name="nameInfo" placeholder="Inser Name..."></input> 
                <input type="submit" value="Submit"/>
            </form>
        </div >
    )
}

export default MainPage;