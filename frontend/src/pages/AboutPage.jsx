import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1>About Placement Prep Portal</h1>
          <p>Your Ultimate Gateway to Placement Success</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              At Placement Prep Portal, we're committed to helping students excel in their placements.
              We believe that with the right preparation and practice, every student can secure their
              dream job. Our platform provides comprehensive resources for technical interviews,
              including MCQs, coding challenges, and performance tracking.
            </p>
          </section>

          <section className="about-section">
            <h2>What We Offer</h2>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-number">1</span>
                <div className="feature-text">
                  <h3>Comprehensive MCQ Questions</h3>
                  <p>Over 100 MCQ questions covering essential topics for placements</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-number">2</span>
                <div className="feature-text">
                  <h3>Coding Challenges</h3>
                  <p>30+ curated coding problems across various difficulty levels and topics</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-number">3</span>
                <div className="feature-text">
                  <h3>Performance Analytics</h3>
                  <p>Detailed insights into your progress and category-wise performance</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-number">4</span>
                <div className="feature-text">
                  <h3>Expert Explanations</h3>
                  <p>Detailed explanations for each question to enhance understanding</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-number">5</span>
                <div className="feature-text">
                  <h3>Admin Panel</h3>
                  <p>Easy-to-use admin panel for content management</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-number">6</span>
                <div className="feature-text">
                  <h3>Free Access</h3>
                  <p>All resources available for free without any login required</p>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Technology Stack</h2>
            <div className="tech-stack">
              <div className="tech-category">
                <h3>Frontend</h3>
                <ul>
                  <li>React 19</li>
                  <li>Vite</li>
                  <li>React Router</li>
                  <li>Axios</li>
                </ul>
              </div>

              <div className="tech-category">
                <h3>Backend</h3>
                <ul>
                  <li>Java 21</li>
                  <li>Spring Boot 3</li>
                  <li>Spring Data JPA</li>
                  <li>H2 Database</li>
                </ul>
              </div>

              <div className="tech-category">
                <h3>Architecture</h3>
                <ul>
                  <li>REST APIs</li>
                  <li>Clean Architecture</li>
                  <li>Exception Handling</li>
                  <li>Responsive Design</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Key Features</h2>
            <ul className="features-bullets">
              <li>✓ Practice MCQs across 6 different categories</li>
              <li>✓ Access to 30+ coding problems on various topics</li>
              <li>✓ Instant feedback and score calculation</li>
              <li>✓ Detailed explanations for each answer</li>
              <li>✓ Track quiz attempts and progress</li>
              <li>✓ Category-wise performance analysis</li>
              <li>✓ Search and filter functionality</li>
              <li>✓ Admin panel for content management</li>
              <li>✓ No login required</li>
              <li>✓ Fully responsive design</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>Our Categories</h2>
            <div className="categories-grid">
              <div className="category-box">Operating System</div>
              <div className="category-box">Computer Networks</div>
              <div className="category-box">Java Programming</div>
              <div className="category-box">Database Management</div>
              <div className="category-box">Object-Oriented Programming</div>
              <div className="category-box">SQL Queries</div>
            </div>
          </section>

          <section className="about-section">
            <h2>Coding Topics Covered</h2>
            <div className="topics-grid">
              <div className="topic-box">Arrays</div>
              <div className="topic-box">Strings</div>
              <div className="topic-box">Linked Lists</div>
              <div className="topic-box">Stacks</div>
              <div className="topic-box">Queues</div>
              <div className="topic-box">Trees</div>
              <div className="topic-box">Graphs</div>
              <div className="topic-box">Sorting</div>
              <div className="topic-box">Searching</div>
              <div className="topic-box">Dynamic Programming</div>
              <div className="topic-box">Recursion</div>
              <div className="topic-box">Greedy Algorithms</div>
            </div>
          </section>

          <section className="about-section">
            <h2>How to Use</h2>
            <ol className="how-to-list">
              <li><strong>Browse MCQs:</strong> Visit the MCQs section and select a category</li>
              <li><strong>Practice:</strong> Answer questions and check your knowledge</li>
              <li><strong>Submit Quiz:</strong> Get instant results and detailed explanations</li>
              <li><strong>Track Progress:</strong> View all your attempts and performance</li>
              <li><strong>Explore Coding:</strong> Solve coding problems from various platforms</li>
              <li><strong>Manage Content:</strong> Use admin panel to add or edit questions</li>
            </ol>
          </section>

          <section className="about-section">
            <h2>Getting Started</h2>
            <p>
              Start your placement preparation journey today! Head over to the MCQs or Coding Challenges
              section to begin practicing. No registration needed. All features are completely free and
              accessible to everyone.
            </p>
            <div className="cta-buttons">
              <a href="/mcqs" className="btn btn-primary btn-lg">
                Start with MCQs
              </a>
              <a href="/coding" className="btn btn-secondary btn-lg">
                Try Coding Challenges
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
