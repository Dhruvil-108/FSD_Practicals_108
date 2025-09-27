// routes/home.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Dashboard</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <header class="header">
          <h1>🚀 MyApp Dashboard</h1>
        </header>
        <main class="container">
          <h2>Welcome!</h2>
          <p>This is your future dashboard page.</p>
          <div class="card-grid">
            <div class="card">
              <h3>Feature 1</h3>
              <p>Quick access to your main data.</p>
            </div>
            <div class="card">
              <h3>Feature 2</h3>
              <p>Analytics and insights.</p>
            </div>
            <div class="card">
              <h3>Feature 3</h3>
              <p>User management panel.</p>
            </div>
          </div>
        </main>
        <footer class="footer">
          <p>© 2025 MyApp Team</p>
        </footer>
      </body>
    </html>
  `);
});

module.exports = router;
