const db = require('../../models');

module.exports = {
  // Create a new blog post
  createPost: (req, res) => {
    const { title, content } = req.body;
    db.BlogPost.create({ title, content, UserId: req.user.id })
      .then((post) => {
        res.redirect('/dashboard');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      });
  },

  // Delete a blog post
  deletePost: (req, res) => {
    const postId = req.params.id;
    db.BlogPost.destroy({ where: { id: postId } })
      .then(() => {
        res.redirect('/dashboard');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      });
  },

  // Update a blog post
  updatePost: (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    db.BlogPost.update(
      { title, content },
      { where: { id: postId } }
    )
      .then(() => {
        res.redirect('/dashboard');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      });
  },
};
