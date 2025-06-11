import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Setup storage
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('media'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    message: 'File uploaded successfully',
    path: `/uploads/${req.file.filename}`,
  });
});

export default router; // ✅ Correct export for ES modules
