const metrics = [
  { label: 'Total Sales', value: '$48,920', icon: 'fa-dollar-sign', color: 'var(--primary)', change: '+12.5%' },
  { label: 'Active Orders', value: '24', icon: 'fa-shopping-bag', color: 'var(--secondary)', change: '+8.2%' },
  { label: 'Menu Items', value: '186', icon: 'fa-utensils', color: 'var(--green)', change: '+3.1%' },
  { label: 'Total Customers', value: '3,412', icon: 'fa-users', color: '#8b5cf6', change: '+18.7%' },
]

const recentOrders = [
  { id: '#ORD-1024', customer: 'John Doe', items: 'Smash Burger, Fries', total: '$24.99', status: 'Delivered' },
  { id: '#ORD-1025', customer: 'Sarah Smith', items: 'Margherita Pizza', total: '$19.99', status: 'Preparing' },
  { id: '#ORD-1026', customer: 'Mike Chen', items: 'Nashville Chicken, Shake', total: '$28.50', status: 'Out for Delivery' },
  { id: '#ORD-1027', customer: 'Emily Davis', items: 'Truffle Pasta', total: '$16.99', status: 'Pending' },
  { id: '#ORD-1028', customer: 'Alex Kumar', items: 'Lava Cake, Coffee', total: '$14.50', status: 'Delivered' },
]

const statusClass = {
  'Pending': 'badge-pending',
  'Preparing': 'badge-preparing',
  'Out for Delivery': 'badge-delivery',
  'Delivered': 'badge-delivered',
}

export default function AdminOverview() {
  return (
    <>
      <div className="admin-metrics">
        {metrics.map((m, i) => (
          <div className="admin-metric-card" key={i}>
            <div className="admin-metric-icon" style={{ background: `${m.color}18`, color: m.color }}>
              <i className={`fas ${m.icon}`}></i>
            </div>
            <div className="admin-metric-info">
              <span className="admin-metric-value">{m.value}</span>
              <span className="admin-metric-label">{m.label}</span>
            </div>
            <span className="admin-metric-change">{m.change}</span>
          </div>
        ))}
      </div>

      <div className="admin-charts-row">
        <div className="admin-chart-card" style={{ flex: 2 }}>
          <div className="admin-card-header"><h3>Monthly Revenue</h3></div>
          <div className="admin-chart-placeholder">
            <svg viewBox="0 0 400 160" className="chart-svg">
              <polyline fill="none" stroke="var(--primary)" strokeWidth="3" points="0,120 40,100 80,110 120,60 160,80 200,30 240,50 280,20 320,35 360,10 400,15" />
              <polyline fill="none" stroke="var(--secondary)" strokeWidth="2" strokeDasharray="6,4" points="0,130 40,125 80,115 120,100 160,95 200,70 240,65 280,45 320,40 360,30 400,25" />
            </svg>
            <div className="chart-legend"><span><i className="fas fa-circle" style={{ color: 'var(--primary)' }}></i> 2026</span><span><i className="fas fa-circle" style={{ color: 'var(--secondary)' }}></i> 2025</span></div>
          </div>
        </div>
        <div className="admin-chart-card" style={{ flex: 1 }}>
          <div className="admin-card-header"><h3>Order Analytics</h3></div>
          <div className="admin-donut-wrap">
            <svg viewBox="0 0 120 120" className="donut-svg">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#f0f0f0" strokeWidth="14" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--primary)" strokeWidth="14" strokeDasharray="125 190" strokeDashoffset="0" transform="rotate(-90 60 60)" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--secondary)" strokeWidth="14" strokeDasharray="80 235" strokeDashoffset="-125" transform="rotate(-90 60 60)" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--green)" strokeWidth="14" strokeDasharray="55 260" strokeDashoffset="-205" transform="rotate(-90 60 60)" />
            </svg>
            <div className="donut-center">1,248</div>
            <div className="donut-legend">
              <span><i className="fas fa-circle" style={{ color: 'var(--primary)' }}></i> Delivered (52%)</span>
              <span><i className="fas fa-circle" style={{ color: 'var(--secondary)' }}></i> Active (33%)</span>
              <span><i className="fas fa-circle" style={{ color: 'var(--green)' }}></i> Pending (15%)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header"><h3>Recent Orders</h3></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {recentOrders.map((o, i) => (
                <tr key={i}>
                  <td className="td-id">{o.id}</td>
                  <td>{o.customer}</td>
                  <td>{o.items}</td>
                  <td className="td-price">{o.total}</td>
                  <td><span className={`admin-badge ${statusClass[o.status]}`}>{o.status}</span></td>
                  <td><button className="admin-btn-sm"><i className="fas fa-eye"></i></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
