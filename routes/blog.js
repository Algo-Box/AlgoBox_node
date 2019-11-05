const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');


let propComparator = (prop) => {
  return (a, b) => {
    return b[prop] - a[prop];
  };
};

router.get('/', (req, res, next) => {
  Blog.find({}).then((blogs) => {
    blogs.sort(propComparator('created'));
    if(req.isAuthenticated()) {
      res.render('blog_base', {
        user: req.user,
        posts: blogs
      });
    } else {
      res.render('blog_base', {
        posts: blogs
      });
    }
  }).catch(next);
});

router.get('/create_blog', (req, res, next) => {
  if(req.isAuthenticated()) {
    res.render('create_blog', {
      user: req.user.username
    });  
  } else {
    res.render('please_login');
  }
});

router.post('/create_blog', (req, res, next) => {
  let ar = req.body.tags.split(",");
  for (let i = 0; i < ar.length; ++i) {
    ar[i] = ar[i].trim();
  }
  newBlog = new Blog({
    author: req.user.username,
    tags: ar,
    body: req.body.body,
    title: req.body.title,
    slug: req.body.slug
  });

  // Convert to a fromatted text format from a simple paragraph format
  newBlog.body = newBlog.body.replace(/(\r\n|\n\r|\r|\n)/g,"<br />");
  // console.log(newBlog);

  newBlog.save().then(() => {
    res.redirect('/blog/');
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