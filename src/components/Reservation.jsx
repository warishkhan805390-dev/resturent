import { useState, useRef } from 'react'

export default function Reservation() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef()

  const handleSubmit = async () => {
    const form = formRef.current
    const data = {
      name: form.querySelector('[name="name"]').value,
      phone: form.querySelector('[name="phone"]').value,
      email: form.querySelector('[name="email"]').value,
      guests: form.querySelector('[name="guests"]').value,
      date: form.querySelector('[name="date"]').value,
      time: form.querySelector('[name="time"]').value,
      requests: form.querySelector('[name="requests"]').value,
    }
    if (!data.name || !data.phone || !data.email || !data.guests || !data.date || !data.time) {
      setError('Please fill in all required fields')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="reservation">
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="slbl">Book a Table</span>
          <h2 className="stitle">Make a <span>Reservation</span></h2>
          <div className="sline"></div>
          <p className="sdesc mx-auto" style={{ maxWidth: 480 }}>Reserve your table for a memorable dining experience. We recommend booking 24 hours in advance for weekend evenings.</p>
        </div>
        <div className="row g-4 align-items-start">
          <div className="col-lg-4" data-aos="fade-right">
            <div style={{ background: 'var(--dark)', borderRadius: 18, padding: 36 }}>
              <h4 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: 8 }}>Contact Info</h4>
              <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '.85rem', marginBottom: 26 }}>We're happy to help you plan the perfect dining experience.</p>
              <div className="d-flex flex-column gap-3">
                {[
                  { icon: 'fa-clock', label: 'Opening Hours', val: 'Wed - Sun, 9 AM - 11 PM' },
                  { icon: 'fa-phone-alt', label: 'Call for Booking', val: '+1 (800) 123-4567' },
                  { icon: 'fa-users', label: 'Group Dining', val: 'Special menus for 10+ guests' },
                  { icon: 'fa-map-marker-alt', label: 'Location', val: '42 Flavor Street, NY' },
                ].map((f, i) => (
                  <div className="d-flex align-items-center gap-3" key={i}>
                    <div style={{ width: 46, height: 46, borderRadius: 11, background: 'rgba(232,40,26,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.1rem', flexShrink: 0 }}>
                      <i className={`fas ${f.icon}`}></i>
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: '#ccc', fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '.8px' }}>{f.label}</strong>
                      <span style={{ color: '#fff', fontSize: '.87rem' }}>{f.val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-8" data-aos="fade-left">
            <div className="fcard">
              <div className="row g-3" ref={formRef}>
                <div className="col-sm-6">
                  <label className="flbl">Full Name *</label>
                  <input type="text" name="name" className="fctrl" placeholder="John Doe" />
                </div>
                <div className="col-sm-6">
                  <label className="flbl">Phone Number *</label>
                  <input type="tel" name="phone" className="fctrl" placeholder="+1 (800) 000-0000" />
                </div>
                <div className="col-sm-6">
                  <label className="flbl">Email Address *</label>
                  <input type="email" name="email" className="fctrl" placeholder="you@email.com" />
                </div>
                <div className="col-sm-6">
                  <label className="flbl">Number of Guests *</label>
                  <select name="guests" className="fctrl">
                    {['1 Person', '2 People', '3 - 4 People', '5 - 6 People', '7 -10 People', '10+ People'].map((o, i) => (
                      <option key={i}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-6">
                  <label className="flbl">Date *</label>
                  <input type="date" name="date" className="fctrl" />
                </div>
                <div className="col-sm-6">
                  <label className="flbl">Time *</label>
                  <select name="time" className="fctrl">
                    {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM'].map((o, i) => (
                      <option key={i}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="col-12">
                  <label className="flbl">Special Requests</label>
                  <textarea name="requests" className="fctrl" rows="3" placeholder="Allergies, dietary needs, special occasions..."></textarea>
                </div>
                {error && <div className="col-12"><p style={{ color: 'var(--primary)', fontSize: '.85rem' }}>{error}</p></div>}
                <div className="col-12">
                  <button className="btn-red w-100 justify-content-center" disabled={loading} onClick={handleSubmit}>
                    <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-calendar-check'}`}></i>
                    {loading ? ' Booking...' : 'Confirm Reservation'}
                  </button>
                </div>
              </div>
              <div className="sucmsg" style={{ display: submitted ? 'block' : 'none' }} id="resOk">
                <i className="fas fa-check-circle"></i>
                <p>Table reserved! We'll confirm via email shortly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
