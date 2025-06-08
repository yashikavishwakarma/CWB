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
      text: "Hi! Ask me anything. Select language and start chatting.",
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
      const res = await fetch("http://localhost:3000/api/buddy-chat", {
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
    <div className="max-w-3xl mx-auto flex flex-col h-[600px] border rounded shadow-lg">
      <div className="bg-indigo-600 text-white p-4 font-bold text-center rounded-t">
        AI Buddy Chat
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
        style={{ scrollbarWidth: "thin" }}
      >
        {messages.map(({ id, sender, text }) => (
          <div
            key={id}
            className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-lg whitespace-pre-wrap ${
                sender === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-white border border-gray-300 rounded-bl-none"
              }`}
            >
              {text}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t flex flex-col gap-2">
        <select
          className="w-full max-w-xs px-3 py-2 border rounded"
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

        <textarea
          rows={3}
          placeholder="Type your message here..."
          className="w-full border rounded p-2 resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />

        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? (
            <span className="flex justify-center items-center space-x-2">
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
              <span>Thinking...</span>
            </span>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
}
