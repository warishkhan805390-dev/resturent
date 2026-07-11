const transactions = [
  { id: 'TXN-001', method: 'UPI', amount: '$24.99', status: 'Success' },
  { id: 'TXN-002', method: 'Credit Card', amount: '$19.99', status: 'Success' },
  { id: 'TXN-003', method: 'COD', amount: '$28.50', status: 'Pending' },
  { id: 'TXN-004', method: 'Net Banking', amount: '$16.99', status: 'Failed' },
  { id: 'TXN-005', method: 'UPI', amount: '$14.50', status: 'Refunded' },
  { id: 'TXN-006', method: 'Debit Card', amount: '$22.50', status: 'Success' },
]

const statusBadge = {
  'Success': 'badge-delivered',
  'Pending': 'badge-pending',
  'Failed': 'badge-pending',
  'Refunded': 'badge-preparing',
}

export default function AdminPayments() {
  return (
    <>
      <div className="admin-card" style={{ marginBottom: 24 }}>
        <div className="admin-card-header"><h3>Payment Transactions</h3></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Transaction ID</th><th>Payment Method</th><th>Amount</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i}>
                  <td className="td-id">{t.id}</td>
                  <td><i className={`fas ${t.method === 'UPI' ? 'fa-mobile-alt' : t.method === 'COD' ? 'fa-money-bill-wave' : 'fa-credit-card'} me-2`}></i>{t.method}</td>
                  <td className="td-price">{t.amount}</td>
                  <td><span className={`admin-badge ${statusBadge[t.status]}`}>{t.status}</span></td>
                  <td><button className="admin-btn-sm"><i className="fas fa-receipt"></i></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header"><h3>Payment Gateway Settings</h3></div>
        <div className="admin-gateways">
          {[
            { name: 'Razorpay', key: 'rzp_live_****************', status: 'Active', color: 'var(--primary)' },
            { name: 'Paytm', key: 'Not configured', status: 'Inactive', color: '#3b82f6' },
            { name: 'Stripe', key: 'sk_live_****************', status: 'Active', color: '#8b5cf6' },
          ].map((g, i) => (
            <div className="admin-gateway-card" key={i}>
              <div className="gateway-top">
                <div className="gateway-icon" style={{ background: `${g.color}18`, color: g.color }}>
                  <i className="fas fa-university"></i>
                </div>
                <div>
                  <div className="gateway-name">{g.name}</div>
                  <div className="gateway-key">{g.key}</div>
                </div>
              </div>
              <div className="gateway-bottom">
                <span className={`gateway-status ${g.status === 'Active' ? 'status-active' : 'status-inactive'}`}>{g.status}</span>
                <label className="admin-toggle">
                  <input type="checkbox" defaultChecked={g.status === 'Active'} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="admin-field" style={{ marginTop: 20 }}>
          <label>Default Currency</label>
          <select defaultValue="USD">
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>INR (₹)</option>
            <option>GBP (£)</option>
          </select>
        </div>
      </div>
    </>
  )
}
