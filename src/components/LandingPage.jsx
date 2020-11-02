import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import './LandingPage.css'

const LandingPage = () => {
    const [PlayerName, setPlayerName] = useState('')

    //Variables
    const history = useHistory()

    //Functions
    function submitName(e) {
        e.preventDefault()
        //Skickar Name Via URL
        history.push(`/Gameplay/${PlayerName}`)
    }
    return (
        <div>
            <h1>Welcome to the Scary</h1>
            <h1>Spooky Hangman Game</h1>


            <form onSubmit={submitName}>
                <label>Name</label>
                <input onChange={(e) => { setPlayerName(e.target.value) }} type="text" name="nameInfo" placeholder="Inser Name..."></input>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default LandingPage;