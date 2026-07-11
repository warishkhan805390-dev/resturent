import { useState } from 'react'

const stages = [
  { key: 'pending', label: 'New Orders', icon: 'fa-clock', color: '#f59e0b' },
  { key: 'preparing', label: 'Kitchen (Preparing)', icon: 'fa-fire', color: '#3b82f6' },
  { key: 'delivery', label: 'Out for Delivery', icon: 'fa-truck', color: '#8b5cf6' },
  { key: 'completed', label: 'Completed', icon: 'fa-check-circle', color: 'var(--green)' },
]

const deliveries = ['Rahul S.', 'Amit K.', 'Sneha P.', 'Vikram R.']

const initialOrders = [
  { id: 'ORD-1027', customer: 'Emily Davis', items: 'Truffle Pasta, Garlic Bread', total: '$22.50', stage: 'pending', time: '2 min ago', deliveryBoy: '' },
  { id: 'ORD-1029', customer: 'Raj Patel', items: 'Paneer Wrap, Fries', total: '$18.99', stage: 'pending', time: '5 min ago', deliveryBoy: '' },
  { id: 'ORD-1025', customer: 'Sarah Smith', items: 'Margherita Pizza', total: '$19.99', stage: 'preparing', time: '12 min ago', deliveryBoy: '' },
  { id: 'ORD-1030', customer: 'Lisa Wong', items: 'Smash Burger Meal', total: '$24.99', stage: 'preparing', time: '8 min ago', deliveryBoy: '' },
  { id: 'ORD-1026', customer: 'Mike Chen', items: 'Nashville Chicken, Shake', total: '$28.50', stage: 'delivery', time: '22 min ago', deliveryBoy: 'Rahul S.' },
  { id: 'ORD-1028', customer: 'Alex Kumar', items: 'Lava Cake, Coffee', total: '$14.50', stage: 'completed', time: '45 min ago', deliveryBoy: '' },
  { id: 'ORD-1024', customer: 'John Doe', items: 'Smash Burger, Fries', total: '$24.99', stage: 'completed', time: '1 hr ago', deliveryBoy: '' },
]

export default function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders)
  const [view, setView] = useState('kanban')

  const moveOrder = (id, direction) => {
    setOrders(orders.map(o => {
      if (o.id !== id) return o
      const idx = stages.findIndex(s => s.key === o.stage)
      const next = stages[Math.max(0, Math.min(stages.length - 1, idx + direction))]
      return { ...o, stage: next.key }
    }))
  }

  const setDeliveryBoy = (id, boy) => {
    setOrders(orders.map(o => o.id === id ? { ...o, deliveryBoy: boy } : o))
  }

  return (
    <>
      <div className="admin-card-header" style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ margin: 0 }}>Order Management</h3>
        <div className="admin-view-toggle">
          <button className={`admin-view-btn ${view === 'kanban' ? 'active' : ''}`} onClick={() => setView('kanban')}><i className="fas fa-columns"></i> Kanban</button>
          <button className={`admin-view-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}><i className="fas fa-list"></i> List</button>
        </div>
      </div>

      {view === 'kanban' ? (
        <div className="admin-kanban">
          {stages.map((stage) => {
            const stageOrders = orders.filter(o => o.stage === stage.key)
            return (
              <div className="admin-kanban-col" key={stage.key}>
                <div className="kanban-header" style={{ borderColor: stage.color }}>
                  <i className={`fas ${stage.icon}`} style={{ color: stage.color }}></i>
                  <span>{stage.label}</span>
                  <span className="kanban-count">{stageOrders.length}</span>
                </div>
                <div className="kanban-body">
                  {stageOrders.map((o) => (
                    <div className="kanban-card" key={o.id}>
                      <div className="kanban-card-top">
                        <span className="td-id">{o.id}</span>
                        <span className="kanban-time"><i className="far fa-clock"></i> {o.time}</span>
                      </div>
                      <div className="kanban-customer">{o.customer}</div>
                      <div className="kanban-items">{o.items}</div>
                      <div className="kanban-total">{o.total}</div>
                      {stage.key === 'delivery' && (
                        <select className="kanban-select" value={o.deliveryBoy} onChange={e => setDeliveryBoy(o.id, e.target.value)}>
                          <option value="">Assign delivery...</option>
                          {deliveries.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      )}
                      <div className="kanban-actions">
                        {stage.key !== 'pending' && <button className="admin-btn-sm" onClick={() => moveOrder(o.id, -1)}><i className="fas fa-chevron-left"></i></button>}
                        {stage.key !== 'completed' && <button className="admin-btn-sm" onClick={() => moveOrder(o.id, 1)}><i className="fas fa-chevron-right"></i></button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Delivery Boy</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="td-id">{o.id}</td>
                  <td>{o.customer}</td>
                  <td>{o.items}</td>
                  <td className="td-price">{o.total}</td>
                  <td><span className={`admin-badge badge-${o.stage === 'pending' ? 'pending' : o.stage === 'preparing' ? 'preparing' : o.stage === 'delivery' ? 'delivery' : 'delivered'}`}>{stages.find(s => s.key === o.stage)?.label}</span></td>
                  <td>{o.deliveryBoy || '—'}</td>
                  <td>
                    <button className="admin-btn-sm" onClick={() => moveOrder(o.id, -1)} disabled={o.stage === 'pending'}><i className="fas fa-chevron-left"></i></button>
                    <button className="admin-btn-sm" onClick={() => moveOrder(o.id, 1)} disabled={o.stage === 'completed'}><i className="fas fa-chevron-right"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
