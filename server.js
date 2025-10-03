// server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure file upload
const upload = multer({ dest: 'uploads/' });

// Test route
app.get('/', (req, res) => {
  res.send('WasteWise AI Backend Running 🚀');
});

// Upload route for image + AI classification
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Call Python script for classification
  const python = spawn('python', [
    path.join(__dirname, 'model/predict.py'),
    req.file.path
  ]);

  python.stdout.on('data', (data) => {
    res.json({ classification: data.toString().trim() });
  });

  python.stderr.on('data', (data) => {
    console.error(`Python error: ${data.toString()}`);
    res.status(500).json({ error: data.toString() });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
