const router = require('express').Router();

// middleware for login

let isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next();
  else {
    req.flash("error", "Please Login");
    res.redirect("/auth/login");
  }
};

router.get("/", isLoggedIn, (req, res, next) => {
  res.render("dashboard");
});

module.exports = router;