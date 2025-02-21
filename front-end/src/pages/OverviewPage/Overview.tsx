import "./Overview.css";
import { useUser } from "../../hooks/useUserQuery";

type Props = {};

export default function Overview({}: Props) {
  const { data: user } = useUser();

  return (
    <div className="overview">
      <div className="overview__header">
        <h1>Welcome Back, {user?.firstName + " " + user?.lastName}</h1>
        <div className="overview__date">February 13, 2025</div>
      </div>

      <div className="overview__quote-card">
        <div className="overview__quote-text">
          "Goals are good for setting a direction, but systems are best for
          making progress."
        </div>
        <div className="overview__quote-author">
          - James Clear, Atomic Habits: An Easy & Proven Way to Build Good
          Habits & Break Bad Ones
        </div>
      </div>

      <div className="overview__grid">
        <div className="overview__card card">
          <div className="overview__card-header card-header">
            <div className="overview__card-title card-title">
              Current Streaks
            </div>
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
        <div className="overview__card card">
          <div className="overview__card-header card-header">
            <div className="overview__card-title card-title">
              Today's Habits
            </div>
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
    </div>
  );
}
