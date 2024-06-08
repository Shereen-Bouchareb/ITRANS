const express = require('express');
const app = express();

// Define any necessary routes or middleware
app.get('/', (req, res) => {
  res.send(' Server running');
});

module.exports = app;
