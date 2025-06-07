const axios = require('axios');
const { translateText } = require('../services/azureTranslator');

const buddyChat = async (req, res) => {
  const { question, language } = req.body;

  if (!question || !language) {
    return res.status(400).json({ error: "Question and language are required" });
  }

  try {
    // Step 1: Translate question to English (or base language)
    const translatedQuestion = await translateText(question, "en");

    // Step 2: Send to Azure OpenAI chat API
    const response = await axios.post(
      `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`,
      {
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant."
          },
          {
            role: "user",
            content: translatedQuestion
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      },
      {
        headers: {
          "api-key": process.env.AZURE_OPENAI_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    const answerInEnglish = response.data.choices[0].message.content;

    // Step 3: Translate answer back to user's language
    const localizedAnswer = await translateText(answerInEnglish, language);

    // Step 4: Respond with localized answer
    res.json({ answer: localizedAnswer });

  } catch (error) {
    console.error("Error in buddyChat:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to process your question" });
  }
};

module.exports = { buddyChat };
