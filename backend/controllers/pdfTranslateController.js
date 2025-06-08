const { extractTextFromPdf } = require('../services/pdfExtractor');
const { translateText } = require('../services/azureTranslator');
const TranslatedPdf = require('../models/TranslatedPdf');

async function translatePdf(req, res, next) {
  const { targetLanguage } = req.body;
  const pdfBuffer = req.file?.buffer;

  if (!pdfBuffer) {
    return res.status(400).json({ error: 'PDF file is required' });
  }
  if (!targetLanguage) {
    return res.status(400).json({ error: 'targetLanguage is required' });
  }

  try {
    // Extract text from uploaded PDF buffer
    const text = await extractTextFromPdf(pdfBuffer);

    // Optionally: if text is very long, consider splitting into chunks to translate in batches
    // Here we translate all at once for simplicity

    const translatedText = await translateText(text, targetLanguage);

    res.json({ translatedText });
  } catch (error) {
    next(error);
  }
}

await TranslatedPdf.create({
  userId: req.auth.userId,
  fileName: req.file.originalname,
  translatedText
});

module.exports = { translatePdf };
