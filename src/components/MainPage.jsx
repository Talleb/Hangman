import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import './MainPage.css'

const MainPage = () => {
    const Letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    const FrontEndSocket = io('http://localhost:8080');
    const length = 5    //from backend
    const [word, setWord] = useState([])  
    const [wordLength, setWordLength] = useState('')
    const [Users, setUsers] = useState([]) 
    const [WordGuessed, setWordGuessed] = useState('')
    const [outputWord, setOutputWord] = useState([])
    
    
    const fillWord = () => {
        setWord(Array(wordLength).fill('-'))
    }
    useEffect(() => {

        // let nameUrl = match.params.PlayerName

        FrontEndSocket.emit('UserInfo', '') //**namUrl */

        //Receiving users array from Server & adding to Users
        FrontEndSocket.on('UsersArray', data => {
            console.log(data);
            setUsers(data.Users)
            // setWordLength(data.letters)
            setWord(Array(data.length).fill('-'))
            
        })
        fillWord();

    }, [wordLength])


    useEffect(()=>{
        //Accepting GuessWord with user from server
        FrontEndSocket.on('GuessWord', data=> {
          setOutputWord(data)
          console.log(data);


          if (data.index > -1) {
              console.log('Index number found!');
              console.log(word);
              
              setWord(data.allLetters)
            } 
        })
      }, [WordGuessed])
      
      //Functions
      function SendGuessWord(guess) {
        // FrontEndSocket.emit('Messages', WordGuessed)
        FrontEndSocket.emit('Messages', guess)
        
        // e.target.value = ''
      }


    const inputs = word.map((letter, index) => (<span key={index+letter}>{letter}</span>))

    function LetterClick(e) {
        e.persist()
        let guess = e.target.value
        SendGuessWord(guess)

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