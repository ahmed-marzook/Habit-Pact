import "./SignIn.css";
import habitPactLogo from "../../assets/habit-pact-logo.svg";
import googleIcon from "../../assets/google.svg";
import facebookIcon from "../../assets/facebook.svg";
import appleIcon from "../../assets/apple.svg";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

export default function SignIn({}: Props) {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  async function handleSignIn(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      await loginUser(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  }
  return (
    <div className="signin">
      <div className="signin__card">
        <div className="signin__nav">
          <a href="/" className="signin__back-button">
            ← Back to Home
          </a>
        </div>
        <img src={habitPactLogo} alt="Logo" className="signin__logo" />
        <div className="signin__header-logo">HabitPact</div>
        <div className="signin__header">
          <h1 className="signin__title">Welcome back</h1>
          <p className="signin__subtitle">Sign in to continue to HabitPact</p>
        </div>

        <form className="signin__form" action={handleSignIn}>
          <div className="signin__form-group">
            <label className="signin__label">Email</label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              className="signin__input"
              placeholder="Enter your email"
            />
          </div>

          <div className="signin__form-group">
            <label className="signin__label">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              className="signin__input"
              placeholder="Enter your password"
              name="password"
            />
            <div className="signin__forgot-password">
              <a href="#" className="signin__link">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="signin__button signin__button--primary"
          >
            Sign in
          </button>
        </form>
        <div className="signin__divider">
          <span className="signin__divider-text">or continue with</span>
        </div>

        <div className="signin__social">
          <button
            type="button"
            className="signin__social-button signin__social-button--google"
            disabled
          >
            <img
              src={googleIcon}
              alt="Google"
              className="signin__social-icon"
            />
            Continue with Google
          </button>
          <button
            type="button"
            className="signin__social-button signin__social-button--apple"
            disabled
          >
            <img src={appleIcon} alt="Apple" className="signin__social-icon" />
            Continue with Apple
          </button>
          <button
            type="button"
            className="signin__social-button signin__social-button--facebook"
            disabled
          >
            <img
              src={facebookIcon}
              alt="Facebook"
              className="signin__social-icon"
            />
            Continue with Facebook
          </button>
        </div>

        <div className="signin__footer">
          <span className="signin__footer-text">Don't have an account?</span>
          <Link to="/register" className="signin__link">
            {" "}
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
