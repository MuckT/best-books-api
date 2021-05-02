const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const User = require('./models/user');

//  Seed my Test User
const myUser = new User({
  email: 'mariemarcos25@gmail.com',
  books: [
    {
      name: 'Don Quixote',
      description: 'A retired country gentleman, obsessed with books of chivalry',
      status: false
    },
    {
      name: 'The Great Gatsby',
      description: 'Following World War I, American society enjoyed unprecedented levels of prosperity',
      status: true
    },
    {
      name: 'Hamlet',
      description: 'The Tragedy of Hamlet, Prince of Denmark',
      status: true
    }
  ]
});

// myUser.save(function (err) {
//   if (err) console.log(err);
//   else console.log('saved the user');
// });

// Cors Fix
app.use(cors());

app.get('/', (request, response) => {
  response.send('Make Reading Great Again!');
});

// TODO(MuckT): Handle errors
app.get('/books', (req, res) => {
  User.find({ email: req.query.email }, (err, databaseResults) => {
    // send them in my response
    res.send(databaseResults[0].books);
  });
});

app.post('/books', (req, res) => {
  User.find({ email: req.body.email }, (err, databaseResults) => {
    if (databaseResults.length < 1) {
      res.status(400).send('error: user does not exist');
    } else {
      let user = databaseResults[0];
      console.log(user.books);
      req.body.books.forEach(item => {
        if (typeof (item.name) === 'string' && typeof (item.description) === 'string' && typeof (item.status) === 'boolean') {
          user.books.push(item);
        } else {
          console.log('invalid entry');
        }
      });
      // user.books.push(req.body.books);
      console.log(user.books);
      user.save().then((databaseResults) => {
        console.log(databaseResults);
        res.send(databaseResults.books);
      });
    }
  });
});

app.delete('/books/:id', (req, res) => {
  console.log('delete called');
  let email = req.query.email;
  User.find({ email: email }, (err, userData) => {
    let user = userData[0];
    user.books = user.books.filter(book => book._id.toString() !== req.params.id);
    user.save().then(userData => {
      res.send(userData.books);
    });
  });
});

// Listen on Port
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
