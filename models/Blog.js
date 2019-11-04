const mongoose = require('mongoose');

let BlogSchema = new mongoose.Schema ({
  title: {
    type: String,
    required: [true]
  },
  slug: {
    type: String,
    required: [true]
  },
  author: {
    type: String,
    required: [true, 'User is mandatory']
  },
  tags: {
    type: [String],
    default: ['Algorithm']
  },
  body: {
    type: String,
    required: [true, 'Body is mandatory']
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

let Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;