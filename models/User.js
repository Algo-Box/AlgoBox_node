const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [false],
    default: "null"
  },
  email: {
    type: String,
    required: [false],
    default: "null"
  },
  username: {
    type: String,
    required: [true]
  },
  password: {
    type: String
  },
  codeforces: {
    type: String,
    required: [false],
    default: "null"
  },
  codechef: {
    type: String,
    required: [false],
    default: "null"
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.plugin(passportLocalMongoose);
let User = mongoose.model('User', UserSchema);

module.exports = User;