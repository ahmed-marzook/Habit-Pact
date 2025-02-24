import "./PasswordStrengthMeter.css";
import { usePasswordStrength } from "../../../hooks/usePasswordStrength";
import { useEffect } from "react";

interface PasswordStrengthMeterProps {
  password: string;
  onRequirementsMet?: (allMet: boolean) => void;
}

export default function PasswordStrengthMeter({
  password,
  onRequirementsMet,
}: PasswordStrengthMeterProps) {
  const { strength, requirementsList, feedback } =
    usePasswordStrength(password);

  const allRequirementsMet = requirementsList.every((item) => item.met);

  useEffect(() => {
    onRequirementsMet?.(allRequirementsMet);
  }, [allRequirementsMet, onRequirementsMet]);

  return (
    <div className="psm-container">
      <div className="psm-content">
        <h3 className="psm-title">Password Strength</h3>
        <div className="psm-meter-container">
          <div
            className="psm-meter"
            title="as"
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

          {requirementsList.map((item) => (
            <div
              key={item.key}
              className={`psm-requirement ${
                item.met ? "psm-requirement--met" : ""
              }`}
            >
              <span className="psm-requirement-icon" aria-hidden="true">
                {item.met ? "●" : "○"}
              </span>
              <span>{item.label}</span>
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
