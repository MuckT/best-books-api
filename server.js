const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Cors Fix
app.use(cors());

app.get('/', (request, response) => {
  response.send('Make Reading Great Again!');
});

// Listen on Port
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
