import SettingsSection from "../common/SettingsSection";
import SettingItem from "../common/SettingItem";

type Props = {};

export default function PrivacySettings({}: Props) {
  return (
    <SettingsSection title="Privacy">
      <SettingItem
        title="Data Collection"
        description="Allow anonymous usage data collection to improve the app"
      >
        <label className="settings__toggle sr-only" htmlFor="settingsToggle">
          <input
            id="settingsToggle"
            type="checkbox"
            className="settings__toggle-input"
            aria-label="Settings toggle"
          />
          <span className="settings__toggle-slider"></span>
        </label>
      </SettingItem>
    </SettingsSection>
  );
}
