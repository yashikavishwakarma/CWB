import React, { useState } from 'react';

export default function TranslateYoutubeTranscript() {
  const [videoUrl, setVideoUrl] = useState('');
  const [language, setLanguage] = useState('id'); // default Indonesian
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Extract YouTube video ID from URL
  const getVideoId = (url) => {
    const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})(?:&|$)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleTranslate = async () => {
    setError('');
    const videoId = getVideoId(videoUrl);
    if (!videoId) {
      setError('Please enter a valid YouTube video URL.');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId, targetLanguage: language }),
      });
      const data = await response.json();
      if (data.translatedTextFull) {
        setTranslatedText(data.translatedTextFull);
      } else if (data.translatedTranscript) {
        // Fallback: Join all translatedText if detailed transcript returned
        const combined = data.translatedTranscript.map(t => t.translatedText).join(' ');
        setTranslatedText(combined);
      } else {
        setError('No translation available');
      }
    } catch (err) {
      setError('Error fetching translation');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Translate YouTube Video Transcript</h2>
      <input
        type="text"
        placeholder="Paste YouTube video URL"
        value={videoUrl}
        onChange={e => setVideoUrl(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />

      <select
        value={language}
        onChange={e => setLanguage(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      >
        <option value="id">Indonesian</option>
        <option value="ms">Malay</option>
        <option value="tl">Tagalog (Filipino)</option>
        <option value="vi">Vietnamese</option>
        <option value="th">Thai</option>
        <option value="my">Burmese</option>
        {/* Add more SEA languages as needed */}
      </select>

      <button onClick={handleTranslate} disabled={loading} style={{ padding: 10, width: '100%' }}>
        {loading ? 'Translating...' : 'Translate'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {translatedText && (
        <div style={{ whiteSpace: 'pre-wrap', marginTop: 20, backgroundColor: '#f0f0f0', padding: 15 }}>
          {translatedText}
        </div>
      )}
    </div>
  );
}
