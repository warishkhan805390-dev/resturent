import { useEffect } from 'react'

export default function GalleryPopup({ items, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    if (index >= 0) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKey)
    }
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKey)
    }
  }, [index, onClose, onPrev, onNext])

  if (index < 0) return null

  const item = items[index]
  return (
    <div id="galPop" className="open" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="gpbox">
        <button className="gpclose" onClick={onClose}><i className="fas fa-times"></i></button>
        <img src={item.img} alt={item.title} />
        <div className="gpcap">
          <h5>{item.title}</h5>
          <p>{item.desc}</p>
        </div>
        <div className="gpnav">
          <button onClick={onPrev}><i className="fas fa-chevron-left me-1"></i>Prev</button>
          <button onClick={onNext}>Next <i className="fas fa-chevron-right ms-1"></i></button>
        </div>
      </div>
    </div>
  )
}
