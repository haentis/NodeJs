const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const connections = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
 
  connections.push(socket.id);

  
  io.emit('connections', connections);

 
  socket.on('private message', (msg, targetSocketId) => {
   
    io.to(targetSocketId).emit('private message', msg);
  });

 
  socket.on('disconnect', () => {
   
    const index = connections.indexOf(socket.id);
    if (index !== -1) {
      connections.splice(index, 1);
    }

    io.emit('connections', connections);
  });
});

http.listen(3000, () => {
  console.log('Server listening on *:3000');
});
