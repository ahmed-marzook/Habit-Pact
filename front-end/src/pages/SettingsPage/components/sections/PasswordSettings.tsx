import SettingsSection from "../common/SettingsSection";
import SettingItem from "../common/SettingItem";

type Props = {};

export default function PasswordSettings({}: Props) {
  return (
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
          type="password"
          className="settings__text-input"
          placeholder="••••••••"
          aria-describedby="currentPasswordDesc"
        />
      </SettingItem>

      <SettingItem title="New Password" description=" Enter your new password">
        <label htmlFor="newPassword" className="settings__label sr-only">
          New Password
        </label>
        <input
          id="newPassword"
          type="password"
          className="settings__text-input"
          placeholder="••••••••"
          aria-describedby="newPasswordDesc"
        />
      </SettingItem>
      <SettingItem
        title="Confirm New Password"
        description="Confirm your new password"
      >
        <label htmlFor="confirmPassword" className="settings__label sr-only">
          Confirm New Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="settings__text-input"
          placeholder="••••••••"
          aria-describedby="confirmPasswordDesc"
        />
      </SettingItem>
      <SettingItem title="" description="">
        <button className="settings__button">Update Password</button>
      </SettingItem>
    </SettingsSection>
  );
}
