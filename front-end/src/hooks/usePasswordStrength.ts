import { useState, useEffect, useMemo, useCallback } from "react";

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

  const requirements = useMemo<RequirementsState>(() => {
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*?]/.test(password);

    return {
      length: hasLength,
      uppercase: hasUppercase,
      lowercase: hasLowercase,
      number: hasNumber,
      special: hasSpecial,
    };
  }, [password]);

  const checkPasswordStrength = useCallback(() => {
    const metRequirements = Object.values(requirements).filter(Boolean).length;
    const strengthPercentage = (metRequirements / 5) * 100;

    let newStrength: StrengthState;
    if (metRequirements === 1) {
      newStrength = {
        score: 0,
        text: "Very Weak",
        color: "#ff6b6b",
        percentage: strengthPercentage,
      };
    } else if (metRequirements <= 2) {
      newStrength = {
        score: 1,
        text: "Weak",
        color: "#ff9b6b",
        percentage: strengthPercentage,
      };
    } else if (metRequirements <= 3) {
      newStrength = {
        score: 2,
        text: "Fair",
        color: "#ffce6b",
        percentage: strengthPercentage,
      };
    } else if (metRequirements <= 4) {
      newStrength = {
        score: 3,
        text: "Good",
        color: "#d1ff6b",
        percentage: strengthPercentage,
      };
    } else {
      newStrength = {
        score: 4,
        text: "Strong",
        color: "#2ee6a8",
        percentage: strengthPercentage,
      };
    }
    setStrength(newStrength);

    if (password) {
      const result = zxcvbn(password);
      console.log(result.feedback.suggestions);
      setFeedback({
        warning: result.feedback.warning,
        suggestions:
          result.feedback.suggestions.length > 1
            ? result.feedback.suggestions
            : [],
        score: result.score,
      });
    } else {
      setFeedback({
        warning: null,
        suggestions: [],
        score: null,
      });
    }
  }, [password, requirements]);

  useEffect(() => {
    checkPasswordStrength();
  }, [checkPasswordStrength]);

  return {
    strength,
    requirements,
    feedback,
  };
}
