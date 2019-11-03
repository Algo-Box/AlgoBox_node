const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/', (req, res, next) => {
  Blog.find({}).then((blogs) => {
    res.render('blog_base', {
      blogs: blogs
    });
  }).catch(next);
});

router.post('/', (req, res, next) => {
  newBlog = new Blog({
    author: req.body.author,
    tags: req.body.tags,
    body: req.body.body,
  });
  newBlog.body = newBlog.body.replace(/\n/g,"<br />");
  newBlog.save().then(() => {
    res.send(newBlog);
  }).catch(next);
});

module.exports = router;