import React from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="bg-indigo-600 text-white flex justify-between items-center px-6 py-4 shadow-md">
      <Link to="/" className="text-2xl font-bold hover:text-indigo-300">TripleW Learn</Link>
      <div className="flex items-center space-x-4">
        {isSignedIn && user && (
          <span className="hidden sm:inline">Hi, {user.firstName || user.fullName}</span>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}
