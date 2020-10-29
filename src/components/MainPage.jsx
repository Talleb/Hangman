import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'

const MainPage = () => {
    const [PlayerName, setPlayerName] = useState('')
    
    //Variables
    const history = useHistory()
    
    //Functions
    function submitName (e){
        e.preventDefault()
        //Skickar Name Via URL
        history.push(`/Gameplay/${PlayerName}`)
    }
    return (
        <div>
            <h1>Spooky Hangman</h1>
            <form onSubmit={submitName}>
                <label>Name</label>
                <input onChange={(e)=>{setPlayerName(e.target.value)}} type="text" name="nameInfo" placeholder="Inser Name..."></input> 
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default MainPage;