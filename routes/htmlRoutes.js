const express = require('express');
const router = express.Router();
const db = require('../models');
const { isAuthenticated } = require('../config/middleware/authMiddleware');

// Render the homepage
router.get('/', (req, res) => {
  // Fetch the latest blog posts from the database
  db.BlogPost.findAll({
    include: [{ model: db.User, attributes: ['username'] }],
    order: [['createdAt', 'DESC']],
  })
    .then((blogPosts) => {
      res.render('home', { blogPosts, isAuthenticated: req.isAuthenticated(), user: req.user });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Render the login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Render the sign-up page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Render an individual blog post page
router.get('/post/:id', (req, res) => {
  const postId = req.params.id;
  db.BlogPost.findOne({
    where: { id: postId },
    include: [{ model: db.User, attributes: ['username'] }],
  })
    .then((blogPost) => {
      if (!blogPost) {
        res.status(404).json({ error: 'Blog post not found' });
      } else {
        res.render('blogPost', { blogPost, isAuthenticated: req.isAuthenticated(), user: req.user });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;
