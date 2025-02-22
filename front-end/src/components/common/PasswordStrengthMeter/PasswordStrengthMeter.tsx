// PasswordStrengthMeter.tsx
import { useState, useEffect, ChangeEvent } from "react";
import zxcvbn from "zxcvbn-typescript";
import "./PasswordStrengthMeter.css";

interface StrengthState {
  score: number;
  text: string;
  color: string;
  percentage: number;
}

interface RequirementsState {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

interface FeedbackState {
  warning: string | null;
  suggestions: string[];
  score: number | null;
}

interface PasswordStrengthMeterProps {
  initialPassword?: string;
  onStrengthChange?: (score: number, isValid: boolean) => void;
}

export default function PasswordStrengthMeter({
  initialPassword = "",
  onStrengthChange,
}: PasswordStrengthMeterProps) {
  const [password, setPassword] = useState<string>(initialPassword);
  const [feedback, setFeedback] = useState<FeedbackState>({
    warning: null,
    suggestions: [],
    score: null,
  });

  const [strength, setStrength] = useState<StrengthState>({
    score: 0,
    text: "Very Weak",
    color: "#ff6b6b",
    percentage: 0,
  });

  const [requirements, setRequirements] = useState<RequirementsState>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    checkPasswordStrength(password);
  }, [password]);

  useEffect(() => {
    if (onStrengthChange) {
      const isValid = strength.score >= 3;
      onStrengthChange(strength.score, isValid);
    }
  }, [strength, onStrengthChange]);

  const checkPasswordStrength = (value: string): void => {
    const hasLength = value.length >= 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*]/.test(value);

    setRequirements({
      length: hasLength,
      uppercase: hasUppercase,
      lowercase: hasLowercase,
      number: hasNumber,
      special: hasSpecial,
    });

    const metRequirements = [
      hasLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecial,
    ].filter(Boolean).length;

    const strengthPercentage = (metRequirements / 6) * 100;

    if (metRequirements === 0) {
      setStrength({
        score: 0,
        text: "Very Weak",
        color: "#ff6b6b",
        percentage: strengthPercentage,
      });
    } else if (metRequirements <= 2) {
      setStrength({
        score: 1,
        text: "Weak",
        color: "#ff9b6b",
        percentage: strengthPercentage,
      });
    } else if (metRequirements <= 3) {
      setStrength({
        score: 2,
        text: "Fair",
        color: "#ffce6b",
        percentage: strengthPercentage,
      });
    } else if (metRequirements <= 4) {
      setStrength({
        score: 3,
        text: "Good",
        color: "#d1ff6b",
        percentage: strengthPercentage,
      });
    } else if (metRequirements === 5) {
      setStrength({
        score: 4,
        text: "Strong",
        color: "#93ff6b",
        percentage: strengthPercentage,
      });
    } else {
      setStrength({
        score: 5,
        text: "Very Strong",
        color: "#2ee6a8",
        percentage: strengthPercentage,
      });
    }

    const result = zxcvbn(value);
    setFeedback({
      warning: result.feedback.warning,
      suggestions: result.feedback.suggestions,
      score: result.score,
    });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

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
