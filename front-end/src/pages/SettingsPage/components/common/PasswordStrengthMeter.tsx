import { useState, useEffect, ChangeEvent } from "react";

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
  history: boolean;
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
    history: false,
  });

  useEffect(() => {
    checkPasswordStrength(password);
  }, [password]);

  useEffect(() => {
    if (onStrengthChange) {
      const isValid = strength.score >= 3; // Consider "Good" or better as valid
      onStrengthChange(strength.score, isValid);
    }
  }, [strength, onStrengthChange]);

  const checkPasswordStrength = (value: string): void => {
    // Check individual requirements
    const hasLength = value.length >= 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*]/.test(value);
    const hasValidHistory = value.length > 0; // Simplified for demo purposes

    // Update requirements state
    setRequirements({
      length: hasLength,
      uppercase: hasUppercase,
      lowercase: hasLowercase,
      number: hasNumber,
      special: hasSpecial,
      history: hasValidHistory,
    });

    // Calculate strength score (0-6)
    const metRequirements = [
      hasLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecial,
      hasValidHistory,
    ].filter(Boolean).length;

    // Update strength percentage
    const strengthPercentage = (metRequirements / 6) * 100;

    // Set strength information based on score
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
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <div className="settings__item password-strength-meter__container">
      <div className="settings__label">
        <h3 className="settings__label-title">Password Strength</h3>
        <div className="settings__strength-container">
          <div
            className="settings__strength-meter"
            role="progressbar"
            aria-valuenow={strength.percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="settings__strength-bar"
              style={{
                width: `${strength.percentage}%`,
                backgroundColor: strength.color,
              }}
            ></div>
          </div>
          <p
            className="settings__strength-text"
            style={{ color: strength.color }}
          >
            {strength.text}
          </p>
        </div>

        <div className="settings__requirements">
          <p className="settings__requirements-title">Password requirements:</p>

          <div
            className={`settings__requirement ${
              requirements.length ? "settings__requirement--met" : ""
            }`}
          >
            <span className="settings__requirement-icon" aria-hidden="true">
              {requirements.length ? "●" : "○"}
            </span>
            <span>At least 8 characters</span>
          </div>

          <div
            className={`settings__requirement ${
              requirements.uppercase ? "settings__requirement--met" : ""
            }`}
          >
            <span className="settings__requirement-icon" aria-hidden="true">
              {requirements.uppercase ? "●" : "○"}
            </span>
            <span>At least one uppercase letter (A-Z)</span>
          </div>

          <div
            className={`settings__requirement ${
              requirements.lowercase ? "settings__requirement--met" : ""
            }`}
          >
            <span className="settings__requirement-icon" aria-hidden="true">
              {requirements.lowercase ? "●" : "○"}
            </span>
            <span>At least one lowercase letter (a-z)</span>
          </div>

          <div
            className={`settings__requirement ${
              requirements.number ? "settings__requirement--met" : ""
            }`}
          >
            <span className="settings__requirement-icon" aria-hidden="true">
              {requirements.number ? "●" : "○"}
            </span>
            <span>At least one number (0-9)</span>
          </div>

          <div
            className={`settings__requirement ${
              requirements.special ? "settings__requirement--met" : ""
            }`}
          >
            <span className="settings__requirement-icon" aria-hidden="true">
              {requirements.special ? "●" : "○"}
            </span>
            <span>At least one special character (!@#$%^&*)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
