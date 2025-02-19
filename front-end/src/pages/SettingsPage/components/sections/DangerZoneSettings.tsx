import SettingsSection from "../common/SettingsSection";
import SettingItem from "../common/SettingItem";

type Props = {};

export default function DangerZoneSettings({}: Props) {
  return (
    <SettingsSection title="Danger Zone" variant="danger">
      <SettingItem
        title="Delete Account"
        description="Permanently delete your account and all data"
      >
        {" "}
        <button className="settings__button settings__button--danger">
          Delete Account
        </button>
      </SettingItem>
    </SettingsSection>
  );
}
