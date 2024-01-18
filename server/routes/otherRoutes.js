const express = require('express');
const router = express.Router();

// Other routes
router.get('/other/:id', (req, res) => {
  // Handle the route logic here
  res.send('GET request for Other route');
});

router.post('/other', (req, res) => {
  // Handle the route logic here
  res.send('POST request for Other route');
});

module.exports = router;
