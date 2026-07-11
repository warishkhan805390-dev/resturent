export default function AdminSettings() {
  return (
    <div className="admin-settings-grid">
      <div className="admin-card">
        <div className="admin-card-header"><h3>Restaurant Info</h3></div>
        <div className="admin-form-grid">
          <div className="admin-field">
            <label>Restaurant Name</label>
            <input type="text" defaultValue="Sarab - Fast Food & Restaurant" />
          </div>
          <div className="admin-field">
            <label>Owner Name</label>
            <input type="text" defaultValue="Bestwpware" />
          </div>
          <div className="admin-field">
            <label>Email</label>
            <input type="email" defaultValue="hello@sarabfood.com" />
          </div>
          <div className="admin-field">
            <label>Phone</label>
            <input type="tel" defaultValue="+1 (800) 123-4567" />
          </div>
          <div className="admin-field admin-field-full">
            <label>Address</label>
            <input type="text" defaultValue="42 Flavor Street, Manhattan, New York, NY 10001" />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header"><h3>Business Hours</h3></div>
        <div className="admin-hours-grid">
          {['Mon-Tue', 'Wed-Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div className="admin-hour-row" key={i}>
              <span className="hour-day">{day}</span>
              <input type="time" defaultValue={i < 2 ? '' : '09:00'} className="hour-input" />
              <span className="hour-sep">to</span>
              <input type="time" defaultValue={i < 2 ? '' : '22:00'} className="hour-input" />
              <span className={`hour-badge ${i < 2 ? 'badge-closed' : 'badge-open'}`}>{i < 2 ? 'Closed' : 'Open'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header"><h3>Notification Preferences</h3></div>
        <div className="admin-prefs">
          {['New Order Alert', 'Payment Received', 'Low Stock Warning', 'New Customer Registration', 'Daily Report'].map((p, i) => (
            <div className="admin-pref-row" key={i}>
              <span>{p}</span>
              <label className="admin-toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header"><h3>Account</h3></div>
        <div className="admin-prefs">
          <div className="admin-pref-row">
            <span>Email Notifications</span>
            <label className="admin-toggle">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="admin-pref-row">
            <span>SMS Notifications</span>
            <label className="admin-toggle">
              <input type="checkbox" />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <button className="admin-btn" style={{ marginTop: 16, width: '100%' }}><i className="fas fa-save"></i> Save Settings</button>
        </div>
      </div>
    </div>
  )
}
