// server.js
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Enable file upload
app.use(fileUpload());

// Create uploads folder if not exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve upload form
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Upload Resume</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <div class="container">
        <h1>Upload Your Resume</h1>
        <form action="/upload" method="post" enctype="multipart/form-data">
          <input type="file" name="resume" accept=".pdf" required>
          <button type="submit">Upload</button>
        </form>
        <div class="message">${req.query.message || ''}</div>
      </div>
    </body>
    </html>
  `);
});

// Handle upload (PDF + size ≤2MB)
app.post('/upload', (req, res) => {
  if (!req.files || !req.files.resume) {
    return res.redirect('/?message=' + encodeURIComponent('❌ No file uploaded.'));
  }

  const resume = req.files.resume;

  // Check MIME type and extension
  const allowedMime = 'application/pdf';
  if (resume.mimetype !== allowedMime || path.extname(resume.name).toLowerCase() !== '.pdf') {
    return res.redirect('/?message=' + encodeURIComponent('❌ Only PDF files are allowed.'));
  }

  // Check file size (<=2MB)
  if (resume.size > 2 * 1024 * 1024) {
    return res.redirect('/?message=' + encodeURIComponent('❌ File too large. Maximum 2MB allowed.'));
  }

  // Save file
  const savePath = path.join(uploadDir, Date.now() + '-' + resume.name);
  resume.mv(savePath, (err) => {
    if (err) {
      console.error(err);
      return res.redirect('/?message=' + encodeURIComponent('❌ Error uploading file.'));
    }
    res.redirect('/?message=' + encodeURIComponent('✅ Resume uploaded successfully!'));
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
