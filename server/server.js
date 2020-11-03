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
    currentGuessedWords.push(formatMessage(user.userName, data))

    let index = data.length === 1 ? word.indexOf(data.toLowerCase()) : -1;

    if (index > -1) {
      guessedLetters.splice(index, 1, data)
    }

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
  console.log(`Server is running on PORT: ${PORT}`);
  console.log(word);  /** */
})

//Functions
function formatMessage(userName, Text){
  return {
    userName,
    Text
  }
}
