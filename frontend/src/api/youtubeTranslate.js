

export async function translateYoutubeTranscript(videoId, targetLanguage) {
  const response = await fetch('https://cwb-ha2t.onrender.com/api/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ videoId, targetLanguage }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'YouTube translation failed');
  }

  return response.json(); 
}
