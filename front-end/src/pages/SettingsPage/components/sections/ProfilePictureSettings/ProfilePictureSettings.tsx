import "./ProfilePictureSettings.css";
import SettingsSection from "../../common/SettingsSection";
import cameraIcon from "../../../../../assets/camera-icon.svg";
import uploadIcon from "../../../../../assets/upload-icon.svg";
import SettingItem from "../../common/SettingItem";

export default function ProfilePictureSettings() {
  return (
    <SettingsSection title="Profile Picture" variant="default" disabled={false}>
      <SettingItem
        title="Profile Picture"
        description="Upload a profile picture (JPG or PNG, max 5MB)"
      >
        <div className="profile-picture-settings__profile-picture-container">
          <div className="profile-picture-settings__profile-picture">
            <img
              id="profile-picture-settings__profile-preview"
              style={{ display: "none" }}
              alt="Profile picture"
              src={`https://randomuser.me/api/portraits/men/${Math.floor(
                Math.random() * 100
              )}.jpg`}
            />
            <img
              src={cameraIcon}
              style={{ display: "none" }}
              className="profile-picture-settings__profile-picture-icon"
              id="profile-picture-settings__camera-icon"
              alt="Camera icon"
            />
          </div>
        </div>
      </SettingItem>
      <SettingItem title="" description="">
        <button className="settings__button settings__button--danger profile-picture-settings__remove-photo">
          Remove photo
        </button>
        <label className="profile-picture-settings__upload-label">
          <img
            src={uploadIcon}
            className="profile-picture-settings__upload-icon"
            alt="Upload icon"
          />
          Upload Photo
          <input
            type="file"
            className="profile-picture-settings__file-input"
            id="profile-picture-settings__profile-upload"
            accept="image/jpeg,image/png"
          />
        </label>
      </SettingItem>
    </SettingsSection>
  );
}
