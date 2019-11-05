const router = require('express').Router();
const User = require('../models/User');

// middleware for login

let isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next();
  else {
    req.flash("error", "Please Login");
    res.redirect("/auth/login");
  }
};

router.post("/", isLoggedIn, (req, res, next) => {
  User.findOne({username: req.user.username}).then( (user) => {
    user.name = req.body.name;
    user.email = req.body.email;
    user.codeforces = req.body.codeforces;
    user.codechef = req.body.codechef;
    user.save().then(() => {}).catch(err => console.log(err));
    res.redirect("/dashboard");
  }).catch(next);
});

router.get("/", isLoggedIn, (req, res, next) => {
  res.render("dashboard", {
    user: req.user
  });
});

module.exports = router;