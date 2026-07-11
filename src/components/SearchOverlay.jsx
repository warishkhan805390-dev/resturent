import { useRef, useEffect } from 'react'

export default function SearchOverlay({ isOpen, onClose, onFilterMenu }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 220)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKey)
    }
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKey)
    }
  }, [isOpen, onClose])

  const handleTrendClick = (e) => {
    if (inputRef.current) {
      inputRef.current.value = e.currentTarget.textContent.trim()
      inputRef.current.focus()
    }
  }

  const handleCatClick = (f) => {
    onClose()
    setTimeout(() => {
      onFilterMenu(f)
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div id="searchOv" className="open" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <button className="sovclose" id="searchClose" onClick={onClose}><i className="fas fa-times"></i></button>
      <div className="sovbox">
        <h4>What are you craving today?</h4>
        <div className="sovinput">
          <input type="text" ref={inputRef} placeholder="Search burgers, pizza, chicken..." autoComplete="off" />
          <button><i className="fas fa-search"></i></button>
        </div>
        <div className="sovcats">
          {[
            { cat: 'all', label: 'All Items', img: 'img/menu/1.jpg' },
            { cat: 'burgers', label: 'Burgers', img: 'img/menu/1.jpg' },
            { cat: 'pizza', label: 'Pizza', img: 'img/menu/2.jpg' },
            { cat: 'chicken', label: 'Chicken', img: 'img/menu/3.jpg' },
            { cat: 'wraps', label: 'Wraps', img: 'img/menu/4.jpg' },
            { cat: 'pasta', label: 'Pasta', img: 'img/menu/5.jpg' },
            { cat: 'desserts', label: 'Desserts', img: 'img/menu/6.jpg' },
          ].map((c) => (
            <div className="sovcat active" key={c.cat} data-cat={c.cat} onClick={() => handleCatClick(c.cat)}>
              <img src={c.img} alt="" />{c.label}
            </div>
          ))}
        </div>
        <div className="sovtrend">
          <p><i className="fas fa-fire me-1" style={{ color: 'var(--secondary)' }}></i>Trending Searches</p>
          {['Smash Burger', 'Nashville Chicken', 'Truffle Pizza', 'Lava Cake', 'Loaded Fries', 'Mango Shake'].map((t) => (
            <span key={t} className="ttag" onClick={handleTrendClick}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
