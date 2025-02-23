import "./PasswordStrengthMeter.css";
import { usePasswordStrength } from "../../../hooks/usePasswordStrength";

interface PasswordStrengthMeterProps {
  password: string;
}

export default function PasswordStrengthMeter({
  password,
}: PasswordStrengthMeterProps) {
  const { strength, requirements, feedback } = usePasswordStrength(password);

  return (
    <div className="psm-container">
      <div className="psm-content">
        <h3 className="psm-title">Password Strength</h3>
        <div className="psm-meter-container">
          <div
            className="psm-meter"
            role="progressbar"
            aria-valuenow={strength.percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="psm-progress-bar"
              style={{
                width: `${strength.percentage}%`,
                backgroundColor: strength.color,
              }}
            ></div>
          </div>
          <p className="psm-strength-text" style={{ color: strength.color }}>
            {strength.text}
          </p>
        </div>

        <div className="psm-requirements">
          <p className="psm-requirements-title">Password requirements:</p>

          {Object.entries(requirements).map(([key, met]) => (
            <div
              key={key}
              className={`psm-requirement ${met ? "psm-requirement--met" : ""}`}
            >
              <span className="psm-requirement-icon" aria-hidden="true">
                {met ? "●" : "○"}
              </span>
              <span>
                {key === "length" && "At least 8 characters"}
                {key === "uppercase" && "At least one uppercase letter (A-Z)"}
                {key === "lowercase" && "At least one lowercase letter (a-z)"}
                {key === "number" && "At least one number (0-9)"}
                {key === "special" &&
                  "At least one special character (!@#$%^&*)"}
              </span>
            </div>
          ))}
        </div>

        {(feedback.warning || feedback.suggestions.length > 0) && (
          <div className="psm-feedback">
            <h4 className="psm-feedback-heading">Password Analysis</h4>

            {feedback.warning && (
              <div className="psm-feedback-warning">
                <span className="psm-feedback-icon" aria-hidden="true">
                  ⚠️
                </span>
                <span>{feedback.warning}</span>
              </div>
            )}

            {feedback.suggestions.length > 0 && (
              <div className="psm-feedback-suggestions">
                <p className="psm-feedback-title">
                  Suggestions for improvement:
                </p>
                <ul className="psm-feedback-list">
                  {feedback.suggestions.map((suggestion, index) => (
                    <li key={index} className="psm-feedback-item">
                      <span className="psm-feedback-icon" aria-hidden="true">
                        💡
                      </span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
