

export async function translateYoutubeTranscript(videoId, targetLanguage) {
  const response = await fetch('http://localhost:3000/api/translate', {
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
