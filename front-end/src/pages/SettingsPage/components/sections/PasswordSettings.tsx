import SettingsSection from "../common/SettingsSection";
import SettingItem from "../common/SettingItem";
import PasswordStrengthMeter from "../../../../components/common/PasswordStrengthMeter/PasswordStrengthMeter";

interface ProfileFormData {
  newPassword: string | undefined;
  confirmPassword: string | undefined;
}

export default function PasswordSettings({}: Props) {
  const handleStrengthChange = (score: number, isValid: boolean) => {
    console.log(`Password strength: ${score}, Valid: ${isValid}`);
    // Enable/disable submit button based on password validity
  };

  return (
    <form>
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
          />
        </SettingItem>
        <PasswordStrengthMeter
          onStrengthChange={handleStrengthChange}
          initialPassword="Hello"
        />
        <SettingItem
          title="Confirm New Password"
          description="Confirm your new password"
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
          />
        </SettingItem>
        <SettingItem title="" description="">
          <button type="submit" className="settings__button">
            Update Password
          </button>
        </SettingItem>
      </SettingsSection>
    </form>
  );
}
