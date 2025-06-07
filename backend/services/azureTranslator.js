const axios = require('axios');
require('dotenv').config();

const AZURE_KEY = process.env.AZURE_TRANSLATOR_KEY;
const AZURE_ENDPOINT = process.env.AZURE_TRANSLATOR_ENDPOINT;
const AZURE_REGION = process.env.AZURE_TRANSLATOR_REGION;

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
    if (err.response && err.response.data) {
  console.error('Azure API response error:', err.response.data);
  throw new Error('Azure Translator API error: ' + JSON.stringify(err.response.data));
} else {
  throw new Error('Azure Translator API error: ' + err.message);
}
  }
}

module.exports = { translateText };
