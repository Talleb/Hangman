import React from 'react';
// import './MainPage.css'

const MainPage = () => {
    const Letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    function LetterClick(e) {
        // e.target value === Skall kontrolleras mot bokstäverna i ordet.
        e.target.value === 'A' ? e.target.className = 'Right' : e.target.className = 'Wrong'
    }

    return (
        <div>
            <h1>Spooky Hangman</h1>
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