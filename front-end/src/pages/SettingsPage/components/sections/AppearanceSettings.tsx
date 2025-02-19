import SettingsSection from "../common/SettingsSection";
import SettingItem from "../common/SettingItem";

type Props = {};

export default function AppearanceSettings({}: Props) {
  return (
    <SettingsSection title="Appearance">
      <SettingItem title="Theme" description="Choose your preferred theme">
        <label htmlFor="theme-select" className="sr-only">
          Theme
        </label>
        <select
          className="settings__select"
          id="theme-select"
          aria-labelledby="theme-label"
        >
          <option selected>Dark</option>
          <option>Light</option>
        </select>
      </SettingItem>

      <SettingItem
        title="Week Starts On"
        description="Choose your preferred first day of the week"
      >
        <label htmlFor="week-start-select" className="sr-only">
          Week Starts On
        </label>
        <select
          className="settings__select"
          id="week-start-select"
          aria-labelledby="week-start-label"
        >
          <option>Sunday</option>
          <option selected>Monday</option>
        </select>
      </SettingItem>
    </SettingsSection>
  );
}
