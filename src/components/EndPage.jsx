import React from 'react';
import './EndPage.css'

const EndPage = () => {
    return (
        <div>
            <h1>Spooky Hangman</h1>
             <h2>The Winner IS</h2>  
            <h3> ZOMBIE </h3>
             <div>
                <button className="endButton" onclick="returnToMainPage()">
                    Return To MainPage
                </button>
            </div>
        </div>
    )
}

export default EndPage;