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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shadow-md mb-4">
            <span className="text-3xl">📄</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">PDF Translator</h2>
          <p className="text-gray-600">Convert your documents to any language in seconds</p>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* File Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent font-semibold">
                Upload your PDF
              </span>
            </label>
            <div className="relative">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-3 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-gradient-to-r file:from-teal-100 file:to-cyan-100
                  file:text-cyan-700
                  hover:file:from-teal-200 hover:file:to-cyan-200
                  file:transition file:duration-200
                  file:cursor-pointer
                  border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          {/* Language Selector */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent font-semibold">
                Select Language
              </span>
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white appearance-none"
            >
              <option value="">-- Choose Language --</option>
              {languageOptions.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Translate Button */}
        <div className="text-center">
          <button
            onClick={handleTranslate}
            disabled={loading}
            className={`px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Translating...
              </span>
            ) : (
              'Translate PDF'
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Translation Result */}
        {translation && (
          <div className="mt-8 bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-lg border border-teal-100 shadow-inner">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-teal-100 mr-3">
                <svg className="h-5 w-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Translated Text</h3>
            </div>
            <div className="bg-white p-4 rounded-md border border-gray-200 max-h-96 overflow-y-auto whitespace-pre-wrap">
              <p className="text-gray-800">{translation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PdfTranslation;

