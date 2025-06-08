import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import LandingPage from './pages/LandingPage';
import PdfTranslation from './pages/PdfTranslation';
import YoutubeContent from './pages/YoutubeContent';
import AIBuddy from './pages/AIBuddy';
import QuizGeneration from './pages/QuizGeneration';
import Dashboard from './pages/Dashboard';

import RequireAuth from './components/RequireAuth';  // import the new wrapper

function App() {
  return (
    <Router>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Public route */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Wrap protected routes inside RequireAuth */}
          <Route
            path="/pdf-translation"
            element={
              <RequireAuth>
                <PdfTranslation />
              </RequireAuth>
            }
          />
          <Route
            path="/youtube-content"
            element={
              <RequireAuth>
                <YoutubeContent />
              </RequireAuth>
            }
          />
          <Route
            path="/ai-buddy"
            element={
              <RequireAuth>
                <AIBuddy />
              </RequireAuth>
            }
          />
          <Route
            path="/quiz-generation"
            element={
              <RequireAuth>
                <QuizGeneration />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
