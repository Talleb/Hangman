//Packages
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');
const cors = require('cors');
const {addUser, FindUser, Users} = require('./Users');
const randomWords = require('random-words');


//Initializing
const app = express();
const server = http.createServer(app)
const backEndSocket = socketIO(server)

//Middlewares
app.use(cors())
app.use(express.static(__dirname + '/../build')) //Listen to the React html

//Variables
const PORT = 8080 || process.env.PORT
let currentGuessedWords = []
const word = randomWords();
let guessedLetters = Array(word.length).fill('-')

//Server Configurations   //BackEndSocket to send and Socket to Recive
backEndSocket.on('connection', Socket => {
  
  //Accepting Name from the FrontEnd and sending back an array with the names
  Socket.on('UserInfo', dataFrontEnd => {
     addUser(Socket.id, dataFrontEnd)
     backEndSocket.emit('UsersArray', { Users, guessedLetters })
  })
  
  Socket.on('Messages', data => {
    //Find the user who send the Guess Word 
    let user = FindUser(Socket.id)
    let exists = (data.length === 1 && word.includes(data.toLowerCase()) ||    
      word === data.toLowerCase()) 
      ? true 
      : false

    currentGuessedWords.push(formatMessage(user.userName, data.toUpperCase(), exists))

    let indexes = data.length === 1 ? checkLetter(data, word) : []

    if (indexes.length > 0 && data.length === 1) {
        indexes.forEach(index => {
          guessedLetters.splice(index, 1, data)
        })
    } 
    if (data.length > 1 && exists) guessedLetters = data.split('')
    console.log(guessedLetters);

    backEndSocket.emit('GuessWord', { currentGuessedWords, guessedLetters })
  })
  //When someone Disconnect do this..
  Socket.on('disconnect', (e)=>{
    console.log(e);
    console.log("someone disconnected or refreshed site");
  })
})


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/../build/index.html'), function (err) {
      if (err) {
          res.status(500).send(err)
      }
  })
})

server.listen(PORT, ()=>{
  try {
    console.log(`Server is running on PORT: ${PORT}`);
    console.log(word);  
  } catch (error) {
    console.error(error);
  }
})

//Functions
function formatMessage(userName, text, exists){
  return {
    userName,
    text,
    exists
  }
}

function checkLetter(letter, statement) {
  let indexes =[]
  const regex = RegExp(letter.toLowerCase(), 'g')
  const matches = statement.matchAll(regex)

  for (const match of matches) {
    indexes.push(match.index)
  }

  return indexes
  
}

