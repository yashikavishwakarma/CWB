const { YoutubeTranscript } = require('youtube-transcript');

async function fetchTranscript(videoId) {
  return await YoutubeTranscript.fetchTranscript(videoId);
}

module.exports = { fetchTranscript };
