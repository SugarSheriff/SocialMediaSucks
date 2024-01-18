const createPost = (req, res) => {
// Implementation for creating a post
    res.json({ message: 'Post created successfully' });
};
  
  const getPostById = (req, res) => {
    // Implementation for getting a post by ID
    res.json({ message: 'Get post by ID' });
  };
  
  module.exports = {
   createPost,
    getPostById,
  };
  