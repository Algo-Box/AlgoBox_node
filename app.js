const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const methodOverride = require("method-override");
const User = require('./models/User');

// Express Stuff
const app = express();
app.use(express.static(__dirname + '/public')); // Directory for static content
app.set('view engine', 'ejs'); // Set the viewEngine
app.use(methodOverride("_method")); // for requests like put(), delete(), patch()
app.use(flash()); // connecting flash

app.use( require("express-session") ( {
  secret:"very_very_secret_indeed",
  resave: false,
  saveUninitialized: false
}));

// To remove Deprecation Warnings
mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

// Database connection
let uri = require('./env')['mongouri'];
mongoose.connect(uri)
.then(() => console.log('Databse Connected'))
.catch((err) => console.log(err));

// Middleware
app.use(bodyParser.json()); // for JSON
app.use(bodyParser.urlencoded({ extended: true })); // For forms through post request

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use( (req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});


// Routes
app.use('/blog', require('./routes/blog')); // Handler for blog routes
app.use('/auth', require('./routes/auth')); // Handler for authentication routes
app.use('/dashboard', require('./routes/dashboard')); // Handler for dashboard routes
app.use('/submissions', require('./routes/submissions')); // Handler for submission routes

app.get('/', (req, res) => {
  res.redirect('/blog');
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