const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json())
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});