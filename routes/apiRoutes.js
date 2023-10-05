const express = require('express');
const router = express.Router();
const db = require('../models');
const { isAuthenticated } = require('../config/middleware/authMiddleware');

// Create a new blog post
router.post('/create', isAuthenticated, (req, res) => {
  const { title, content } = req.body;
  db.BlogPost.create({ title, content, UserId: req.user.id })
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Update a blog post
router.put('/update/:id', isAuthenticated, (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  db.BlogPost.update(
    { title, content },
    { where: { id: postId, UserId: req.user.id } }
  )
    .then((result) => {
      if (result[0] === 0) {
        res.status(404).json({ error: 'Blog post not found' });
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Delete a blog post
router.delete('/delete/:id', isAuthenticated, (req, res) => {
  const postId = req.params.id;
  db.BlogPost.destroy({ where: { id: postId, UserId: req.user.id } })
    .then((result) => {
      if (result === 0) {
        res.status(404).json({ error: 'Blog post not found' });
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;
