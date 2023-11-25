const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());

// Set up storage for multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.json({ message: 'File uploaded successfully' });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

// Get list of uploaded files route
app.get('/files', (req, res) => {
  const files = getFilesFromUploads();
  res.json({ files });
});

// Helper function to get files from the uploads directory
const getFilesFromUploads = () => {
  const fs = require('fs');
  const directoryPath = path.join(__dirname, 'uploads');

  return fs.readdirSync(directoryPath);
};

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
