import React from 'react';
import Card from '../components/Card';

import { FaFilePdf, FaYoutube, FaRobot, FaClipboardList } from 'react-icons/fa';

export default function LandingPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center">Welcome to TripleW Learn</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card
          title="PDF Translation"
          description="Upload and translate PDFs to your local language easily."
          icon={<FaFilePdf />}
          link="/pdf-translation"
        />
        <Card
          title="YouTube Content Extraction"
          description="Paste YouTube links and get simplified, translated content."
          icon={<FaYoutube />}
          link="/youtube-content"
        />
        <Card
          title="AI Buddy"
          description="Ask questions and get instant AI-powered help."
          icon={<FaRobot />}
          link="/ai-buddy"
        />
        <Card
          title="Quiz Generation"
          description="Generate quizzes to test your knowledge."
          icon={<FaClipboardList />}
          link="/quiz-generation"
        />
      </div>
    </>
  );
}
