import SettingsSection from "../common/SettingsSection";
import SettingItem from "../common/SettingItem";
import { useAuth } from "../../../../contexts/AuthContext/AuthContext";

export default function ProfileSettings() {
  const { authState } = useAuth();
  return (
    <SettingsSection title="Profile Settings">
      <SettingItem
        title="Username"
        description="This is how your username will appear in the app"
      >
        <label htmlFor="username" className="settings__label sr-only">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="settings__text-input"
          aria-describedby="usernameDesc"
          disabled
          value={authState.user?.username}
        />
      </SettingItem>
      <SettingItem title="First Name" description="Your first name">
        <label htmlFor="firstName" className="settings__label sr-only">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          className="settings__text-input"
          aria-describedby="firstNameDesc"
          value={authState.user?.firstName}
        />
      </SettingItem>

      <SettingItem title="Last Name" description="Your last name">
        <label htmlFor="lastName" className="settings__label sr-only">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          className="settings__text-input"
          aria-describedby="lastNameDesc"
          value={authState.user?.lastName}
        />
      </SettingItem>

      <SettingItem
        title="Email Address"
        description="Your email address for notifications"
      >
        <label htmlFor="emailAddress" className="settings__label sr-only">
          Email Address
        </label>
        <input
          id="emailAddress"
          type="email"
          className="settings__text-input"
          aria-describedby="emailAddressDesc"
          value={authState.user?.email}
        />
      </SettingItem>
    </SettingsSection>
  );
}
