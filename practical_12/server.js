// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the calculator form
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Common Calculator</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <div class="container">
        <h1>Common Calculator</h1>
        <form action="/calculate" method="post">
          <input type="text" name="num1" placeholder="Enter first number" required>
          <select name="operation">
            <option value="add">+</option>
            <option value="subtract">-</option>
            <option value="multiply">*</option>
            <option value="divide">/</option>
          </select>
          <input type="text" name="num2" placeholder="Enter second number" required>
          <button type="submit">Calculate</button>
        </form>
        <div class="result">
          <p>${req.query.result || ''}</p>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Handle calculation
app.post('/calculate', (req, res) => {
  let num1 = parseFloat(req.body.num1);
  let num2 = parseFloat(req.body.num2);
  let operation = req.body.operation;

  // Validation
  if (isNaN(num1) || isNaN(num2)) {
    return res.redirect('/?result=' + encodeURIComponent('❌ Please enter valid numbers.'));
  }

  let result;
  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      if (num2 === 0) {
        return res.redirect('/?result=' + encodeURIComponent('❌ Cannot divide by zero.'));
      }
      result = num1 / num2;
      break;
    default:
      result = '❌ Invalid operation.';
  }

  res.redirect('/?result=' + encodeURIComponent(`✅ Result: ${result}`));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
