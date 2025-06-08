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
            content: "You are an AI assistant that creates educational multiple-choice quizzes. ALWAYS respond with JSON only, no extra text or explanation."
          },
          {
            role: "user",
            content: `Create 5 multiple-choice questions on the topic "${topic}". Each question should have 4 options and indicate the correct answer by returning a JSON array like this:

[
  {
    "question": "Question text here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctAnswerIndex": 0
  }
]

Return ONLY the JSON array, no extra text. The questions should be in ${language}.`
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

    const quizTextRaw = response.data.choices[0].message.content;

    const jsonMatch = quizTextRaw.match(/\[.*\]/s);

    if (!jsonMatch) {
      console.error("Failed to extract JSON from AI response:", quizTextRaw);
      return res.status(500).json({ error: "Failed to extract quiz JSON from AI response" });
    }

    const quizJsonStr = jsonMatch[0];

    let quizJson;
    try {
      quizJson = JSON.parse(quizJsonStr);
    } catch (parseErr) {
      console.error("Failed to parse extracted quiz JSON:", parseErr);
      return res.status(500).json({ error: "Failed to parse quiz JSON" });
    }

    res.json({ quiz: quizJson }); 

  } catch (error) {
    console.error("Error generating quiz:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
};

module.exports = { generateQuiz };
