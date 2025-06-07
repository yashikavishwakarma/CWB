// backend/models/Pdf.js
const mongoose = require('mongoose');

const PdfSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fileName: String,
  content: String,
  translatedText: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pdf', PdfSchema);
