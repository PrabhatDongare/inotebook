// Creating schema : where user can enter the type of data we need

const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});


const User = mongoose.model('user', UserSchema)
module.exports = User