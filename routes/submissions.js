const router = require('express').Router();
const User = require('../models/User');
const request = require('request');

// middleware for login

let isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next();
  else {
    req.flash("error", "Please Login");
    res.redirect("/auth/login");
  }
};

router.get("/", isLoggedIn, (req, res, next) => {
  let url = "https://codeforces.com/api/user.status?handle=" + req.user.codeforces + "&from=1&count=10000000";
  request(url, { json: true }, (err, resp, body) => {
    if(err) {
      return console.log(err);
    }
    if(resp.body.status != 'OK') {
      return res.send("Invalid ID Please change your codeforces ID and enter a valid ID");
    }
    let result = resp.body.result;
    let tags = {};
    let index = {};
    for (let i = 0; i < result.length; ++i) {
      if(result[i]["verdict"] != 'OK') continue;
      if(index[result[i]["problem"]["index"]] === undefined) {
        index[result[i]["problem"]["index"]] = 0; 
      }
      index[result[i]["problem"]["index"]] += 1; 
      for(let j = 0; j < result[i]["problem"]["tags"].length; ++j) {
        if(tags[result[i]["problem"]["tags"][j]] === undefined) {
          tags[result[i]["problem"]["tags"][j]] = 0;
        }
        tags[result[i]["problem"]["tags"][j]] += 1;
      }
    }
    console.log(index);
    console.log(tags);
    res.redirect("/");      
  });
});

module.exports = router;