import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎓</span>
          PlacementPrep
        </Link>

        {/* Navigation */}
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

          <li className={`nav-item ${isActive('/about')}`}>
            <Link to="/about" className="nav-link">About</Link>
          </li>
        </ul>

        {/* CTA Button */}
        <Link to="/mcqs" className="nav-btn">
          Start Practice
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;
