//Packages
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');
const cors = require('cors');
const { emit } = require('process');

//Initializing
const app = express();
const server = http.createServer(app)
const backEndSocket = socketIO(server)

//Middlewares
app.use(cors())
app.use(express.static(__dirname + '/../build')) //Listen to the React html

//Variables
const PORT = 8080 || process.env.PORT
let users = []
//Server Configurations   //BackEndSocket to send and Socket to Recive
backEndSocket.on('connection', Socket => {
  
  //Accepting Name from the FrontEnd and sending back an array with the names
  Socket.on('NameInfo', dataFrontEnd => {
    users.push(dataFrontEnd)
    backEndSocket.emit('ChatInfo', users)
    console.log(dataFrontEnd);
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
})

