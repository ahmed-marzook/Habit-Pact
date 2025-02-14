import "./Overview.css";

type Props = {};

export default function Overview({}: Props) {
  return (
    <div className="overview">
      <main className="overview__main">
        <div className="overview__header">
          <h1>Dashboard</h1>
          <div className="overview__date">February 13, 2025</div>
        </div>

        <div className="overview__quote">
          <div className="overview__quote-text">
            "We are what we repeatedly do. Excellence, then, is not an act, but
            a habit."
          </div>
          <div className="overview__quote-author">- Aristotle</div>
        </div>

        <div className="overview__grid">
          <div className="overview__card">
            <div className="overview__card-header">
              <div className="overview__card-title">Current Streaks</div>
            </div>
            <div className="overview__streak-grid">
              <div className="overview__streak-item">
                <div className="overview__streak-label">Meditation</div>
                <div className="overview__streak-number">12</div>
                <div className="overview__streak-label">days</div>
              </div>
              <div className="overview__streak-item">
                <div className="overview__streak-label">Reading</div>
                <div className="overview__streak-number">8</div>
                <div className="overview__streak-label">days</div>
              </div>
              <div className="overview__streak-item">
                <div className="overview__streak-label">Exercise</div>
                <div className="overview__streak-number">15</div>
                <div className="overview__streak-label">days</div>
              </div>
            </div>
          </div>
          <div className="overview__card">
            <div className="overview__card-header">
              <div className="overview__card-title">Today's Habits</div>
            </div>
            <ul className="overview__habit-list">
              <li className="overview__habit-item">
                <span>Morning Meditation</span>
                <span style={{ color: "var(--accent-primary)" }}>✓</span>
              </li>
              <li className="overview__habit-item">
                <span>Read 30 minutes</span>
                <span style={{ color: "var(--text-secondary)" }}>○</span>
              </li>
              <li className="overview__habit-item">
                <span>Exercise</span>
                <span style={{ color: "var(--accent-primary)" }}>✓</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
