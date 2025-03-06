import SettingsSection from "../../common/SettingsSection";
import SettingItem from "../../common/SettingItem";
import { useState } from "react";
import DeleteAccountModal from "./modal/DeleteAccountModal";
import { useAuth } from "../../../../../contexts/AuthContext/AuthContext";

export default function DangerZoneSettings() {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { logout } = useAuth();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <SettingsSection title="Danger Zone" variant="danger">
      <SettingItem
        title="Logout"
        description="Logout from your account"
        className="mobile-only"
      >
        <button
          onClick={logout}
          className="settings__button settings__button--danger"
        >
          Log Out
        </button>
      </SettingItem>
      <SettingItem
        title="Delete Account"
        description="Permanently delete your account and all data"
      >
        {modalIsOpen && (
          <DeleteAccountModal isOpen={modalIsOpen} onClose={closeModal} />
        )}
        <button
          onClick={openModal}
          className="settings__button settings__button--danger"
        >
          Delete Account
        </button>
      </SettingItem>
    </SettingsSection>
  );
}
