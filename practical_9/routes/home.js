const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Product Site</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <div class="container">
        <h1>Welcome to our site</h1>
        <p>This is a basic Express.js proof of concept.</p>
      </div>
    </body>
    </html>
  `);
});

module.exports = router;
