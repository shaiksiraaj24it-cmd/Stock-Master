import { useEffect, useState } from "react";
import { api } from "../../services/api";

function LandingPage({ onOpenAuth, onNavigate, currentUser }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await api.courses.list();
        setCourses(res.courses || []);
      } catch {
        // Fallback static preview if server isn't connected
        setCourses([
          {
            id: 1,
            title: "Stock Market Fundamentals",
            description: "Master the basics of stock markets, how shares work, and key concepts.",
            category: "Basics",
            level: "Beginner",
            icon: "📚",
          },
          {
            id: 2,
            title: "Fundamental Analysis",
            description: "Learn how to analyze balance sheets, earnings, and financial ratios.",
            category: "Analysis",
            level: "Intermediate",
            icon: "🔎",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  return (
    <div className="landing-page">
      {/* HERO SECTION */}
      <section className="landing-hero">
        <div className="hero-badge">🚀 WELCOME TO STOCKMASTER LEARNING HUB</div>
        <h1>
          Master Stock Markets & Trading with <span>Interactive Courses</span>
        </h1>
        <p className="hero-subtitle">
          Admin-curated financial courses, hands-on stock market simulators, and real-time virtual trading.
          Register as a user to start learning or log in as an administrator to publish courses!
        </p>

        <div className="landing-cta-buttons">
          {currentUser ? (
            <button className="btn-primary" onClick={() => onNavigate(currentUser.role === "admin" ? "Admin" : "Learn")}>
              Go to {currentUser.role === "admin" ? "Admin Panel" : "My Courses"} →
            </button>
          ) : (
            <>
              <button className="btn-primary" onClick={() => onOpenAuth("register")}>
                Get Started / Register →
              </button>
              <button className="btn-secondary" onClick={() => onOpenAuth("login")}>
                User Login
              </button>
              <button className="btn-admin-pill" onClick={() => onOpenAuth("admin")}>
                🔑 Admin Login (admin / 123456)
              </button>
            </>
          )}
        </div>

        <div className="hero-stats">
          <div className="stat-box">
            <h3>₹1,00,000</h3>
            <p>Virtual Cash per User</p>
          </div>
          <div className="stat-box">
            <h3>{courses.length}+</h3>
            <p>Admin Curated Courses</p>
          </div>
          <div className="stat-box">
            <h3>100% Risk Free</h3>
            <p>Real-time Virtual Trading</p>
          </div>
        </div>
      </section>

      {/* PLATFORM HIGHLIGHTS */}
      <section className="landing-features">
        <div className="section-header center">
          <span className="pill-tag">WHAT YOU GET</span>
          <h2>Designed for Learners and Educators</h2>
          <p>Everything you need to build stock market literacy from scratch.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card highlight">
            <div className="feature-icon">👑</div>
            <h3>Admin Portal</h3>
            <p>
              Administrators can add, update, and manage structured courses, upload custom contents, and configure video lessons for students.
            </p>
            <div className="feature-badge">Username: admin | Pass: 123456</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Structured Course Content</h3>
            <p>
              Users register, log in, and access comprehensive modules created by admins covering Stock Fundamentals, Financial Ratios, and Technical Analysis.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Virtual Stock Simulator</h3>
            <p>
              Test learning theories in practice! Practice buying and selling shares using a starting virtual balance of ₹1,00,000 with real market metrics.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Quiz & Progress Tracking</h3>
            <p>
              Evaluate your comprehension with module quizzes, lesson completion tracking, and personalized performance stats.
            </p>
          </div>
        </div>
      </section>

      {/* ADMIN-CURATED COURSES SHOWCASE */}
      <section className="landing-courses-section">
        <div className="section-header">
          <div>
            <span className="pill-tag">FEATURED COURSES</span>
            <h2>Explore Admin-Added Courses</h2>
            <p>Select a course below to view details and start learning.</p>
          </div>
          <button className="btn-outline" onClick={() => onNavigate("Learn")}>
            View All Courses →
          </button>
        </div>

        {loading ? (
          <div className="loading-state">Loading courses...</div>
        ) : (
          <div className="course-cards-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-card-header">
                  <span className="course-icon">{course.icon || "📚"}</span>
                  <span className="course-level">{course.level || "Beginner"}</span>
                </div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-card-footer">
                  <span className="course-lessons-count">
                    {course.lessons ? `${course.lessons.length} Lessons` : "Admin Managed"}
                  </span>
                  <button
                    className="btn-text-action"
                    onClick={() => {
                      if (!currentUser) {
                        onOpenAuth("register");
                      } else {
                        onNavigate("Learn");
                      }
                    }}
                  >
                    Start Learning →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section className="landing-steps-section">
        <div className="section-header center">
          <span className="pill-tag">HOW IT WORKS</span>
          <h2>4 Simple Steps to Master Investing</h2>
        </div>

        <div className="steps-container">
          <div className="step-item">
            <div className="step-number">01</div>
            <h4>Register Account</h4>
            <p>Sign up in seconds to receive your credentials and virtual cash balance of ₹1,00,000.</p>
          </div>
          <div className="step-item">
            <div className="step-number">02</div>
            <h4>Enroll in Courses</h4>
            <p>Access structured contents published by the admin and watch selected video tutorials.</p>
          </div>
          <div className="step-item">
            <div className="step-number">03</div>
            <h4>Practice Trading</h4>
            <p>Execute buy/sell trades in the virtual stock market simulator with live pricing feedback.</p>
          </div>
          <div className="step-item">
            <div className="step-number">04</div>
            <h4>Track Growth</h4>
            <p>Monitor your virtual portfolio returns, attempt quizzes, and earn course completion status.</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="landing-cta-banner">
        <h2>Ready to Start Your Stock Market Journey?</h2>
        <p>Register today as a learner or log in as admin using credentials (admin / 123456).</p>
        <div className="cta-banner-buttons">
          <button className="btn-primary-light" onClick={() => onOpenAuth("register")}>
            Register Free Account
          </button>
          <button className="btn-outline-light" onClick={() => onOpenAuth("admin")}>
            Admin Login
          </button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
