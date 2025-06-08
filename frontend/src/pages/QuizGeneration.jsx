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
      const response = await fetch("https://cwb-ha2t.onrender.com/api/generate-quiz", {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">Quiz Generator</h2>
          <p className="text-teal-100 mt-2">Create custom quizzes on any topic</p>
        </div>

        {/* Main Content */}
        <div className="p-6 sm:p-8">
          {/* Input Section */}
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent font-semibold">
                  Quiz Topic
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g. World History, Biology, JavaScript"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent font-semibold">
                  Language
                </span>
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white"
              >
                {languageOptions.map(({ code, label }) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGenerateQuiz}
              disabled={!topic || loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium shadow-md transition-all duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 hover:shadow-lg"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating Quiz...
                </span>
              ) : (
                "Generate Quiz"
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quiz Section */}
          {quiz && (
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Quiz on <span className="text-cyan-600">"{topic}"</span>
              </h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitQuiz();
                }}
                className="space-y-8"
              >
                {quiz.map((q, qIndex) => (
                  <div
                    key={qIndex}
                    className="p-6 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <p className="font-medium text-lg text-gray-800 mb-4">
                      <span className="inline-block w-8 h-8 bg-cyan-100 text-cyan-800 rounded-full text-center leading-8 mr-3">
                        {qIndex + 1}
                      </span>
                      {q.question}
                    </p>
                    <div className="space-y-3 ml-11">
                      {q.options.map((option, optIndex) => (
                        <label
                          key={optIndex}
                          className="flex items-start space-x-3 cursor-pointer group"
                        >
                          <div className="flex items-center h-5 mt-1">
                            <input
                              type="radio"
                              name={`question-${qIndex}`}
                              value={optIndex}
                              checked={answers[qIndex] === optIndex}
                              onChange={() => handleAnswerChange(qIndex, optIndex)}
                              required
                              className="h-4 w-4 text-cyan-600 border-gray-300 focus:ring-cyan-500 group-hover:border-cyan-400"
                            />
                          </div>
                          <span className="text-gray-700 group-hover:text-gray-900">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium rounded-lg shadow-md hover:from-green-600 hover:to-teal-700 hover:shadow-lg transition-all duration-300"
                >
                  Submit Quiz
                </button>
              </form>
            </div>
          )}

          {/* Results Section */}
          {score !== null && quiz && (
            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg border border-amber-200 text-center">
              <h3 className="text-2xl font-bold text-amber-800 mb-2">
                {score === quiz.length ? "Perfect Score! 🎉" : "Quiz Results"}
              </h3>
              <p className="text-lg font-medium text-gray-800">
                You scored{" "}
                <span className="text-2xl font-bold text-amber-600">
                  {score}
                </span>{" "}
                out of{" "}
                <span className="font-bold text-gray-700">{quiz.length}</span>{" "}
                correct!
              </p>
              <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-teal-500"
                  style={{ width: `${(score / quiz.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
