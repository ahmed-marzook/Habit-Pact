import { useState, useEffect } from "react";

import zxcvbn from "zxcvbn-typescript";

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

interface PasswordStrengthResult {
  strength: StrengthState;
  requirements: RequirementsState;
  feedback: FeedbackState;
}

export function usePasswordStrength(password: string): PasswordStrengthResult {
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

      const strengthPercentage = (metRequirements / 5) * 100;

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
      } else {
        setStrength({
          score: 4,
          text: "Strong",
          color: "#93ff6b",
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

    checkPasswordStrength(password);
  }, [password]);

  return {
    strength,
    requirements,
    feedback,
  };
}
