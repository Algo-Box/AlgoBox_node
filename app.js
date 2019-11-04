const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// To remove Deprecation Warnings
mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

// Database connection
let uri = require('./env')['mongouri'];
mongoose.connect(uri);

// Middleware
app.use(bodyParser.json()); // for JSON
app.use(bodyParser.urlencoded({ extended: true })); // For forms through post request
app.use('/blog', require('./routes/blog'));

app.get('/', (req, res) => {
  res.render('index');
});

// error handling middleware
app.use((err, req, res, next) => {
  res.status(422);
  res.send({error: err.message});
});

// Error Landing
app.get('*', (req, res) => {
  res.status(404);
  res.render('404');
});

app.listen(3000 || process.env.PORT, () => {
  console.log('Connection Started');
});