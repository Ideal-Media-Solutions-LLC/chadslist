const express = require('express');
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');

const app = express ();
const PORT = 3200;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server (server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  },
});

io.on('connection', (socket) => {
  // console.log('connected', socket.id);
  socket.on("join_chat", convoId => {
    socket.join(convoId);
    console.log(`User with ID: ${socket.id} joined convo: ${convoId}`);
  })

  socket.on("send_msg", (messageData) =>{
    socket.to(messageData.id).emit("receive_msg", messageData);
  })

  socket.on('disconnect', () => console.log('disconnected', socket.id))
});


server.listen(PORT, () => {
  console.log(`chat Server listening at http://localhost:${PORT}`);
});

