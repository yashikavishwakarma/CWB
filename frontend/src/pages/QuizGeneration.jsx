import React, { useState } from "react";

const languageOptions = [
  { code: 'hi', label: 'Hindi' },
  { code: 'ta', label: 'Tamil' },
  { code: 'te', label: 'Telugu' },
  { code: 'ml', label: 'Malayalam' },
  { code: 'kn', label: 'Kannada' },
  { code: 'bn', label: 'Bengali' },
  { code: 'gu', label: 'Gujarati' },
  { code: 'mr', label: 'Marathi' },
  { code: 'ur', label: 'Urdu' },
  { code: 'pa', label: 'Punjabi' },
  { code: 'si', label: 'Sinhala' },
  { code: 'my', label: 'Burmese' },
  { code: 'th', label: 'Thai' },
  { code: 'lo', label: 'Lao' },
  { code: 'km', label: 'Khmer (Cambodian)' },
  { code: 'vi', label: 'Vietnamese' },
  { code: 'fil', label: 'Filipino (Tagalog)' },
  { code: 'ms', label: 'Malay (Latin)' },
  { code: 'jv', label: 'Javanese' },
  { code: 'su', label: 'Sundanese' },
  { code: 'id', label: 'Indonesian' },
];

export default function QuizGeneration() {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState(languageOptions[0].code);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateQuiz = async () => {
    setLoading(true);
    setError(null);
    setQuiz(null);
    setScore(null);
    setAnswers({});

    try {
      const response = await fetch("http://localhost:3000/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, language }),
      });

      if (!response.ok) throw new Error("Failed to generate quiz");

      const data = await response.json();
      setQuiz(data.quiz);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (qIndex, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    if (!quiz) return;

    let correctCount = 0;
    quiz.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswerIndex) correctCount++;
    });

    setScore(correctCount);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Quiz Generation</h2>

      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Enter quiz topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        >
          {languageOptions.map(({ code, label }) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>

        <button
          onClick={handleGenerateQuiz}
          disabled={!topic || loading}
          className={`w-full py-3 rounded text-white flex justify-center items-center space-x-2 ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          <span>{loading ? "Generating Quiz..." : "Generate Quiz"}</span>
        </button>

        {error && <p className="text-red-600">{error}</p>}
      </div>

      {quiz && (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Quiz on "{topic}"</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitQuiz();
            }}
          >
            {quiz.map((q, qIndex) => (
              <div key={qIndex} className="mb-6">
                <p className="font-medium mb-2">
                  {qIndex + 1}. {q.question}
                </p>
                <div className="space-y-1">
                  {q.options.map((option, optIndex) => (
                    <label
                      key={optIndex}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={optIndex}
                        checked={answers[qIndex] === optIndex}
                        onChange={() => handleAnswerChange(qIndex, optIndex)}
                        required
                        className="form-radio"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit Quiz
            </button>
          </form>
        </div>
      )}

      {score !== null && quiz && (
        <div className="mt-6 p-4 bg-yellow-100 rounded text-center text-lg font-semibold">
          You scored {score} out of {quiz.length} correct!
        </div>
      )}
    </div>
  );
}
