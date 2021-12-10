const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
require("dotenv").config();
const claimRoutes = require('./routes/claimRoutes.js');
const db = require ('./db/db.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);


app.post('/claim', claimRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});