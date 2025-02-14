import "./LandingPage.css";
import habitPactlogo from "../../assets/habit-pact-logo.svg";

type Props = {};

export default function LandingPage({}: Props) {
  return (
    <div className="landing">
      <nav className="landing__navbar">
        <a href="#" className="landing__navbar-logo">
          HabitPact
        </a>
        <div className="landing__navbar-buttons">
          <a
            href="/login"
            className="landing__button landing__button--secondary"
          >
            Log In
          </a>
          <a
            href="/signup"
            className="landing__button landing__button--primary"
          >
            Sign Up
          </a>
        </div>
      </nav>

      <section className="landing__hero">
        <h1 className="landing__hero-title">
          Build Better Habits, Achieve Your Goals
        </h1>
        <p className="landing__hero-text">
          Track, analyze, and improve your daily habits with our intuitive habit
          tracking platform. Join thousands of others on their journey to
          self-improvement.
        </p>
        <a href="/signup" className="landing__button landing__button--primary">
          Get Started Free
        </a>
      </section>

      <section className="landing__features">
        <h2 className="landing__section-title">Why Choose HabitPact?</h2>
        <div className="landing__features-grid">
          <div className="landing__feature">
            <div className="landing__feature-icon">📊</div>
            <h3 className="landing__feature-title">Track Progress</h3>
            <p className="landing__feature-description">
              Monitor your habits with intuitive dashboards and detailed
              analytics.
            </p>
          </div>
          <div className="landing__feature">
            <div className="landing__feature-icon">🎯</div>
            <h3 className="landing__feature-title">Set Goals</h3>
            <p className="landing__feature-description">
              Create and achieve personal goals with our structured approach.
            </p>
          </div>
          <div className="landing__feature">
            <div className="landing__feature-icon">🤝</div>
            <h3 className="landing__feature-title">Stay Connected</h3>
            <p className="landing__feature-description">
              Connect with friends and maintain accountability together.
            </p>
          </div>
        </div>
      </section>

      <section className="landing__workflow">
        <h2 className="landing__section-title">How It Works</h2>
        <div className="landing__steps">
          <div className="landing__step">
            <div className="landing__step-number">1</div>
            <div className="landing__step-content">
              <h3 className="landing__step-title">Create Your Habits</h3>
              <p className="landing__step-description">
                Define the habits you want to build and set your goals.
              </p>
            </div>
          </div>
          <div className="landing__step">
            <div className="landing__step-number">2</div>
            <div className="landing__step-content">
              <h3 className="landing__step-title">Track Daily Progress</h3>
              <p className="landing__step-description">
                Check off completed habits and maintain your streak.
              </p>
            </div>
          </div>
          <div className="landing__step">
            <div className="landing__step-number">3</div>
            <div className="landing__step-content">
              <h3 className="landing__step-title">Analyze and Improve</h3>
              <p className="landing__step-description">
                View insights and adjust your approach for better results.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="landing__social">
        <h2 className="landing__section-title">Trusted by Thousands</h2>
        <div className="landing__stats">
          <div className="landing__stat">
            <div className="landing__stat-number">50K+</div>
            <div className="landing__stat-label">Active Users</div>
          </div>
          <div className="landing__stat">
            <div className="landing__stat-number">1M+</div>
            <div className="landing__stat-label">Habits Tracked</div>
          </div>
          <div className="landing__stat">
            <div className="landing__stat-number">85%</div>
            <div className="landing__stat-label">Success Rate</div>
          </div>
        </div>
      </section>

      <section className="landing__cta">
        <h2 className="landing__cta-title">Start Your Journey Today</h2>
        <p className="landing__cta-text">
          Join thousands of others who are already building better habits
        </p>
        <a href="/signup" className="landing__button landing__button--primary">
          Create Free Account
        </a>
      </section>

      <footer className="landing__footer">
        <div className="landing__footer-content">
          <div className="landing__footer-section">
            <h4 className="landing__footer-title">Company</h4>
            <ul className="landing__footer-links">
              <li className="landing__footer-item">
                <a href="#" className="landing__footer-link">
                  About Us
                </a>
              </li>
              <li className="landing__footer-item">
                <a href="#" className="landing__footer-link">
                  Careers
                </a>
              </li>
              <li className="landing__footer-item">
                <a href="#" className="landing__footer-link">
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div className="landing__footer-section">
            <h4 className="landing__footer-title">Product</h4>
            <ul className="landing__footer-links">
              <li className="landing__footer-item">
                <a href="#" className="landing__footer-link">
                  Features
                </a>
              </li>
              <li className="landing__footer-item">
                <a href="#" className="landing__footer-link">
                  Pricing
                </a>
              </li>
              <li className="landing__footer-item">
                <a href="#" className="landing__footer-link">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="landing__footer-section">
            <h4 className="landing__footer-title">Resources</h4>
            <ul className="landing__footer-links">
              <li className="landing__footer-item">
                <a href="#" className="landing__footer-link">
                  Blog
                </a>
              </li>
              <li className="landing__footer-item">
                <a href="#" className="landing__footer-link">
                  Guides
                </a>
              </li>
              <li className="landing__footer-item">
                <a href="#" className="landing__footer-link">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div className="landing__footer-section">
            <h4 className="landing__footer-title">Legal</h4>
            <ul className="landing__footer-links">
              <li className="landing__footer-item">
                <a href="#" className="landing__footer-link">
                  Privacy
                </a>
              </li>
              <li className="landing__footer-item">
                <a href="#" className="landing__footer-link">
                  Terms
                </a>
              </li>
              <li className="landing__footer-item">
                <a href="#" className="landing__footer-link">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
