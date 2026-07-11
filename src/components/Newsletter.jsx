import { useState, useRef } from 'react'

export default function Newsletter() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const inputRef = useRef()

  const handleSubscribe = async () => {
    const email = inputRef.current?.value
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }
    setError('')
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setStatus('success')
      inputRef.current.value = ''
      setTimeout(() => setStatus('idle'), 3000)
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  return (
    <section id="newsletter">
      <div className="nlbg"></div>
      <div className="container">
        <div className="nlw text-center" data-aos="zoom-in">
          <span className="slbl" style={{ color: 'rgba(255,255,255,.7)' }}>Stay Connected</span>
          <h2 className="mb-3" style={{ color: '#fff' }}>Subscribe & Get Exclusive <span style={{ color: 'var(--secondary)' }}>Deals</span></h2>
          <p className="mb-4" style={{ color: 'rgba(255,255,255,.78)' }}>Get 15% off your first order plus early access to new menu items</p>
          <div className="nl-form-wrap">
            <input className="nlinput" type="email" ref={inputRef} placeholder="Enter your email address..." />
            <button
              className="nlbtn"
              disabled={status === 'loading'}
              style={status === 'success' ? { background: '#4ade80', color: '#222' } : {}}
              onClick={handleSubscribe}
            >
              <i className="fas fa-paper-plane me-1"></i>
              {status === 'loading' ? 'Subscribing...' : status === 'success' ? '✓ Subscribed!' : 'Subscribe'}
            </button>
          </div>
          {error && <p style={{ color: '#ff6b6b', fontSize: '.8rem', marginTop: 8 }}>{error}</p>}
          <p style={{ color: 'rgba(255,255,255,.45)', fontSize: '.76rem', marginTop: 11 }}>
            <i className="fas fa-lock me-1"></i>No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
