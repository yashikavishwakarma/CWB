import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

import Navbar from './components/Navbar';

import LandingPage from './pages/LandingPage';
import PdfTranslation from './pages/PdfTranslation';
import YoutubeContent from './pages/YoutubeContent';
import AIBuddy from './pages/AIBuddy';
import QuizGeneration from './pages/QuizGeneration';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <SignedIn>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pdf-translation" element={<PdfTranslation />} />
            <Route path="/youtube-content" element={<YoutubeContent />} />
            <Route path="/ai-buddy" element={<AIBuddy />} />
            <Route path="/quiz-generation" element={<QuizGeneration />} />
          </Routes>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </div>
    </Router>
  );
}

export default App;
