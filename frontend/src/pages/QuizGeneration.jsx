import React from 'react';

export default function QuizGeneration() {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Generation</h2>
      <p className="mb-6">Generate quizzes to test your knowledge.</p>
      <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition" disabled>
        Generate Quiz (Coming Soon)
      </button>
    </div>
  );
}
