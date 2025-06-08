const { extractTextFromPdf } = require('../services/pdfExtractor');
const { translateText } = require('../services/azureTranslator');

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

    // Translate the extracted text
    const translatedText = await translateText(text, targetLanguage);

    // ✅ Do not save to DB, just return the response
    res.json({ translatedText });
  } catch (error) {
    next(error);
  }
}

module.exports = { translatePdf };
