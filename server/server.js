const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const randomWords = require('random-words');
const word = randomWords();


app.use( express.static(__dirname + '/../build'));

let letters = [];

io.on('connection', (socket) => {
  console.log('a user is connected!');

  // send a message to everyone incl. sender
  socket.on('toserver', (msg) => {
    console.log('message: ', msg);

    let exists = word.includes(msg)
    let index = word.indexOf(msg);

    letters.push(msg.toUpperCase());
    letters.push(exists)
    console.log(letters);

    io.emit('touser', {
      letter: msg.toUpperCase(),
      exists,
      index: index > -1 ? index : '',
      allLetters: letters
    })

  })
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

  // send a message to all sockets except the emitting sockets
  socket.broadcast.emit('hi everyone!')
})

// this event will be emitted to all connected sockets
io.emit('some event', {
  someProperty: 'some value', otherProperty: 'other value'
})


const port = process.env.PORT || 8000;

http.listen(port, () => {
  console.log('Hangman server listening on port ', port);
  console.log(word);
})



// res.send({ word: randomWords() }) 
// res.send({ word }) -> word does not change on page refresh