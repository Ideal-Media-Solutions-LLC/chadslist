const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
require("dotenv").config();
const claimRoutes = require('./routes/claimRoutes.js');
const addItemRoutes = require('./routes/addItemRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const db = require ('./db/db.js');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.post('/claim', claimRoutes);
app.post('/additem', addItemRoutes);

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