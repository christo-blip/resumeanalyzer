const express = require('express');
const multer = require('multer');

const {
  uploadResume,
  analyzeText,
  improveSection
} = require('../controllers/resume.controller');

const router = express.Router();

const upload = multer({
  dest: 'uploads/'
});

router.post(
  '/upload',
  upload.single('resume'),
  uploadResume
);

router.post(
  '/analyze',
  analyzeText
);

router.post(
  '/improve',
  improveSection
);

module.exports = router;