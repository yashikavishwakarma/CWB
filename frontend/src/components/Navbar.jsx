import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 transition-all duration-300"
          >
            TripleW Learn
          </Link>

          <div className="flex items-center space-x-6">
            <SignedIn>
              <Link 
                to="/dashboard" 
                className="text-gray-600 hover:text-teal-600 font-medium transition-colors duration-200 relative group"
              >
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              <div className="ml-4 flex items-center">
                <div className="relative h-9 w-9 rounded-full bg-gradient-to-r from-teal-100 to-cyan-100 flex items-center justify-center">
                  <UserButton 
                    afterSignOutUrl="/" 
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "h-8 w-8",
                        userButtonPopoverCard: "shadow-lg rounded-xl border border-gray-200"
                      }
                    }}
                  />
                </div>
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="relative px-5 py-1.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium rounded-full shadow-md hover:shadow-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 overflow-hidden group">
                  <span className="relative z-10">Get Started</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}