const axios = require("axios");

const generateQuiz = async (req, res) => {
  const { topic, language } = req.body;

  if (!topic || !language) {
    return res.status(400).json({ error: "Both topic and language are required" });
  }

  try {
    const response = await axios.post(
      `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`,
      {
        messages: [
          {
            role: "system",
            content: "You are an AI assistant that creates educational multiple-choice quizzes."
          },
          {
            role: "user",
            content: `Create 5 multiple-choice questions on the topic "${topic}". Each question should have 4 options and indicate the correct answer. The questions should be written in ${language}. Return the quiz in a clearly formatted readable manner.`
          }
        ],
        max_tokens: 800,
        temperature: 0.7
      },
      {
        headers: {
          "api-key": process.env.AZURE_OPENAI_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    const quizText = response.data.choices[0].message.content;
    res.json({ quiz: quizText });
  } catch (error) {
    console.error("Error generating quiz:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
};

module.exports = { generateQuiz };
