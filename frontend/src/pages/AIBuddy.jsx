import React from 'react';

export default function AIBuddy() {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">AI Buddy</h2>
      <p className="mb-6">Ask questions and get instant AI-powered assistance.</p>
      <textarea
        rows={4}
        placeholder="Type your question here..."
        className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        disabled
      />
      <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition" disabled>
        Ask AI Buddy (Coming Soon)
      </button>
    </div>
  );
}
