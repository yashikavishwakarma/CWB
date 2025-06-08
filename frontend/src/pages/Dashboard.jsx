import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({
    quizStats: null,
    translationStats: null,
    videoStats: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
        try {
        setLoading(true);

        const dummyData = {
            quizStats: { total: 10, correct: 7 },
            translationStats: { translatedDocs: 4 },
            videoStats: { summaries: 3 }
        };

        await new Promise((res) => setTimeout(res, 500));

        setStats(dummyData);
        setError(null); 
        } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data');
        } finally {
        setLoading(false);
        }
    }

    fetchDashboardData();
    }, []);
  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-4xl mx-auto p-6 bg-red-50 text-red-600 rounded-xl">
      {error}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Learning Dashboard</h1>
      <p className="text-lg text-gray-600 mb-8">Track your progress and activities</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
          <div className="space-y-3">
            <Link 
              to="/quiz-generation" 
              className="block px-4 py-3 bg-gradient-to-r from-teal-100 to-cyan-100 hover:from-teal-200 hover:to-cyan-200 rounded-lg text-teal-800 font-medium transition-all"
            >
              Create New Quiz
            </Link>
            <Link 
              to="/pdf-translation" 
              className="block px-4 py-3 bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 rounded-lg text-amber-800 font-medium transition-all"
            >
              Translate Document
            </Link>
            <Link 
              to="/youtube-content" 
              className="block px-4 py-3 bg-gradient-to-r from-violet-100 to-purple-100 hover:from-violet-200 hover:to-purple-200 rounded-lg text-violet-800 font-medium transition-all"
            >
              Simplify Video
            </Link>
          </div>
        </div>

        {/* Quiz Stats */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Quiz Performance</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Quizzes Taken:</span>
              <span className="font-bold text-gray-900">{stats.quizStats?.totalQuizzes || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Latest Score:</span>
              <span className={`font-bold ${
                stats.quizStats?.latestScore >= 70 ? 'text-green-600' : 
                stats.quizStats?.latestScore >= 50 ? 'text-amber-500' : 'text-red-500'
              }`}>
                {stats.quizStats?.latestScore || 0}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Score:</span>
              <span className="font-bold text-cyan-600">{stats.quizStats?.averageScore || 0}%</span>
            </div>
            <div className="pt-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-teal-600" 
                  style={{ width: `${stats.quizStats?.averageScore || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Translation Stats */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Translation Activity</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Documents Translated:</span>
              <span className="font-bold text-gray-900">{stats.translationStats?.totalTranslations || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Languages Used:</span>
              <span className="font-bold text-amber-600">
                {stats.translationStats?.languagesUsed?.join(', ') || 'None yet'}
              </span>
            </div>
          </div>
        </div>

        {/* Video Stats */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Video Learning</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Videos Processed:</span>
              <span className="font-bold text-gray-900">{stats.videoStats?.totalVideos || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Last Video:</span>
              <span className="font-bold text-violet-600">
                {stats.videoStats?.lastVideoTitle || 'None yet'}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
          <div className="space-y-3">
            {stats.recentActivity?.length > 0 ? (
              stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className={`p-2 rounded-full mr-3 ${
                    activity.type === 'quiz' ? 'bg-cyan-100 text-cyan-600' :
                    activity.type === 'translation' ? 'bg-amber-100 text-amber-600' :
                    'bg-violet-100 text-violet-600'
                  }`}>
                    {activity.type === 'quiz' ? '❓' : 
                     activity.type === 'translation' ? '📄' : '🎬'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{activity.description}</p>
                    <p className="text-sm text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent activity</p>
            )}
          </div>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Learning Progress</h2>
        <div className="h-64">
          {/* Placeholder for chart - you would integrate a charting library here */}
          <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
            <p className="text-gray-500">Progress chart will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}