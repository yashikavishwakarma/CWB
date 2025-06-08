const mongoose = require('mongoose');

const translatedPdfSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fileName: String,
  translatedText: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TranslatedPdf', translatedPdfSchema);
