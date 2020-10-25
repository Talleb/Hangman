const express = require('express');
const app = express();
const port = 3000;
const randomWords = require('random-words');


app.get('/', (req,res) => {
  res.send({
    one: randomWords() ,
    many: randomWords(5) ,
    specificLength: (randomWords({ exactly: 1, maxLength: 6})) 
  })
})

app.listen(port, () => {
  console.log('Listening on port 3000');
  console.log(randomWords())
  console.log(randomWords({ exactly: 1, maxLength: 4 }))
})
