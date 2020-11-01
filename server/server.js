// Brian's server edited by Vimbayi

//Packages
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');
const cors = require('cors');
const randomWords = require('random-words');
const {addUser, FindUser, Users} = require('./Users');
let alphabet = require('./alphabet');

//Initializing
const app = express();
const server = http.createServer(app)
const backEndSocket = socketIO(server)

//Middlewares
app.use(cors())    //temp disable cors()
app.use(express.static(__dirname + '/../build')) //Listen to the React html

//Variables
const PORT = 8080 || process.env.PORT
let currentGuessedWords = []
const word = randomWords();
let letters = Array(word.length).fill('-')


//Server Configurations   //BackEndSocket to send and Socket to Recive
backEndSocket.on('connection', Socket => {
  console.log('a user is connected!');
  
  //Accepting Name from the FrontEnd and sending back an array with the names
  Socket.on('UserInfo', dataFrontEnd => {
     addUser(Socket.id, dataFrontEnd)
     backEndSocket.emit('UsersArray', {
       alphabet,
       Users,
       length: word.length,
       letters
      })
  })
  
  Socket.on('Messages', data => {
    //Find the user who send the Guess Word 
    let user = FindUser(Socket.id)
    // currentGuessedWords.push(formatMessage(user.userName, data))

    // convert into function
    let exists = (word.includes(data.toLowerCase()) || word === data.toLowerCase()) ? true : false

    let index = data.length === 1 ? word.indexOf(data.toLowerCase()) : -1;

    if (index > -1) {
      letters.splice(index, 1, data)
    }

    if (data.length === 1) {
      alphabet.map(letter => {
        if(letter.name === data) {
          exists ? letter.class = "Right" : letter.class = "Wrong"
        }
      })
    }

    console.log(letters);

    backEndSocket.emit('GuessWord', {
      letter: data.toUpperCase(),
      exists,
      index: index,
      length: word.length,
      allLetters: letters,
      currentGuessedWords,
      alphabet
    })


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
  console.log(word);
  console.log(word.length);

})

//Functions
function formatMessage(userName, Text){
  return {
    userName,
    Text
  }
}