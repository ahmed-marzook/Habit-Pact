import { useState } from "react";
import "./Friends.css";
import AddFriendModal from "./modal/AddFriendModal";

type Props = {};

export default function Friends({}: Props) {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="friends">
      <div className="friends__header">
        <h1 className="friends__title">Friends</h1>
        <button onClick={openModal} className="friends__add-button">
          <span className="friends__add-button-icon">+</span>
          <span className="friends__add-button-text">Add Friend</span>
        </button>
      </div>

      <AddFriendModal isOpen={modalIsOpen} onClose={closeModal} />

      <div className="friends__search">
        <input
          type="text"
          placeholder="Search friends..."
          className="friends__search-input"
        />
      </div>

      <div className="friends__tabs">
        <div className="friends__tab friends__tab--active">Following (8)</div>
        <div className="friends__tab">Followers (12)</div>
        <div className="friends__tab">
          Requests <span className="friends__tab-badge">3</span>
        </div>
        <div className="friends__tab">Discover</div>
      </div>

      <div
        className="friends__requests friends__requests--hidden"
        style={{ display: "none" }}
      >
        <div className="friends__requests-grid">
          <div className="friend-request">
            <div className="friend-request__header">
              <div className="friend-request__avatar">JD</div>
              <div className="friend-request__info">
                <div className="friend-request__name">John Doe</div>
                <div className="friend-request__stats">
                  6 Active Habits • 88% Success Rate
                </div>
              </div>
              <div className="friend-request__actions">
                <button className="friend-request__accept-button">
                  Accept
                </button>
                <button className="friend-request__decline-button">
                  Decline
                </button>
              </div>
            </div>
          </div>

          <div className="friend-request">
            <div className="friend-request__header">
              <div className="friend-request__avatar">ES</div>
              <div className="friend-request__info">
                <div className="friend-request__name">Emma Smith</div>
                <div className="friend-request__stats">
                  4 Active Habits • 92% Success Rate
                </div>
              </div>
              <div className="friend-request__actions">
                <button className="friend-request__accept-button">
                  Accept
                </button>
                <button className="friend-request__decline-button">
                  Decline
                </button>
              </div>
            </div>
          </div>

          <div className="friends__divider">Sent Requests</div>

          <div className="friend-request friend-request--sent">
            <div className="friend-request__header">
              <div className="friend-request__avatar">RK</div>
              <div className="friend-request__info">
                <div className="friend-request__name">Ryan Kim</div>
                <div className="friend-request__stats">
                  Request sent 2 days ago
                </div>
              </div>
              <div className="friend-request__actions">
                <button className="friend-request__cancel-button">
                  Cancel Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="friends__grid">
        <div className="friend-card">
          <div className="friend-card__header">
            <div className="friend-card__avatar">MJ</div>
            <div className="friend-card__info">
              <div className="friend-card__name">Michael Johnson</div>
              <div className="friend-card__stats">
                5 Active Habits • 85% Success Rate
              </div>
            </div>
            <button className="friend-card__button friend-card__button--following">
              Following
            </button>
          </div>
          <div className="friend-card__habits">
            <div className="friend-card__habit">
              <span className="friend-card__habit-name">
                Morning Meditation
              </span>
              <span className="friend-card__habit-streak">🔥 15 days</span>
            </div>
            <div className="friend-card__habit">
              <span className="friend-card__habit-name">Read 30 Minutes</span>
              <span className="friend-card__habit-streak">🔥 8 days</span>
            </div>
          </div>
        </div>

        <div className="friend-card">
          <div className="friend-card__header">
            <div className="friend-card__avatar">AK</div>
            <div className="friend-card__info">
              <div className="friend-card__name">Anna Kim</div>
              <div className="friend-card__stats">
                3 Active Habits • 92% Success Rate
              </div>
            </div>
            <button className="friend-card__button friend-card__button--following">
              Following
            </button>
          </div>
          <div className="friend-card__habits">
            <div className="friend-card__habit">
              <span className="friend-card__habit-name">Exercise</span>
              <span className="friend-card__habit-streak">🔥 21 days</span>
            </div>
            <div className="friend-card__habit">
              <span className="friend-card__habit-name">Healthy Eating</span>
              <span className="friend-card__habit-streak">🔥 12 days</span>
            </div>
          </div>
        </div>

        <div className="friend-card">
          <div className="friend-card__header">
            <div className="friend-card__avatar">DP</div>
            <div className="friend-card__info">
              <div className="friend-card__name">David Park</div>
              <div className="friend-card__stats">
                4 Active Habits • 78% Success Rate
              </div>
            </div>
            <button className="friend-card__button">Follow</button>
          </div>
          <div className="friend-card__habits">
            <div className="friend-card__habit">
              <span className="friend-card__habit-name">Journal Writing</span>
              <span className="friend-card__habit-streak">🔥 5 days</span>
            </div>
            <div className="friend-card__habit">
              <span className="friend-card__habit-name">Learn Spanish</span>
              <span className="friend-card__habit-streak">🔥 30 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
