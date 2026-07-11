import { useState, useEffect } from 'react'

export default function MenuPopup({ item, onClose, cartCount, setCartCount }) {
  const [qty, setQty] = useState(1)

  useEffect(() => {
    setQty(1)
  }, [item])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    if (item) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKey)
    }
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKey)
    }
  }, [item, onClose])

  if (!item) return null

  const full = Math.round(parseFloat(item.rating))
  const stars = '<i class="fas fa-star"></i>'.repeat(full) +
    '☆'.repeat(5 - full) +
    ` <span style="color:#bbb;font-size:.78rem;">${item.rating} (${item.reviews} reviews)</span>`

  return (
    <div id="menuPop" className="open" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="mpbox">
        <button className="mpclose" id="mpClose" onClick={onClose}><i className="fas fa-times"></i></button>
        <div className="mpimg"><img src={item.img} alt={item.title} /></div>
        <div className="mpbody">
          <div id="mpCat">{item.cat}</div>
          <div id="mpTitle">{item.title}</div>
          <div id="mpStars" dangerouslySetInnerHTML={{ __html: stars }} />
          <div id="mpDesc">{item.desc}</div>
          <div id="mpPrice">
            {item.price}
            {item.oldPrice && <small style={{ color: '#ccc', textDecoration: 'line-through', marginLeft: 8, fontSize: '1rem' }}>{item.oldPrice}</small>}
          </div>
          <div className="mpmeta" id="mpMeta">
            {[
              { val: `${item.cal} kcal`, lbl: 'Calories' },
              { val: `${item.time} min`, lbl: 'Prep Time' },
              { val: `${item.rating}/5`, lbl: 'Rating' },
            ].map((m, i) => (
              <div className="mpm" key={i}>
                <div className="mpmv">{m.val}</div>
                <div className="mpml">{m.lbl}</div>
              </div>
            ))}
          </div>
          <div className="mpqty">
            <button className="mpqbtn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
            <span className="mpqnum">{qty}</span>
            <button className="mpqbtn" onClick={() => setQty(qty + 1)}>+</button>
            <span style={{ fontSize: '.82rem', color: '#aaa', marginLeft: 9 }}>portion</span>
          </div>
          <div className="mptags">
            {item.tags?.split(',').filter(Boolean).map((t, i) => (
              <span className="mptag" key={i}>{t.trim()}</span>
            ))}
          </div>
          <button className="mpaddcart" onClick={() => {
            setCartCount(cartCount + qty)
            const btn = document.querySelector('.mpaddcart')
            if (btn) {
              btn.innerHTML = '<i class="fas fa-check"></i> Added to Cart!'
              btn.style.background = 'linear-gradient(135deg,var(--green),#1a4a35)'
              setTimeout(() => {
                onClose()
                btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart'
                btn.style.background = ''
              }, 1000)
            }
          }}>
            <i className="fas fa-shopping-cart"></i>Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
