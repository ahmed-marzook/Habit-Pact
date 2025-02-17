import "./Settings.css";

type Props = {};

export default function Settings({}: Props) {
  return (
    <div className="settings">
      <div className="settings__header">
        <h1 className="settings__title">Settings</h1>
        <p className="settings__description">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="settings__section">
        <div className="settings__section-header">
          <div className="settings__section-title">Profile Settings</div>
        </div>
        <div className="settings__item">
          <div className="settings__item-label">
            <h3 className="settings__item-title">Display Name</h3>
            <p className="settings__item-description">
              This is how your name will appear in the app
            </p>
          </div>
          <div className="settings__form-control">
            <label htmlFor="displayName" className="settings__label sr-only">
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              className="settings__text-input"
              value="Sarah Johnson"
              aria-describedby="displayNameDesc"
            />
          </div>
        </div>
        <div className="settings__item">
          <div className="settings__item-label">
            <h3 className="settings__item-title">Email Address</h3>
            <p className="settings__item-description">
              Your email address for notifications
            </p>
          </div>
          <div className="settings__form-control">
            <label htmlFor="emailAddress" className="settings__label sr-only">
              Email Address
            </label>
            <input
              id="emailAddress"
              type="email"
              className="settings__text-input"
              value="sarah@example.com"
              aria-describedby="emailAddressDesc"
            />
          </div>
        </div>
      </div>

      <div className="settings__section">
        <div className="settings__section-header">
          <div className="settings__section-title">Notifications</div>
        </div>
        <div className="settings__item">
          <div className="settings__item-label">
            <h3 className="settings__item-title">Daily Reminders</h3>
            <p className="settings__item-description">
              Receive daily notifications for your habits
            </p>
          </div>
          <div className="settings__form-control">
            <label className="settings__toggle" htmlFor="dailyReminders">
              <span className="sr-only">Daily Reminders</span>
              <input
                id="dailyReminders"
                type="checkbox"
                className="settings__toggle-input"
                checked
                aria-describedby="dailyRemindersDesc"
              />
              <span className="settings__toggle-slider"></span>
            </label>
          </div>
        </div>
        <div className="settings__item">
          <div className="settings__item-label">
            <h3 className="settings__item-title">Weekly Summary</h3>
            <p className="settings__item-description">
              Get a weekly email summary of your progress
            </p>
          </div>
          <div className="settings__form-control">
            <label className="settings__toggle">
              <input
                type="checkbox"
                className="settings__toggle-input"
                checked
              />
              <span className="settings__toggle-slider"></span>
            </label>
          </div>
        </div>
        <div className="settings__item">
          <div className="settings__item-label">
            <h3 className="settings__item-title">Reminder Time</h3>
            <p className="settings__item-description">
              Set your preferred reminder time
            </p>
          </div>
          <div className="settings__form-control">
            <label htmlFor="reminderTime" className="settings__label sr-only">
              Reminder Time
            </label>
            <select
              id="reminderTime"
              className="settings__select"
              aria-describedby="reminderTimeDesc"
            >
              <option value="8:00">8:00 AM</option>
              <option value="9:00">9:00 AM</option>
              <option value="10:00" selected>
                10:00 AM
              </option>
              <option value="11:00">11:00 AM</option>
            </select>
          </div>
        </div>
      </div>

      <div className="settings__section">
        <div className="settings__section-header">
          <div className="settings__section-title">Appearance</div>
        </div>
        <div className="settings__item">
          <div className="settings__item-label">
            <h3 className="settings__item-title">Theme</h3>
            <p className="settings__item-description">
              Choose your preferred theme
            </p>
          </div>
          <div className="settings__form-control">
            <select className="settings__select">
              <option selected>Dark</option>
              <option>Light</option>
            </select>
          </div>
        </div>
        <div className="settings__item">
          <div className="settings__item-label">
            <h3 className="settings__item-title">Week Starts On</h3>
            <p className="settings__item-description">
              Choose your preferred first day of the week
            </p>
          </div>
          <div className="settings__form-control">
            <select className="settings__select">
              <option>Sunday</option>
              <option selected>Monday</option>
            </select>
          </div>
        </div>
      </div>

      <div className="settings__section">
        <div className="settings__section-header">
          <div className="settings__section-title">Privacy</div>
        </div>
        <div className="settings__item">
          <div className="settings__item-label">
            <h3 className="settings__item-title">Data Collection</h3>
            <p className="settings__item-description">
              Allow anonymous usage data collection to improve the app
            </p>
          </div>
          <div className="settings__form-control">
            <label className="settings__toggle">
              <input type="checkbox" className="settings__toggle-input" />
              <span className="settings__toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings__section settings__section--danger">
        <div className="settings__section-header">
          <div className="settings__section-title">Danger Zone</div>
        </div>
        <div className="settings__item">
          <div className="settings__item-label">
            <h3 className="settings__item-title">Delete Account</h3>
            <p className="settings__item-description">
              Permanently delete your account and all data
            </p>
          </div>
          <div className="settings__form-control">
            <button className="settings__button settings__button--danger">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
