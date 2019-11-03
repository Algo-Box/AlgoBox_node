const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, 'Name is mandatory']
  },
  email: {
    type: String,
    required: [true, 'Email field is mandatory']
  },
  username: {
    type: String,
    required: [true, 'Username Field is mandatory']
  },
  codeforces: {
    type: String,
    required: [false]
  },
  codechef: {
    type: String,
    required: [false]
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

let User = mongoose.model('User', UserSchema);

module.exports = User;