import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import habitPactlogo from "../../assets/habit-pact-logo.svg";
import googleIcon from "../../assets/google.svg";
import facebookIcon from "../../assets/facebook.svg";
import appleIcon from "../../assets/apple.svg";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import PasswordStrengthMeter from "../../components/common/PasswordStrengthMeter/PasswordStrengthMeter";
import { ChangeEvent, useState } from "react";

interface RegisterFormData {
  newPassword: string | undefined;
}

export default function Register() {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [passwordRequirementsMet, setPasswordRequirementsMet] = useState(false);
  const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
    newPassword: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;

    setRegisterFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function registerForm(formData: FormData) {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("newPassword") as string;

    try {
      await registerUser(email, password, username, firstName, lastName);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }
  return (
    <div className="register">
      {/* Left Side - Feature Showcase */}
      <div className="register__features">
        <div className="register__logo-wrapper">
          <img src={habitPactlogo} alt="Logo" className="register__nav-logo" />
          <div className="register__logo">HabitPact</div>
        </div>
        <ul className="register__feature-list">
          <li className="register__feature-item">
            <div className="register__feature-icon">📊</div>
            <div className="register__feature-content">
              <h3 className="register__feature-title">Track Your Progress</h3>
              <p className="register__feature-description">
                Monitor your habits with intuitive dashboards and detailed
                analytics
              </p>
            </div>
          </li>
          <li className="register__feature-item">
            <div className="register__feature-icon">🎯</div>
            <div className="register__feature-content">
              <h3 className="register__feature-title">Set Clear Goals</h3>
              <p className="register__feature-description">
                Define and achieve your personal goals with our structured
                approach
              </p>
            </div>
          </li>
          <li className="register__feature-item">
            <div className="register__feature-icon">🌟</div>
            <div className="register__feature-content">
              <h3 className="register__feature-title">Stay Motivated</h3>
              <p className="register__feature-description">
                Get daily reminders and celebrate your achievements
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Right Side - Registration Form */}
      <div className="register__form-container">
        <div className="register__nav">
          <Link to="/" className="register__back-button">
            ← Back to Home Page
          </Link>
          <img src={habitPactlogo} alt="Logo" className="register__nav-logo" />
        </div>
        <div className="register__header">
          <h1 className="register__title">Create your account</h1>
          <p className="register__subtitle">
            Start your journey to better habits today
          </p>
        </div>

        <form className="register__form" action={registerForm}>
          <div className="register__form-group-inputs">
            <div className="register__form-group">
              <label className="register__label">First Name</label>
              <input
                type="text"
                autoComplete="given-name"
                className="register__input"
                placeholder="Enter your First name"
                required
                name="firstName"
              />
            </div>

            <div className="register__form-group">
              <label className="register__label">Last Name</label>
              <input
                type="text"
                autoComplete="family-name"
                className="register__input"
                placeholder="Enter your Last name"
                required
                name="lastName"
              />
            </div>
          </div>

          <div className="register__form-group-inputs">
            <div className="register__form-group">
              <label className="register__label">Username</label>
              <input
                type="text"
                autoComplete="username"
                className="register__input"
                placeholder="Enter a Username"
                required
                name="username"
              />
            </div>

            <div className="register__form-group">
              <label className="register__label">Email</label>
              <input
                type="email"
                autoComplete="email"
                className="register__input"
                placeholder="Enter your email"
                name="email"
                required
              />
            </div>
          </div>

          <div className="register__form-group">
            <label className="register__label">Password</label>
            <input
              type="password"
              onChange={handleChange}
              value={registerFormData.newPassword}
              autoComplete="new-password"
              className="register__input"
              placeholder="Create a password"
              name="newPassword"
              required
            />
          </div>
          {registerFormData.newPassword && (
            <PasswordStrengthMeter
              password={registerFormData.newPassword ?? ""}
              onRequirementsMet={setPasswordRequirementsMet}
            />
          )}

          <button
            type="submit"
            className="register__button register__button--primary"
            disabled={!passwordRequirementsMet}
          >
            Create Account
          </button>
        </form>
        <div className="register__divider">
          <span className="register__divider-text">or register with</span>
        </div>

        <div className="register__social">
          <button
            type="button"
            className="register__social-button register__social-button--google"
            disabled={true}
          >
            <img
              src={googleIcon}
              alt="Google"
              className="register__social-icon"
            />
            Continue with Google
          </button>
          <button
            type="button"
            className="register__social-button register__social-button--apple"
            disabled={true}
          >
            <img
              src={appleIcon}
              alt="Apple"
              className="register__social-icon"
            />
            Continue with Apple
          </button>
          <button
            type="button"
            className="register__social-button register__social-button--facebook"
            disabled={true}
          >
            <img
              src={facebookIcon}
              alt="Facebook"
              className="register__social-icon"
            />
            Continue with Facebook
          </button>
        </div>

        <div className="register__footer">
          Already have an account?{" "}
          <Link to="/login" className="register__link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
