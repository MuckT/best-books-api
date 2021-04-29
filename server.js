const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const User = require('./models/user');

//  Seed my Test User
const myUser = new User({
  email: 'test.0000@mailinator.com', 
  books: [
    {  
      name: "Moby Dick",
      description: "Just a good simple tale about a man who hates an animal",
      status: false
    },
    {
      name: "The Old Man and the Sea",
      description: "A story about a casual fishing trip",
      status: true
    },
    {
      name: "Odysseus",
      description: "A three-hour tour gone awry",
      status: true
    }
  ]
});

myUser.save(function (err) {
  if (err) console.err(err);
  else console.log('saved the user');
});


const app = express();
const PORT = process.env.PORT || 3001;

// Cors Fix
app.use(cors());

app.get('/', (request, response) => {
  response.send('Make Reading Great Again!');
});

// TODO(MuckT): Handle errors
app.get('/books', (req, res) => {
  User.find({email: req.query.email}, (err, databaseResults) => {
    // send them in my response
    res.send(databaseResults[0].books);
  });
});

// Listen on Port
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
