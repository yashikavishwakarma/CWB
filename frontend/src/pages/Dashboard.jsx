// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [quizStats, setQuizStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuizStats() {
      try {
        setLoading(true);
        const response = await axios.get('/api/user/quiz-stats'); // backend API you create
        setQuizStats(response.data);
      } catch (err) {
        setError('Failed to load quiz stats');
      } finally {
        setLoading(false);
      }
    }
    fetchQuizStats();
  }, []);

  if (loading) return <p>Loading your quiz stats...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-2">Quizzes Taken: <strong>{quizStats.totalQuizzes}</strong></p>
      <p className="mb-2">Latest Quiz Score: <strong>{quizStats.latestScore}%</strong></p>
      <p className="mb-2">Average Score: <strong>{quizStats.averageScore}%</strong></p>
      {/* Add more stats or features later */}
    </div>
  );
}
