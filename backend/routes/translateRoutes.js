const express = require('express');
const router = express.Router();

const { translateVideoTranscript } = require('../controllers/translateController');
const { translatePdf } = require('../controllers/pdfTranslateController');
const { generateQuiz } = require('../controllers/quizController');
const { buddyChat } = require('../controllers/buddyChatController');
const { getUserPdfs } = require('../controllers/pdfTranslateController');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/translate', translateVideoTranscript);
router.post('/translate-pdf', upload.single('pdfFile'), translatePdf);
router.post('/generate-quiz', generateQuiz);
router.post('/buddy-chat', buddyChat);

module.exports = router;
