const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  name: String,
  description: String,
  status: Boolean
});

const userSchema = new Schema({
  email: String,
  books: [bookSchema]
});

// make a model out of the schema
const User = mongoose.model('User', userSchema);

// export the model
module.exports = User;