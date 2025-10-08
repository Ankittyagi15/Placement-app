import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-24 px-4 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 right-4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="animate-fadeInUp">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-8 backdrop-blur-sm">
              <span className="text-4xl">🚀</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg">
                Placement Prep
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-100 leading-relaxed max-w-3xl mx-auto">
              Your ultimate destination for mastering placement interviews with AI-powered insights, curated resources, and personalized practice sessions
            </p>
          </div>

          {!user ? (
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              <Link
                to="/login"
                className="group relative px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center">
                  <span className="mr-2">🔑</span>
                  Login to Start Journey
                </span>
              </Link>
              <Link
                to="/signup"
                className="group relative px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-indigo-600 transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center justify-center">
                  <span className="mr-2">✨</span>
                  Join for Free
                </span>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              <Link
                to="/dashboard"
                className="group relative px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center justify-center">
                  <span className="mr-2">📊</span>
                  View Dashboard
                </span>
              </Link>
              <Link
                to="/coding"
                className="group relative px-8 py-4 bg-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center justify-center">
                  <span className="mr-2">💻</span>
                  Start Coding
                </span>
              </Link>
            </div>
          )}
        </div>
        
        {/* Floating elements for visual appeal */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-400 opacity-20 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-400 opacity-15 rounded-full animate-pulse-slow"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Everything You Need for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Placement Success
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive platform designed to accelerate your journey from preparation to placement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Cards */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Coding Practice</h3>
                <p className="text-gray-600 leading-relaxed">Master LeetCode & GFG problems with detailed solutions and step-by-step explanations</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">MCQ Bank</h3>
                <p className="text-gray-600 leading-relaxed">Comprehensive collection of Quantitative, Verbal, Logical & Technical questions</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Study Resources</h3>
                <p className="text-gray-600 leading-relaxed">Curated materials for aptitude, interview preparation, and company-specific guides</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-amber-100">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">AI Dashboard</h3>
                <p className="text-gray-600 leading-relaxed">Personalized insights and recommendations powered by machine learning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Trusted by <span className="text-indigo-600">Thousands</span> of Students
            </h2>
            <p className="text-lg text-gray-600">Join our growing community of successful placement aspirants</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
                <div className="text-gray-700 font-medium">Practice Questions</div>
                <p className="text-sm text-gray-500 mt-2">Curated MCQs across all topics</p>
              </div>
            </div>

            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div className="text-4xl font-bold text-emerald-600 mb-2">100+</div>
                <div className="text-gray-700 font-medium">Coding Problems</div>
                <p className="text-sm text-gray-500 mt-2">LeetCode & GFG style questions</p>
              </div>
            </div>

            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-4xl font-bold text-pink-600 mb-2">2000+</div>
                <div className="text-gray-700 font-medium">Students Helped</div>
                <p className="text-sm text-gray-500 mt-2">Success stories and counting</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-white opacity-5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-yellow-400 opacity-10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-8 backdrop-blur-sm">
            <span className="text-4xl">🚀</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to <span className="text-yellow-300">Ace</span> Your Placement?
          </h2>

          <p className="text-xl md:text-2xl mb-12 text-gray-100 leading-relaxed max-w-3xl mx-auto">
            Join thousands of students who have successfully cracked their dream companies with our comprehensive preparation platform
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="group relative px-10 py-5 bg-white text-indigo-600 font-bold rounded-2xl shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300 overflow-hidden text-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center">
                    <span className="mr-3">🔑</span>
                    Login to Start Journey
                  </span>
                </Link>

                <Link
                  to="/signup"
                  className="group relative px-10 py-5 border-3 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-indigo-600 transform hover:scale-105 transition-all duration-300 text-lg backdrop-blur-sm"
                >
                  <span className="flex items-center justify-center">
                    <span className="mr-3">✨</span>
                    Join for Free
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="group relative px-10 py-5 bg-white text-indigo-600 font-bold rounded-2xl shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300 text-lg"
                >
                  <span className="flex items-center justify-center">
                    <span className="mr-3">📊</span>
                    View Your Dashboard
                  </span>
                </Link>

                <Link
                  to="/resources"
                  className="group relative px-10 py-5 bg-indigo-500 text-white font-bold rounded-2xl shadow-2xl hover:bg-indigo-400 transform hover:scale-105 transition-all duration-300 text-lg"
                >
                  <span className="flex items-center justify-center">
                    <span className="mr-3">📚</span>
                    Explore Resources
                  </span>
                </Link>
              </>
            )}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-200 text-sm">
              🎓 Trusted by 2000+ students • 🚀 AI-Powered Insights • 💯 Free to Use
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}


