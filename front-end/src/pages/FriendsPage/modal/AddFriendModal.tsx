import { useState } from "react";
import "./AddFriendModal.css";
import Modal from "react-modal";

interface AddFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFriend: (username: string) => void;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
    borderRadius: "12px",
    backgroundColor: "transparent",
    overflow: "visible",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(3px)",
  },
};

type ConnectionMethod = "search" | "share" | "qrcode";

interface SearchResult {
  id: string;
  name: string;
  username: string;
  habitCount: number;
}

export default function AddFriendModal({
  isOpen,
  onClose,
}: AddFriendModalProps) {
  const [activeMethod, setActiveMethod] = useState<ConnectionMethod>("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([
    {
      id: "1",
      name: "John Doe",
      username: "johndoe",
      habitCount: 6,
    },
  ]);

  const friendLink = "https://habittracker.app/add/user123";

  const handleMethodChange = (method: ConnectionMethod) => {
    setActiveMethod(method);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, you would fetch search results here
  };

  const handleAddFriend = (username: string) => {
    console.log("Adding some friend: " + username);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(friendLink);
    // You could add a toast notification here
  };

  const handleGenerateNewLink = () => {
    // In a real app, you would generate a new link here
  };

  const handleDownloadQR = () => {
    // In a real app, you would implement download logic here
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Add Friend"
      ariaHideApp={false}
    >
      <div className="friend-modal">
        {/* Modal Header */}
        <div className="friend-modal__header">
          <h2 className="friend-modal__title">Add Friend</h2>
          <p className="friend-modal__subtitle">
            Connect with friends on HabitTracker
          </p>
        </div>

        {/* Modal Body */}
        <div className="friend-modal__body">
          {/* Connection Methods */}
          <div className="friend-modal__methods">
            <button
              className={`friend-modal__method-button ${
                activeMethod === "search"
                  ? "friend-modal__method-button--active"
                  : ""
              }`}
              onClick={() => handleMethodChange("search")}
            >
              Search
            </button>
            <button
              className={`friend-modal__method-button ${
                activeMethod === "share"
                  ? "friend-modal__method-button--active"
                  : ""
              }`}
              onClick={() => handleMethodChange("share")}
            >
              Share Link
            </button>
            <button
              className={`friend-modal__method-button ${
                activeMethod === "qrcode"
                  ? "friend-modal__method-button--active"
                  : ""
              }`}
              onClick={() => handleMethodChange("qrcode")}
            >
              QR Code
            </button>
          </div>

          {/* Search Method */}
          {activeMethod === "search" && (
            <div className="friend-modal__content">
              <div className="friend-modal__input-group">
                <label className="friend-modal__label">
                  Search by username or email
                </label>
                <input
                  type="text"
                  className="friend-modal__input"
                  placeholder="Enter username or email"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>

              {/* Search Results */}
              <div className="friend-modal__results">
                {searchResults.map((result) => (
                  <div key={result.id} className="friend-modal__result-item">
                    <div className="friend-modal__result-avatar">
                      {result.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="friend-modal__result-info">
                      <div className="friend-modal__result-name">
                        {result.name}
                      </div>
                      <div className="friend-modal__result-details">
                        @{result.username} • {result.habitCount} habits
                      </div>
                    </div>
                    <button
                      className="friend-modal__button friend-modal__button--add"
                      onClick={() => handleAddFriend(result.username)}
                    >
                      Add Friend
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Share Link Method */}
          {activeMethod === "share" && (
            <div className="friend-modal__content">
              <div className="friend-modal__input-group">
                <label className="friend-modal__label">Your friend link</label>
                <div className="friend-modal__share-section">
                  <div className="friend-modal__share-link">{friendLink}</div>
                  <button
                    className="friend-modal__button friend-modal__button--copy"
                    onClick={handleCopyLink}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className="friend-modal__input-group">
                <label className="friend-modal__label">
                  Or generate a new link
                </label>
                <button
                  className="friend-modal__button friend-modal__button--generate"
                  onClick={handleGenerateNewLink}
                >
                  Generate New Link
                </button>
              </div>
            </div>
          )}

          {/* QR Code Method */}
          {activeMethod === "qrcode" && (
            <div className="friend-modal__content">
              <div className="friend-modal__qr-section">
                <label className="friend-modal__label">
                  Your personal QR code
                </label>
                <div className="friend-modal__qr-code">
                  {/* QR Code would be generated here */}
                  <img src="/api/placeholder/200/200" alt="QR Code" />
                </div>
                <a
                  href="#"
                  className="friend-modal__download-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDownloadQR();
                  }}
                >
                  Download QR Code
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer - only for search method we'll add a cancel button */}
        {activeMethod === "search" && (
          <div className="friend-modal__footer">
            <button
              className="friend-modal__button friend-modal__button--cancel"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
