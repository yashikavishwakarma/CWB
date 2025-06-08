import React, { useState } from 'react';
import { translateYoutubeTranscript } from '../api/youtubeTranslate';

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

// Utility function to extract video ID from YouTube URL
function extractVideoId(url) {
  const regex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|watch)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function YoutubeTranslate() {
  const [videoUrl, setVideoUrl] = useState('');
  const [language, setLanguage] = useState('');
  const [translatedTranscript, setTranslatedTranscript] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    const videoId = extractVideoId(videoUrl);

    if (!videoId || !language) {
      setError('Please enter a valid YouTube video link and select a language.');
      return;
    }

    setLoading(true);
    setError('');
    setTranslatedTranscript([]);

    try {
      const data = await translateYoutubeTranscript(videoId, language);
      setTranslatedTranscript(data.translatedTranscript);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl border border-gray-200 mt-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          YouTube Transcript Translator
        </h2>
        <p className="text-lg text-gray-600">
          Break language barriers with instant video translations
        </p>
      </div>

      {/* Input Section */}
      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            YouTube Video Link
          </label>
          <input
            type="text"
            placeholder="Paste full YouTube link (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
          >
            <option value="">Select Language</option>
            {languageOptions.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleTranslate}
          disabled={loading}
          className={`w-full py-4 px-6 rounded-xl text-white font-bold shadow-lg transition-all duration-300 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 hover:shadow-xl'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
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
              <span>Translating...</span>
            </span>
          ) : (
            'Translate Transcript'
          )}
        </button>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">
            {error}
          </div>
        )}
      </div>

      {/* Results Section */}
      {translatedTranscript.length > 0 && (
        <div className="bg-white rounded-2xl shadow-inner border border-gray-200 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold">
            Translated Transcript
          </div>
          <div className="max-h-96 overflow-y-auto p-6 space-y-4">
            {translatedTranscript.map(({ start, text, translatedText }, i) => (
              <div
                key={i}
                className="pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="text-sm font-medium text-cyan-600 mb-1">
                  {new Date(start * 1000).toISOString().substr(11, 8)}
                </div>
                <p className="text-gray-800">{translatedText || text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="mt-6 text-sm text-gray-500">
        <p>
          Tip: You can paste any full YouTube URL. We will extract the video ID and get the transcript in Your Prefferd language.
        </p>
      </div>
    </div>
  );
}
