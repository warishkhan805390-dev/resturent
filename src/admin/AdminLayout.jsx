import { useState } from 'react'

const navItems = [
  { key: 'overview', label: 'Dashboard', icon: 'fa-chart-pie' },
  { key: 'menu', label: 'Menu', icon: 'fa-utensils' },
  { key: 'orders', label: 'Orders', icon: 'fa-truck' },
  { key: 'payments', label: 'Payments', icon: 'fa-credit-card' },
  { key: 'settings', label: 'Settings', icon: 'fa-cog' },
]

export default function AdminLayout({ activePage, onNavigate, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="admin-wrap">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-brand">
          <div className="admin-logo"><i className="fas fa-utensils"></i></div>
          <div>
            <div className="admin-brand-name">Sar<span>ab</span></div>
            <div className="admin-brand-sub">Admin Panel</div>
          </div>
        </div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`admin-nav-item ${activePage === item.key ? 'active' : ''}`}
              onClick={() => { onNavigate(item.key); setSidebarOpen(false) }}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <a href="/" className="admin-back-btn"><i className="fas fa-arrow-left"></i> Back to Site</a>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <header className="admin-header">
          <button className="admin-hamburger" onClick={() => setSidebarOpen(true)}>
            <i className="fas fa-bars"></i>
          </button>
          <h2 className="admin-page-title">{navItems.find(n => n.key === activePage)?.label || 'Dashboard'}</h2>
          <div className="admin-header-right">
            <div className="admin-notif"><i className="fas fa-bell"></i><span className="admin-notif-dot"></span></div>
            <div className="admin-avatar">A</div>
          </div>
        </header>
        <div className="admin-content">{children}</div>
      </main>
    </div>
  )
}
