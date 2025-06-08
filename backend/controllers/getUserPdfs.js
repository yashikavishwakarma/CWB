const TranslatedPdf = require('../models/TranslatedPdf');

const getUserPdfs = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const pdfs = await TranslatedPdf.find({ userId }).sort({ createdAt: -1 });
    res.json({ pdfs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch PDFs" });
  }
};

module.exports = { getUserPdfs };