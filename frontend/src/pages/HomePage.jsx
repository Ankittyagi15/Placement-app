import { Link } from "react-router-dom";
import "./HomePage.css";

const features = [
  {
    icon: "💻",
    title: "Coding Practice",
    desc: "Solve interview coding questions from Arrays, Strings, Trees, Graphs, DP and many more.",
  },
  {
    icon: "📝",
    title: "MCQ Practice",
    desc: "Practice hundreds of MCQs from Java, DBMS, OS, SQL, CN and OOPs.",
  },
  {
    icon: "📈",
    title: "Track Progress",
    desc: "Know your strengths and weaknesses with detailed performance analysis.",
  },
  {
    icon: "🎯",
    title: "Placement Focused",
    desc: "Questions collected from Cognizant, TCS, Infosys, Wipro, Capgemini and more.",
  },
  {
    icon: "⚡",
    title: "Instant Results",
    desc: "Get your score instantly with explanations after submitting the quiz.",
  },
  {
    icon: "🏆",
    title: "Interview Ready",
    desc: "Improve speed, confidence and problem-solving for technical interviews.",
  },
];

const stats = [
  { number: "100+", text: "MCQs" },
  { number: "30+", text: "Coding Problems" },
  { number: "6", text: "Subjects" },
  { number: "1000+", text: "Students Ready" },
];

const HomePage = () => {
  return (
    <div className="home">

      {/* HERO */}

      <section className="hero">

        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>

        <div className="container hero-container">

          <div className="hero-left">

            <span className="badge">
              🚀 India's Smart Placement Preparation Platform
            </span>

            <h1>
              Crack Your
              <span> Dream Placement </span>
              With Confidence.
            </h1>

            <p>
              Practice company-level MCQs, coding questions,
              interview preparation and improve your placement
              performance with one powerful platform.
            </p>

            <div className="hero-buttons">

              <Link
                to="/mcqs"
                className="btn hero-btn"
              >
                Start Practicing →
              </Link>

              <Link
                to="/coding"
                className="btn hero-outline"
              >
                Coding Questions
              </Link>

            </div>

            <div className="hero-stats">

              <div>
                <h2>100+</h2>
                <p>Questions</p>
              </div>

              <div>
                <h2>30+</h2>
                <p>Coding</p>
              </div>

              <div>
                <h2>95%</h2>
                <p>Success</p>
              </div>

            </div>

          </div>

          <div className="hero-right">

            <div className="circle big"></div>
            <div className="circle small"></div>

            <div className="floating-card card1">
              💻 Coding
            </div>

            <div className="floating-card card2">
              📝 MCQ
            </div>

            <div className="floating-card card3">
              🎯 Interview
            </div>

            <div className="main-icon">
              🎓
            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="features">

        <div className="container">

          <h2 className="section-title">
            Why Students Love This Platform
          </h2>

          <p className="section-subtitle">
            Everything required to prepare for placements
            in one place.
          </p>

          <div className="feature-grid">

            {features.map((item, index) => (

              <div
                className="feature-card"
                key={index}
              >

                <div className="feature-icon">
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <p>{item.desc}</p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* STATISTICS */}

      <section className="statistics">

        <div className="container">

          <h2 className="section-title white">
            Platform Statistics
          </h2>

          <div className="stats-grid">

            {stats.map((item, index) => (

              <div
                className="stat-card"
                key={index}
              >

                <h1>{item.number}</h1>

                <p>{item.text}</p>

              </div>

            ))}

          </div>

        </div>

      </section>
            {/* TESTIMONIALS */}

      <section className="testimonials">

        <div className="container">

          <h2 className="section-title">
            What Students Say
          </h2>

          <div className="testimonial-grid">

            <div className="testimonial-card">

              <p>
                "This platform helped me practice Java and SQL before my
                placement drive. The interface is simple and the questions
                are really useful."
              </p>

              <h4>⭐⭐⭐⭐⭐</h4>

              <span>Computer Science Student</span>

            </div>

            <div className="testimonial-card">

              <p>
                "The coding section improved my confidence for interviews.
                Highly recommended for placement preparation."
              </p>

              <h4>⭐⭐⭐⭐⭐</h4>

              <span>Final Year Student</span>

            </div>

            <div className="testimonial-card">

              <p>
                "MCQs with instant results helped me identify weak topics.
                The UI is clean and easy to use."
              </p>

              <h4>⭐⭐⭐⭐⭐</h4>

              <span>Placement Aspirant</span>

            </div>

          </div>

        </div>

      </section>

      {/* CALL TO ACTION */}

      <section className="cta">

        <div className="container">

          <h2>
            Ready To Start Your Placement Journey?
          </h2>

          <p>
            Practice today and increase your chances of getting placed in
            your dream company.
          </p>

          <Link
            to="/mcqs"
            className="btn cta-btn"
          >
            Start Practicing
          </Link>

        </div>

      </section>

      {/* FOOTER INFO */}

      <section className="footer-info">

        <div className="container footer-grid">

          <div>

            <h3>Placement Prep Portal</h3>

            <p>
              A modern placement preparation platform for students to
              practice MCQs, coding questions and interview preparation.
            </p>

          </div>

          <div>

            <h3>Subjects</h3>

            <ul>

              <li>Java</li>

              <li>DBMS</li>

              <li>Operating System</li>

              <li>Computer Networks</li>

              <li>SQL</li>

              <li>OOPs</li>

            </ul>

          </div>

          <div>

            <h3>Quick Links</h3>

            <ul>

              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/mcqs">MCQs</Link>
              </li>

              <li>
                <Link to="/coding">Coding</Link>
              </li>

              <li>
                <Link to="/about">About</Link>
              </li>

            </ul>

          </div>

        </div>

      </section>

    </div>
  );
};

export default HomePage;
