import PageHeader from "../../components/common/PageHeader";
import AppearanceSettings from "./components/sections/AppearanceSettings";
import DangerZoneSettings from "./components/sections/DangerZoneSettings";
import NotificationsSettings from "./components/sections/NotificationsSettings";
import PasswordSettings from "./components/sections/PasswordSettings";
import PrivacySettings from "./components/sections/PrivacySettings";
import ProfileSettings from "./components/sections/ProfileSettings";
import "./Settings.css";

type Props = {};

export default function Settings({}: Props) {
  return (
    <div className="settings">
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences"
      />
      <ProfileSettings />
      <PasswordSettings />
      <NotificationsSettings />
      <AppearanceSettings />
      <PrivacySettings />
      <DangerZoneSettings />
    </div>
  );
}
