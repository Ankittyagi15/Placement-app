import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Resources from './pages/Resources.jsx';
import Feedback from './pages/Feedback.jsx';
import Moderation from './pages/Moderation.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import PlacementDashboard from './pages/PlacementDashboard.jsx';
import { AuthProvider, useAuth } from './auth/AuthContext.jsx';
import Coding from './pages/Coding.jsx';
import Mcq from './pages/Mcq.jsx';

function NavBar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold">Placement Prep</Link>
        <div className="flex items-center gap-4 text-white/90">
          <Link to="/resources" className="hover:underline">Resources</Link>
          <Link to="/coding" className="hover:underline">Coding</Link>
          <Link to="/mcq" className="hover:underline">MCQ Bank</Link>
          {user && <Link to="/dashboard" className="hover:underline">AI Dashboard</Link>}
          <Link to="/feedback" className="hover:underline">Feedback</Link>
          <Link to="/about" className="hover:underline">About</Link>
          {user?.role === 'admin' && <Link to="/moderation" className="hover:underline">Moderation</Link>}
          {!user && (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/signup" className="hover:underline">Signup</Link>
            </>
          )}
          {user && (
            <button onClick={logout} className="text-sm bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t py-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} Placement Prep</footer>
  );
}

function ProtectedRoute({ children, admin }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (admin && user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 max-w-5xl mx-auto px-4 py-6 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/coding" element={<Coding />} />
            <Route path="/mcq" element={<Mcq />} />
            <Route path="/dashboard" element={<ProtectedRoute><PlacementDashboard /></ProtectedRoute>} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/moderation" element={<ProtectedRoute admin><Moderation /></ProtectedRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}


