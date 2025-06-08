// src/pages/PdfTranslation.jsx

import React, { useState } from 'react';
import { translatePdf } from '../api/pdfTranslate';

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

function PdfTranslation() {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState('');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setTranslation('');
    setError('');
  };

  const handleTranslate = async () => {
    if (!file || !language) {
      setError('Please upload a PDF and select a language.');
      return;
    }

    setLoading(true);
    setError('');
    setTranslation('');

    try {
      const data = await translatePdf(file, language);
      setTranslation(data.translatedText || 'No translation returned.');
    } catch (err) {
      setError(err.message || 'Translation failed.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📄 PDF Translator</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload your PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">-- Choose Language --</option>
            {languageOptions.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleTranslate}
        disabled={loading}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Translating...' : 'Translate PDF'}
      </button>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {translation && (
        <div className="mt-8 bg-gray-100 p-6 rounded-lg max-h-[400px] overflow-y-auto whitespace-pre-wrap">
          <h3 className="text-lg font-semibold mb-2">📝 Translated Text:</h3>
          <p className="text-gray-800">{translation}</p>
        </div>
      )}
    </div>
  );
}

export default PdfTranslation;
