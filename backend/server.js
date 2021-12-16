const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const authRoutes = require('./routes/authRoutes.js');
const claimRoutes = require('./routes/claimRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const itemRoutes = require('./routes/itemRoutes.js');
const historyRoutes = require('./routes/historyRoutes.js');
const calendarRoutes = require('./routes/calendarRoutes.js');
require("dotenv").config();
const db = require ('./db/db.js');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/calendar', calendarRoutes);
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/claim', claimRoutes);
app.use('/history', historyRoutes);
app.use('/items', itemRoutes);
app.get('/history/*', historyRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

io.on('connection', function(socket){
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });
});

server.listen(3002)

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});