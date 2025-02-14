import "./SignIn.css";
import habitPactLogo from "../../assets/habit-pact-logo.svg";

type Props = {};

export default function SignIn({}: Props) {
  return (
    <div className="signin">
      <div className="signin__card">
        <div className="signin__nav">
          <a href="/" className="signin__back-button">
            ← Back to Home
          </a>
        </div>
        <img src={habitPactLogo} alt="Logo" className="signin__nav-logo" />
        <div className="signin__logo">HabitPact</div>
        <div className="signin__header">
          <h1 className="signin__title">Welcome back</h1>
          <p className="signin__subtitle">Sign in to continue to HabitPact</p>
        </div>

        <form className="signin__form">
          <div className="signin__form-group">
            <label className="signin__label">Email</label>
            <input
              type="email"
              className="signin__input"
              placeholder="Enter your email"
            />
          </div>

          <div className="signin__form-group">
            <label className="signin__label">Password</label>
            <input
              type="password"
              className="signin__input"
              placeholder="Enter your password"
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

          <div className="signin__divider">
            <span className="signin__divider-text">or continue with</span>
          </div>

          <div className="signin__social">
            <button
              type="button"
              className="signin__social-button signin__social-button--google"
            >
              <img
                src="/api/placeholder/20/20"
                alt="Google"
                className="signin__social-icon"
              />
              Continue with Google
            </button>
            <button
              type="button"
              className="signin__social-button signin__social-button--apple"
            >
              <img
                src="/api/placeholder/20/20"
                alt="Apple"
                className="signin__social-icon"
              />
              Continue with Apple
            </button>
            <button
              type="button"
              className="signin__social-button signin__social-button--facebook"
            >
              <img
                src="/api/placeholder/20/20"
                alt="Facebook"
                className="signin__social-icon"
              />
              Continue with Facebook
            </button>
          </div>
        </form>

        <div className="signin__footer">
          <span className="signin__footer-text">Don't have an account?</span>
          <a href="#signup" className="signin__link">
            {" "}
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
