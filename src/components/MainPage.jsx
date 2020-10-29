import React, { useEffect, useState } from 'react';
import './MainPage.css'

const MainPage = () => {
    const Letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    /** Vimbayi - start */
    const length = 5    //from backend
    const [word, setWord] = useState([])   
    
    useEffect(() => {
        const fillWord = () => {
            setWord(Array(length).fill('-'))
        }
        fillWord();

    }, [])


    const inputs = word.map(letter => (<span>{letter}</span>))
    /** end */

    function LetterClick(e) {
        // e.target value === Skall kontrolleras mot bokstäverna i ordet.
        e.target.value === 'A' ? e.target.className = 'Right' : e.target.className = 'Wrong'
    }

    return (
        <div>
            <h1>Spooky Hangman</h1>
            <div>{ inputs }</div>
            <div>
                {Letters.map((Letter) =>
                    <button
                        className="Active"
                        value={Letter}
                        key={Letter}
                        onClick={e => LetterClick(e)}> {Letter}
                    </button>)}
            </div>
        </div>
    )
}

export default MainPage;