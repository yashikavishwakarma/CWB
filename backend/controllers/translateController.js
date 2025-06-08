const { fetchTranscript } = require('../services/youtubeTranscript');
const { translateText } = require('../services/azureTranslator');

async function translateVideoTranscript(req, res, next) {
  const { videoId, targetLanguage } = req.body;

  if (!videoId || !targetLanguage) {
    return res.status(400).json({ error: 'videoId and targetLanguage are required' });
  }

  try {
    const transcript = await fetchTranscript(videoId);

    if (!transcript || transcript.length === 0) {
      return res.status(404).json({ error: 'No transcript available for this video' });
    }

    // Translate each chunk's text concurrently
    const translatedTranscript = await Promise.all(
      transcript.map(async (chunk) => {
        const translatedText = await translateText(chunk.text, targetLanguage);
        return {
          ...chunk,
          translatedText,
        };
      })
    );

    res.json({ translatedTranscript });
  } catch (error) {
    console.error('Error in translateVideoTranscript:', error);
    next(error);
  }
}

module.exports = {
  translateVideoTranscript,
};
