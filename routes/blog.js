const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/', (req, res, next) => {
  Blog.find({}).then((blogs) => {
    res.render('blog_base', {
      posts: blogs
    });
  }).catch(next);
});

router.post('/', (req, res, next) => {
  newBlog = new Blog({
    author: req.body.author,
    tags: req.body.tags,
    body: req.body.body,
    title: req.body.title,
    slug: req.body.slug
  });

  // Convert to a fromatted text format from a simple paragraph format
  newBlog.body = newBlog.body.replace(/(\r\n|\n\r|\r|\n)/g,"<br />");
  
  newBlog.save().then(() => {
    res.send(newBlog);
  }).catch(next);
});

router.get('/create_blog', (req, res, next) => {
  res.render('create_blog');
});

router.post('/create_blog', (req, res, next) => {
  let ar = req.body.tags.split(",");
  for (let i = 0; i < ar.length; ++i) {
    ar[i] = ar[i].trim();
  }
  newBlog = new Blog({
    author: req.body.author,
    tags: ar,
    body: req.body.body,
    title: req.body.title,
    slug: req.body.slug
  });

  // Convert to a fromatted text format from a simple paragraph format
  newBlog.body = newBlog.body.replace(/(\r\n|\n\r|\r|\n)/g,"<br />");
  // console.log(newBlog);

  newBlog.save().then(() => {
    res.send(newBlog);
  }).catch(next);
});

router.get('/:slug', (req, res, next) => {
  // console.log(req.params.slug);
  Blog.find({slug: req.params.slug}).then((blog) => {
    if(blog.length === 0) {
      next();
    } else {
      res.render('single_blog', {
        post: blog[0]
      });
    }
  }).catch(next);
});

module.exports = router;