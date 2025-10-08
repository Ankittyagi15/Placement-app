import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center text-white max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ready to begin your path to success?
          </h1>
          <p className="text-lg md:text-xl mb-12 text-gray-100 leading-relaxed">
            Master your placement journey with curated resources, practice questions, and expert guidance
          </p>

          <Link
            to="/mcq"
            className="inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300 hover:from-indigo-700 hover:to-purple-700"
          >
            <span className="mr-3 text-2xl">🚀</span>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}


