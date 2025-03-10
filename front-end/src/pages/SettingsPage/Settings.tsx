import SettingHeader from "./components/common/SettingHeader";
import AppearanceSettings from "./components/sections/AppearanceSettings";
import DangerZoneSettings from "./components/sections/DangerZoneSettings/DangerZoneSettings";
import NotificationsSettings from "./components/sections/NotificationsSettings";
import PasswordSettings from "./components/sections/PasswordSettings";
import PrivacySettings from "./components/sections/PrivacySettings";
import ProfileSettings from "./components/sections/ProfileSettings";
import "./Settings.css";
import cameraIcon from "../../assets/camera-icon.svg";
import uploadIcon from "../../assets/upload-icon.svg";
import ProfilePictureSettings from "./components/sections/ProfilePictureSettings/ProfilePictureSettings";

type Props = {};

export default function Settings({}: Props) {
  return (
    <div className="settings">
      <SettingHeader
        title="Settings"
        description="Manage your account settings and preferences"
      />
      <ProfilePictureSettings />
      <ProfileSettings />
      <PasswordSettings />
      <NotificationsSettings />
      <AppearanceSettings />
      <PrivacySettings />
      <DangerZoneSettings />
    </div>
  );
}
