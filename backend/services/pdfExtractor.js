const pdf = require('pdf-parse');

async function extractTextFromPdf(pdfBuffer) {
  const data = await pdf(pdfBuffer);
  return data.text;
}

module.exports = { extractTextFromPdf };
