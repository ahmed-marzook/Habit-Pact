import "./MainSideBar.css";
import habitPactLogo from "../../../../assets/habit-pact-logo.svg";
import { useAuth } from "../../../../contexts/AuthContext/AuthContext";
import { NavLink } from "react-router-dom";

type Props = {};

export default function MainSideBar({}: Props) {
  const { logout } = useAuth();
  return (
    <div className="main-sidebar">
      <header className="main-sidebar__header">
        <img
          src={habitPactLogo}
          className="main-sidebar__logo"
          alt="Habit Pact Logo"
        />
        <h1 className="main-sidebar__heading">Habit Pact</h1>
      </header>

      <nav className="main-sidebar__nav">
        <NavLink
          to="."
          end
          className={({ isActive }) =>
            isActive
              ? "main-sidebar__nav-item main-sidebar__nav-item--active"
              : "main-sidebar__nav-item"
          }
        >
          Overview
        </NavLink>
        <NavLink
          to="habits"
          className={({ isActive }) =>
            isActive
              ? "main-sidebar__nav-item main-sidebar__nav-item--active"
              : "main-sidebar__nav-item"
          }
        >
          Habits
        </NavLink>
        <NavLink to="#" className="main-sidebar__nav-item">
          Progress
        </NavLink>
        <NavLink to="#" className="main-sidebar__nav-item">
          Analytics
        </NavLink>
        <NavLink
          to="friends"
          className={({ isActive }) =>
            isActive
              ? "main-sidebar__nav-item main-sidebar__nav-item--active"
              : "main-sidebar__nav-item"
          }
        >
          Friends
        </NavLink>
        <NavLink
          to="settings"
          className={({ isActive }) =>
            isActive
              ? "main-sidebar__nav-item main-sidebar__nav-item--active"
              : "main-sidebar__nav-item"
          }
        >
          Settings
        </NavLink>
        <div className="main-sidebar__nav-item logout" onClick={logout}>
          Logout
        </div>
      </nav>

      <footer className="main-sidebar__footer">
        <h2 className="main-sidebar__footer-title">Need Help?</h2>
        <div className="main-sidebar__contact">
          <p className="main-sidebar__contact-text">
            Our support team is here for you
          </p>
          <a
            href="mailto:support@habittracker.com"
            className="main-sidebar__contact-link"
          >
            support@habitpact.com
          </a>
          <a href="tel:+1234567890" className="main-sidebar__contact-link">
            +1 (234) 567-890
          </a>
        </div>
      </footer>
    </div>
  );
}
