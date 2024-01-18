const express = require('express');
const router = express.Router();
const UserController = require('/Users/liamhulsey/GitHub/SocialMediaSucks/controllers/userController.js'); // Updated path
const PostController = require('/Users/liamhulsey/GitHub/SocialMediaSucks/controllers/postController.js'); // Updated path

// User-related routes
router.post('/users', UserController.createUser);
router.get('/users/:userId', UserController.getUserById);
// Add more user-related routes as needed

// Post-related routes
router.post('/posts', PostController.createPost);
router.get('/posts/:postId', PostController.getPostById);

module.exports = router;
