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

export default function YoutubeTranslate() {
  const [videoId, setVideoId] = useState('');
  const [language, setLanguage] = useState('');
  const [translatedTranscript, setTranslatedTranscript] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!videoId || !language) {
      setError('Please enter a YouTube video ID and select a language.');
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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">YouTube Transcript Translator</h2>
      
      <input
        type="text"
        placeholder="Enter YouTube Video ID"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 mb-4"
      />
      
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 mb-4"
      >
        <option value="">Select Language</option>
        {languageOptions.map((lang) => (
          <option key={lang.code} value={lang.code}>{lang.label}</option>
        ))}
      </select>
      
      <button
        onClick={handleTranslate}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Translating...' : 'Translate'}
      </button>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {translatedTranscript.length > 0 && (
        <div className="mt-6 max-h-96 overflow-y-auto border border-gray-300 rounded-md p-4 bg-gray-50">
          {translatedTranscript.map(({ start, text, translatedText }, i) => (
            <p key={i} className="mb-2">
              <strong>{new Date(start * 1000).toISOString().substr(11, 8)}:</strong> {translatedText || text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
