const express = require('express');
const router = express.Router();

// Import controller functions
const { translateVideoTranscript } = require('../controllers/translateController');
const { translatePdf } = require('../controllers/pdfTranslateController');
const { generateQuiz } = require('../controllers/quizController');

// Multer config for in-memory PDF uploads
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Route: Translate video transcript (YouTube)
router.post('/translate', translateVideoTranscript); // POST /api/translate

// ✅ Route: Translate uploaded PDF file
router.post('/translate-pdf', upload.single('pdfFile'), translatePdf); // POST /api/translate-pdf

// ✅ Route: Generate quiz from topic
router.post('/generate-quiz', generateQuiz); // POST /api/generate-quiz

module.exports = router;
