import SettingsSection from "../common/SettingsSection";
import SettingItem from "../common/SettingItem";
import PasswordStrengthMeter from "../../../../components/common/PasswordStrengthMeter/PasswordStrengthMeter";
import { ChangeEvent, useState } from "react";
import { ChangePasswordRequest } from "../../../../types/changePasswordRequest";
import { useChangePassword } from "../../../../hooks/useUserQuery";

interface PasswordFormData {
  currentPassword: string | undefined;
  newPassword: string | undefined;
  confirmPassword: string | undefined;
}

enum PasswordMatchStatus {
  INITIAL = "INITIAL",
  MATCH = "MATCH",
  MISMATCH = "MISMATCH",
}

enum Variant {
  SUCCESS = "success",
  ERROR = "error",
  DEFAULT = "default",
}

export default function PasswordSettings() {
  const [passwordMatchStatus, setPasswordMatchStatus] =
    useState<PasswordMatchStatus>(PasswordMatchStatus.INITIAL);
  const [passwordFormData, setPasswordFormData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { mutate } = useChangePassword();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;

    setPasswordFormData((prevData) => {
      const newData = {
        ...prevData,
        [name]: value,
      };

      // Check password match status
      if (name === "newPassword" || name === "confirmPassword") {
        if (!newData.newPassword || !newData.confirmPassword) {
          setPasswordMatchStatus(PasswordMatchStatus.INITIAL);
        } else if (newData.newPassword === newData.confirmPassword) {
          setPasswordMatchStatus(PasswordMatchStatus.MATCH);
        } else {
          setPasswordMatchStatus(PasswordMatchStatus.MISMATCH);
        }
      }

      return newData;
    });
  };

  async function handlePasswordUpdate(formData: FormData) {
    const updateRequest: ChangePasswordRequest = {
      currentPassword: formData.get("currentPassword") as string,
      newPassword: formData.get("newPassword") as string,
    };
    try {
      mutate(updateRequest);
    } catch (error) {
      console.error("Update Failed:" + error);
    }
  }

  const getDescriptionText = (status: PasswordMatchStatus): string => {
    switch (status) {
      case PasswordMatchStatus.MATCH:
        return "Passwords match";
      case PasswordMatchStatus.MISMATCH:
        return "Passwords do not match";
      case PasswordMatchStatus.INITIAL:
        return "Confirm your new password";
      default:
        return "Confirm your new password";
    }
  };

  const getConfrimPasswordVariant = (status: PasswordMatchStatus): Variant => {
    switch (status) {
      case PasswordMatchStatus.MATCH:
        return Variant.SUCCESS;
      case PasswordMatchStatus.MISMATCH:
        return Variant.ERROR;
      case PasswordMatchStatus.INITIAL:
      default:
        return Variant.DEFAULT;
    }
  };

  return (
    <form action={handlePasswordUpdate}>
      <SettingsSection title="Change Password">
        <SettingItem
          title="Current Password"
          description="Enter your current password"
        >
          <label htmlFor="currentPassword" className="settings__label sr-only">
            Current Password
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            className="settings__text-input"
            placeholder="••••••••"
            aria-describedby="currentPasswordDesc"
            onChange={handleChange}
          />
        </SettingItem>

        <SettingItem
          title="New Password"
          description=" Enter your new password"
        >
          <label htmlFor="newPassword" className="settings__label sr-only">
            New Password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            className="settings__text-input"
            placeholder="••••••••"
            aria-describedby="newPasswordDesc"
            onChange={handleChange}
          />
        </SettingItem>
        <PasswordStrengthMeter password={passwordFormData.newPassword} />
        <SettingItem
          title="Confirm New Password"
          description={getDescriptionText(passwordMatchStatus)}
          variant={getConfrimPasswordVariant(passwordMatchStatus)}
        >
          <label htmlFor="confirmPassword" className="settings__label sr-only">
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="settings__text-input"
            placeholder="••••••••"
            aria-describedby="confirmPasswordDesc"
            onChange={handleChange}
          />
        </SettingItem>
        <SettingItem title="" description="">
          <button
            type="submit"
            className="settings__button"
            disabled={
              !(
                passwordMatchStatus === PasswordMatchStatus.MATCH &&
                passwordFormData.currentPassword
              )
            }
          >
            Update Password
          </button>
        </SettingItem>
      </SettingsSection>
    </form>
  );
}
