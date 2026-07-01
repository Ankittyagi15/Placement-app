import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Master Placements with Placement Prep Portal</h1>
            <p>Practice MCQs, solve coding challenges, and track your progress</p>
            <div className="hero-buttons">
              <Link to="/mcqs" className="btn btn-primary btn-lg">
                Start Practicing
              </Link>
              <Link to="/about" className="btn btn-secondary btn-lg">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-icon">🎯</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Comprehensive MCQs</h3>
              <p>Hundreds of MCQ questions covering all important topics like Operating Systems, Databases, Java, and more.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💻</div>
              <h3>Coding Challenges</h3>
              <p>Practice 30+ coding problems on arrays, strings, trees, graphs, and dynamic programming.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Progress</h3>
              <p>Monitor your performance with detailed analytics and category-wise performance tracking.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Interview Ready</h3>
              <p>Get prepared for technical interviews with curated questions from top companies.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Results</h3>
              <p>Get instant feedback on your quiz attempts with detailed explanations for each answer.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Easy Management</h3>
              <p>Admin panel to easily add, edit, and manage MCQs and coding questions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics">
        <div className="container">
          <h2>Our Statistics</h2>
          <div className="stats-container">
            <div className="stat-box">
              <div className="stat-number">100+</div>
              <div className="stat-text">MCQ Questions</div>
            </div>

            <div className="stat-box">
              <div className="stat-number">30+</div>
              <div className="stat-text">Coding Problems</div>
            </div>

            <div className="stat-box">
              <div className="stat-number">6</div>
              <div className="stat-text">MCQ Categories</div>
            </div>

            <div className="stat-box">
              <div className="stat-number">16</div>
              <div className="stat-text">Coding Topics</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Ace Your Placements?</h2>
          <p>Start practicing today and build confidence for your interviews</p>
          <Link to="/mcqs" className="btn btn-primary btn-lg">
            Begin Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
