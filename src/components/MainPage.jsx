import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import './MainPage.css'

const MainPage = () => {
    const Letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    const FrontEndSocket = io('http://localhost:8080');
    const [word, setWord] = useState([])  
    const [Users, setUsers] = useState([]) 
    const [WordGuessed, setWordGuessed] = useState('')
    const [outputWord, setOutputWord] = useState([])
    
    
    useEffect(() => {

        // let nameUrl = match.params.PlayerName

        FrontEndSocket.emit('UserInfo', '') //**namUrl */

        //Receiving users array from Server & adding to Users
        FrontEndSocket.on('UsersArray', data => {
            console.log(data);
            setUsers(data.Users)
            setWord(Array(data.length).fill('-'))
            
        })

    }, []) 
    //FrontEndSocket as a dependency hooks -> endless loop because socket.io is continuously connecting and disconnecting (see backend terminal)


    useEffect(()=>{
        //Accepting GuessWord with user from server
        FrontEndSocket.on('GuessWord', data=> {
          setOutputWord(data)
          console.log(data);

          if (data.index > -1) {
              setWord(data.allLetters)
            } 
        })
      }, [FrontEndSocket, WordGuessed])
      
    //Functions
    function SendGuessWord(guess) {
        FrontEndSocket.emit('Messages', guess)        
    }
    
    function LetterClick(e) {
        e.persist()
        SendGuessWord(e.target.value)
        
        // e.target value === Skall kontrolleras mot bokstäverna i ordet.
        e.target.value === 'A' ? e.target.className = 'Right' : e.target.className = 'Wrong'
    }
    
    const inputs = word.map((letter, index) => (<span key={index+letter}>{letter}</span>))

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