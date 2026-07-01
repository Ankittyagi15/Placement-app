import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎓</span>
          Placement Prep
        </Link>
        
        <ul className="nav-menu">
          <li className={`nav-item ${isActive('/')}`}>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className={`nav-item ${isActive('/mcqs')}`}>
            <Link to="/mcqs" className="nav-link">MCQs</Link>
          </li>
          <li className={`nav-item ${isActive('/coding')}`}>
            <Link to="/coding" className="nav-link">Coding</Link>
          </li>
          <li className={`nav-item ${isActive('/results')}`}>
            <Link to="/results" className="nav-link">Results</Link>
          </li>
          <li className={`nav-item ${isActive('/admin')}`}>
            <Link to="/admin" className="nav-link">Admin</Link>
          </li>
          <li className={`nav-item ${isActive('/about')}`}>
            <Link to="/about" className="nav-link">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
