// backend/routes/pdfRoutes.js
const express = require('express');
const router = express.Router();
const Pdf = require('../models/TranslatedPdf');

router.post('/save', async (req, res) => {
  const { userId } = req.auth;
  const { fileName, content, translatedText } = req.body;

  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const newPdf = new Pdf({ userId, fileName, content, translatedText });

  await newPdf.save();

  res.json({ message: 'PDF saved successfully 🎉' });
});

router.get('/my-pdfs', async (req, res) => {
  const { userId } = req.auth;

  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const pdfs = await Pdf.find({ userId }).sort({ createdAt: -1 });

  res.json(pdfs);
});

module.exports = router;
