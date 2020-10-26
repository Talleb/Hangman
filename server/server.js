const express = require('express');
const app = express();
const randomWords = require('random-words');


const word = randomWords();

app.get('/', (req,res) => {
  res.send({ word: randomWords() }) 
  // res.send({ word }) -> word does not change on page refresh
})


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Hangman server listening on port ', port);
  console.log(word);
})
