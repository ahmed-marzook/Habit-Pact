import SettingsSection from "../common/SettingsSection";
import SettingItem from "../common/SettingItem";

type Props = {};

export default function NotificationsSettings({}: Props) {
  return (
    <SettingsSection title="Notifications" variant="default" disabled={true}>
      <SettingItem
        title="Daily Reminders"
        description="Receive daily notifications for your habits"
      >
        <label className="settings__toggle" htmlFor="dailyReminders">
          <span className="sr-only">Daily Reminders</span>
          <input
            id="dailyReminders"
            type="checkbox"
            className="settings__toggle-input"
            aria-describedby="dailyRemindersDesc"
          />
          <span className="settings__toggle-slider"></span>
        </label>
      </SettingItem>

      <SettingItem
        title="Weekly Summary"
        description="Get a weekly email summary of your progress"
      >
        <label className="settings__toggle" htmlFor="weeklySummary">
          <span className="sr-only">Daily Reminders</span>
          <input
            id="weeklySummary"
            type="checkbox"
            className="settings__toggle-input"
            aria-describedby="weeklySummaryDesc"
          />
          <span className="settings__toggle-slider"></span>
        </label>
      </SettingItem>

      <SettingItem
        title="Reminder Time"
        description="Set your preferred reminder time"
      >
        <label htmlFor="reminderTime" className="settings__label sr-only">
          Reminder Time
        </label>
        <select
          id="reminderTime"
          className="settings__select"
          aria-describedby="reminderTimeDesc"
        >
          <option value="8:00">8:00 AM</option>
          <option value="9:00">9:00 AM</option>
          <option value="10:00" selected>
            10:00 AM
          </option>
          <option value="11:00">11:00 AM</option>
        </select>
      </SettingItem>
    </SettingsSection>
  );
}
