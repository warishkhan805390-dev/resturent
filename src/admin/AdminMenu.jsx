import { useState } from 'react'

const initialItems = [
  { id: 1, name: 'Classic Smash Burger', category: 'Non-Veg', price: 14.99, discount: 11.99, stock: true, img: 'img/menu/1.jpg' },
  { id: 2, name: 'Margherita Royale', category: 'Veg', price: 19.99, discount: 16.99, stock: true, img: 'img/menu/2.jpg' },
  { id: 3, name: 'Nashville Hot Chicken', category: 'Non-Veg', price: 12.99, discount: 9.99, stock: true, img: 'img/menu/3.jpg' },
  { id: 4, name: 'Loaded Fajita Wrap', category: 'Veg', price: 10.99, discount: 0, stock: false, img: 'img/menu/4.jpg' },
  { id: 5, name: 'Nutella Lava Cake', category: 'Desserts', price: 8.99, discount: 6.99, stock: true, img: 'img/menu/5.jpg' },
  { id: 6, name: 'Truffle Mushroom Pasta', category: 'Veg', price: 16.99, discount: 0, stock: true, img: 'img/menu/6.jpg' },
]

export default function AdminMenu() {
  const [items, setItems] = useState(initialItems)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', category: 'Veg', price: '', discount: '', desc: '', img: '' })
  const [editId, setEditId] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editId) {
      setItems(items.map(i => i.id === editId ? { ...i, ...form, price: parseFloat(form.price), discount: form.discount ? parseFloat(form.discount) : 0 } : i))
    } else {
      setItems([...items, { id: Date.now(), ...form, price: parseFloat(form.price), discount: form.discount ? parseFloat(form.discount) : 0, stock: true }])
    }
    setForm({ name: '', category: 'Veg', price: '', discount: '', desc: '', img: '' })
    setEditId(null)
    setShowForm(false)
  }

  const handleEdit = (item) => {
    setForm({ name: item.name, category: item.category, price: String(item.price), discount: item.discount ? String(item.discount) : '', desc: '', img: '' })
    setEditId(item.id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Delete this item?')) setItems(items.filter(i => i.id !== id))
  }

  const toggleStock = (id) => {
    setItems(items.map(i => i.id === id ? { ...i, stock: !i.stock } : i))
  }

  return (
    <>
      <div className="admin-card-header" style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ margin: 0 }}>Live Menu ({items.length} items)</h3>
        <button className="admin-btn" onClick={() => { setEditId(null); setForm({ name: '', category: 'Veg', price: '', discount: '', desc: '', img: '' }); setShowForm(true) }}>
          <i className="fas fa-plus"></i> Add Item
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Discount</th><th>Stock</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td><img src={item.img} alt="" className="admin-thumb" /></td>
                <td className="td-name">{item.name}</td>
                <td><span className={`admin-cat-badge ${item.category === 'Non-Veg' ? 'cat-nonveg' : item.category === 'Veg' ? 'cat-veg' : 'cat-dessert'}`}>{item.category}</span></td>
                <td className="td-price">${item.price.toFixed(2)}</td>
                <td>{item.discount ? `$${item.discount.toFixed(2)}` : '—'}</td>
                <td>
                  <label className="admin-toggle">
                    <input type="checkbox" checked={item.stock} onChange={() => toggleStock(item.id)} />
                    <span className="toggle-slider"></span>
                  </label>
                </td>
                <td>
                  <button className="admin-btn-sm" onClick={() => handleEdit(item)}><i className="fas fa-edit"></i></button>
                  <button className="admin-btn-sm admin-btn-danger" onClick={() => handleDelete(item.id)}><i className="fas fa-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editId ? 'Edit Item' : 'Add New Item'}</h3>
              <button className="admin-modal-close" onClick={() => setShowForm(false)}><i className="fas fa-times"></i></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-form-grid">
                <div className="admin-field">
                  <label>Product Name *</label>
                  <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter item name" />
                </div>
                <div className="admin-field">
                  <label>Category *</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    <option>Veg</option>
                    <option>Non-Veg</option>
                    <option>Desserts</option>
                    <option>Drinks</option>
                  </select>
                </div>
                <div className="admin-field">
                  <label>Price ($) *</label>
                  <input type="number" step="0.01" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="0.00" />
                </div>
                <div className="admin-field">
                  <label>Discount Price ($)</label>
                  <input type="number" step="0.01" value={form.discount} onChange={e => setForm({ ...form, discount: e.target.value })} placeholder="0.00" />
                </div>
                <div className="admin-field admin-field-full">
                  <label>Description</label>
                  <textarea rows="3" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} placeholder="Item description..."></textarea>
                </div>
                <div className="admin-field admin-field-full">
                  <label>Image URL</label>
                  <input type="text" value={form.img} onChange={e => setForm({ ...form, img: e.target.value })} placeholder="img/menu/1.jpg" />
                  <div className="admin-upload-zone"><i className="fas fa-cloud-upload-alt"></i> <span>Drop image or click to upload</span></div>
                </div>
              </div>
              <div className="admin-modal-actions">
                <button type="button" className="admin-btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="admin-btn">{editId ? 'Update Item' : 'Add Item'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
