import React, { useState, useRef, useEffect } from "react";

const languageOptions = [
  { code: "hi", label: "Hindi" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
  { code: "ml", label: "Malayalam" },
  { code: "kn", label: "Kannada" },
  { code: "bn", label: "Bengali" },
  { code: "gu", label: "Gujarati" },
  { code: "mr", label: "Marathi" },
  { code: "ur", label: "Urdu" },
  { code: "pa", label: "Punjabi" },
  { code: "si", label: "Sinhala" },
  { code: "my", label: "Burmese" },
  { code: "th", label: "Thai" },
  { code: "lo", label: "Lao" },
  { code: "km", label: "Khmer (Cambodian)" },
  { code: "vi", label: "Vietnamese" },
  { code: "fil", label: "Filipino (Tagalog)" },
  { code: "ms", label: "Malay (Latin)" },
  { code: "jv", label: "Javanese" },
  { code: "su", label: "Sundanese" },
  { code: "id", label: "Indonesian" },
];

export default function AIBuddyChat() {
  const [messages, setMessages] = useState([
    {
      id: 0,
      sender: "bot",
      text: "Hi! I'm your AI learning buddy. Ask me anything in your preferred language and I'll help you learn!",
    },
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState(languageOptions[0].code);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length,
      sender: "user",
      text: input.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://cwb-ha2t.onrender.com/api/buddy-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.text, language }),
      });

      if (!res.ok) throw new Error("Failed to get AI response");

      const data = await res.json();

      // Add bot response
      const botMessage = {
        id: messages.length + 1,
        sender: "bot",
        text: data.answer,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        id: messages.length + 1,
        sender: "bot",
        text: "Oops! Something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Handle enter key to send message
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading) sendMessage();
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[600px] border border-gray-200 rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-5 font-bold text-xl text-center">
        <h3 className="font-extrabold">AI Learning Buddy</h3>
        <p className="text-sm font-normal opacity-90 mt-1">
          24/7 learning companion for all your questions
        </p>
      </div>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto p-6 space-y-4"
        style={{ scrollbarWidth: "thin" }}
      >
        {messages.map(({ id, sender, text }) => (
          <div
            key={id}
            className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-5 py-3 rounded-2xl whitespace-pre-wrap ${
                sender === "user"
                  ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-br-none shadow-md"
                  : "bg-white border border-gray-200 rounded-bl-none shadow-sm"
              }`}
            >
              {text}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-5 bg-white border-t border-gray-200 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-600">Language:</label>
          <select
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled={loading}
          >
            {languageOptions.map(({ code, label }) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <textarea
            rows={3}
            placeholder="Ask me anything about what you're learning..."
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className={`absolute right-3 bottom-3 px-5 py-1 rounded-full text-white font-medium ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-md"
            } transition-all duration-200`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
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
                <span>Thinking...</span>
              </span>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
