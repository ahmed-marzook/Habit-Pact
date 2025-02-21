import SettingsSection from "../common/SettingsSection";
import SettingItem from "../common/SettingItem";
import { ChangeEvent, useState } from "react";
import UpdateUserRequest from "../../../../types/updateUserRequest";
import { useUpdateUser, useUser } from "../../../../hooks/useUserQuery";
import { useAuth } from "../../../../contexts/AuthContext/AuthContext";

interface ProfileFormData {
  username: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
}

export default function ProfileSettings() {
  const { updateUser } = useAuth();
  const { data: user } = useUser();
  const [profileFormData, setProfileFormData] = useState<ProfileFormData>({
    username: user?.username,
    firstName: user?.firstName,
    lastName: user?.lastName,
  });
  const { isSuccess, isPending, mutate, error: updateError } = useUpdateUser();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;

    setProfileFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleProfileUpdate(formData: FormData) {
    const updateRequest: UpdateUserRequest = {
      username: formData.get("username") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
    };
    try {
      mutate(updateRequest);
      updateUser();
    } catch (error) {
      console.error("Patch Failed:" + updateError?.message + " " + error);
    }
  }

  return (
    <form action={handleProfileUpdate}>
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
            name="username"
            type="text"
            className="settings__text-input"
            aria-describedby="usernameDesc"
            value={profileFormData.username}
            onChange={handleChange}
          />
        </SettingItem>
        <SettingItem title="First Name" description="Your first name">
          <label htmlFor="firstName" className="settings__label sr-only">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="settings__text-input"
            aria-describedby="firstNameDesc"
            value={profileFormData.firstName}
            onChange={handleChange}
          />
        </SettingItem>

        <SettingItem title="Last Name" description="Your last name">
          <label htmlFor="lastName" className="settings__label sr-only">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className="settings__text-input"
            aria-describedby="lastNameDesc"
            value={profileFormData.lastName}
            onChange={handleChange}
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
            value={user?.email}
            disabled
          />
        </SettingItem>
        <SettingItem
          title=""
          description={isSuccess ? "Successfully updated profile." : ""}
        >
          <button
            type="submit"
            className="settings__button"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update Profile"}
          </button>
        </SettingItem>
      </SettingsSection>
    </form>
  );
}
