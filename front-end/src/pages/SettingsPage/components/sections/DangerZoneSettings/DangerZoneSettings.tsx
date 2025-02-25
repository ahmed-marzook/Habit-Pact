import SettingsSection from "../../common/SettingsSection";
import SettingItem from "../../common/SettingItem";
import { useState } from "react";
import DeleteAccountModal from "./modal/DeleteAccountModal";

export default function DangerZoneSettings() {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <SettingsSection title="Danger Zone" variant="danger">
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
