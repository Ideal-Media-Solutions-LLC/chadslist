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
  console.log('connected', socket.id);
  socket.on('disconnect', () => console.log('disconnected', socket.id))
});


server.listen(PORT, () => {
  console.log(`Backend listening at http://localhost:${PORT}`);
});

