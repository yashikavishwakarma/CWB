import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import HeroImage from '../images/undraw_drag-and-drop_v4po.svg';

const features = [
  { 
    title: 'PDF Translation', 
    path: '/pdf-translation',
    icon: '📄',
    description: 'Break language barriers with instant PDF translations',
    color: 'from-teal-400 to-cyan-500'
  },
  { 
    title: 'YouTube Simplifier', 
    path: '/youtube-content',
    icon: '🎬',
    description: 'Extract key insights from lengthy videos in seconds',
    color: 'from-amber-400 to-orange-500'
  },
  { 
    title: 'Quiz Generator', 
    path: '/quiz-generation',
    icon: '❓',
    description: 'Create personalized quizzes to test your knowledge',
    color: 'from-violet-400 to-purple-500'
  },
  { 
    title: 'AI Buddy', 
    path: '/ai-buddy',
    icon: '🤖',
    description: '24/7 learning companion for all your questions',
    color: 'from-rose-400 to-pink-500'
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 to-gray-100 antialiased">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Navbar */}
        <div className="relative z-20 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-600">
            
            </span> 
          </h1>
         
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900">
              TripleW <span className="">Learn</span>,<br/>
               <span className="text-cyan-500">Whenever, Wherever, Whatever</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Whenever curiosity strikes, wherever you go, whatever you dream — TripleW Learn is with you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <SignedIn>
                <Link 
                  to="/dashboard" 
                  className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 text-center"
                >
                  Go to Dashboard
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-8 py-4 bg-white text-gray-900 font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 border border-gray-200">
                    Start Learning Free
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
          <div className="relative w-full max-w-xl mb-16 lg:mb-0">
            <div className="relative">
              <img
                src={HeroImage}
                alt="Learning made easy"
                className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-2xl opacity-20 blur-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Supercharge Your Learning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools designed to accelerate your knowledge acquisition
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}></div>
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                
                <SignedIn>
                  <Link to={feature.path}>
                    <button className={`w-full py-3 px-6 bg-gradient-to-r ${feature.color} text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300`}>
                      Try Now
                    </button>
                  </Link>
                </SignedIn>
                
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="w-full py-3 px-6 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-all duration-300">
                      Sign In to Access
                    </button>
                  </SignInButton>
                </SignedOut>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Active Learners" },
              { number: "500K+", label: "Documents Processed" },
              { number: "1M+", label: "Quizzes Generated" },
              { number: "24/7", label: "AI Support" }
            ].map((stat, i) => (
              <div key={i} className="p-6">
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to transform your learning experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Upload Your Content",
                description: "Add your PDFs, video links, or study materials",
                icon: "📤"
              },
              {
                step: "2",
                title: "Let AI Work Its Magic",
                description: "Our algorithms process and organize your content",
                icon: "✨"
              },
              {
                step: "3",
                title: "Learn Efficiently",
                description: "Access simplified summaries, quizzes, and insights",
                icon: "🚀"
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{item.title}</div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Revolutionize Your Learning?</h2>
          <p className="text-xl text-cyan-100 mb-10">
            Join thousands of learners achieving more in less time
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <SignedIn>
              <Link 
                to="/dashboard" 
                className="px-8 py-4 bg-white text-cyan-600 font-bold rounded-full shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300"
              >
                Go to Dashboard
              </Link>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-8 py-4 bg-gray-900 text-white font-bold rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all duration-300">
                  Get Started for Free
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
                  TripleW Learn
                </span>
              </h3>
              <p className="text-gray-400">
                Empowering the next generation of learners with AI.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                {features.map((feature, i) => (
                  <li key={i}>
                    <Link to={feature.path} className="text-gray-400 hover:text-white transition-colors">
                      {feature.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} TripleW Learn. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {['Twitter', 'Facebook', 'LinkedIn', 'Instagram'].map((social, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">{social}</span>
                  <div className="h-6 w-6">{social.charAt(0)}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}