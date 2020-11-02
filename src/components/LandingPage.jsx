import React from 'react';
import './LandingPage.css'

const LandingPage = () => {
    return (
        <div>
            <h1>Welcome to the Scary</h1>
            <h1>Spooky Hangman</h1>
            <h1>Game</h1>


                <form>
                <label>   Name:<input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default LandingPage;