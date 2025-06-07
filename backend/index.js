require('dotenv').config();
const express = require('express');
const { YoutubeTranscript } = require('youtube-transcript');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const AZURE_KEY = process.env.AZURE_TRANSLATOR_KEY;
const AZURE_ENDPOINT = process.env.AZURE_TRANSLATOR_ENDPOINT;
const AZURE_REGION = process.env.AZURE_TRANSLATOR_REGION;

if (!AZURE_KEY || !AZURE_ENDPOINT || !AZURE_REGION) {
  console.error('Missing Azure Translator environment variables');
  process.exit(1);
}

async function translateText(text, toLang) {
  try {
    const response = await axios.post(
      `${AZURE_ENDPOINT}/translate?api-version=3.0&to=${toLang}`,
      [{ Text: text }],
      {
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_KEY,
          'Ocp-Apim-Subscription-Region': AZURE_REGION,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data[0].translations[0].text;
  } catch (err) {
    console.error('Azure translate error:', err.response?.data || err.message);
    throw err;
  }
}

app.post('/translate', async (req, res) => {
  const { videoId, targetLanguage } = req.body;

  if (!videoId || !targetLanguage) {
    return res.status(400).json({ error: 'videoId and targetLanguage are required' });
  }

  try {
    console.log('Fetching transcript for video:', videoId);
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    console.log('Transcript length:', transcript.length);

    if (!transcript || transcript.length === 0) {
      return res.status(404).json({ error: 'No transcript available for this video' });
    }

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
    console.error('Error in /translate:', error.message || error);
    res.status(500).json({ error: 'Failed to fetch or translate transcript' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
