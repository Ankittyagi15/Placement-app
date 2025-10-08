import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Resources from './pages/Resources.jsx';
import Feedback from './pages/Feedback.jsx';
import Moderation from './pages/Moderation.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import PlacementDashboard from './pages/PlacementDashboard.jsx';
import { AuthProvider } from './auth/AuthContext.jsx';
import Coding from './pages/Coding.jsx';
import Mcq from './pages/Mcq.jsx';
import Sidebar from './components/Sidebar.jsx';

function Footer() {
  return (
    <footer className="mt-10 border-t py-6 text-center text-sm text-gray-500 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        © {new Date().getFullYear()} Placement Prep. Built with ❤️ for students.
      </div>
    </footer>
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
      <div className="min-h-screen flex bg-gray-50">
        <Sidebar />
        <div className="flex-1 lg:ml-64">
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
              <Route path="/coding" element={<ProtectedRoute><Coding /></ProtectedRoute>} />
              <Route path="/mcq" element={<Mcq />} />
              <Route path="/dashboard" element={<ProtectedRoute><PlacementDashboard /></ProtectedRoute>} />
              <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
              <Route path="/moderation" element={<ProtectedRoute admin><Moderation /></ProtectedRoute>} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </AuthProvider>
  );
}


