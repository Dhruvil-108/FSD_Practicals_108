const express = require('express');
const path = require('path');

const app = express();

//Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const homeRoute = require('./routes/home');
app.use('/', homeRoute);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
