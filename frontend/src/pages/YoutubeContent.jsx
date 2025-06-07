import React from 'react';

export default function YoutubeContent() {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">YouTube Content Extraction</h2>
      <p className="mb-6">Paste a YouTube link to get simplified, translated content.</p>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        disabled
      />
      <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition" disabled>
        Extract Content (Coming Soon)
      </button>
    </div>
  );
}
