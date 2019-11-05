const mongoose = require('mongoose');

let ContestSchema = new mongoose.Schema ({
  href: {
    type: String,
    required: [true]
  },
  event: {
    type: String,
    required: [true]
  }
});

let Contest = mongoose.model('Contest', ContestSchema);

module.exports = Contest;