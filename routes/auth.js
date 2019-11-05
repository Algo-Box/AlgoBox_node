const router = require('express').Router();
const User = require('../models/User');
const flash = require("connect-flash");
const passport = require("passport");

router.get("/", (req, res, next) => {
  res.redirect("/auth/signup");
});

router.get("/signup", (req, res, next) => {
  res.render('signup');
});


router.get("/login", (req, res, next) => {
  res.render('login');
});

router.post("/signup", (req, res, next) => {
  let newUser = new User ({
    username: req.body.username
  });
  User.register(newUser, req.body.password, (err, user) => {
    if(err) {
      console.log(err);
      return res.redirect("/auth/signup");
    } else {
      passport.authenticate("local") (req, res, () => {
        req.flash("Signup Successful");
        return res.redirect("/auth/login");
      });
    }
  });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/auth/login"
}), (req, res) => {});


router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success", "Successful logout");
  res.redirect("/blog");
});


module.exports = router;