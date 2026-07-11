import { useState, useRef } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef()

  const handleSend = async () => {
    const form = formRef.current
    const data = {
      name: form.querySelector('[name="name"]').value,
      email: form.querySelector('[name="email"]').value,
      phone: form.querySelector('[name="phone"]').value,
      subject: form.querySelector('[name="subject"]').value,
      message: form.querySelector('[name="message"]').value,
    }
    if (!data.name || !data.email || !data.subject || !data.message) {
      setError('Please fill in all required fields')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setSent(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact-section">
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="slbl">Get In Touch</span>
          <h2 className="stitle">Contact <span>Us</span></h2>
          <div className="sline"></div>
          <p className="sdesc mx-auto" style={{ maxWidth: 480 }}>Have a question, feedback, or want to plan a special event? We'd love to hear from you.</p>
        </div>
        <div className="row g-4">
          <div className="col-lg-4" data-aos="fade-right">
            <div className="ctdark">
              <h4>Let's Talk</h4>
              <p className="ctsub">We typically respond within 2 hours during business hours.</p>
              {[
                { icon: 'fa-map-marker-alt', label: 'Address', val: '42 Flavor Street, Manhattan,\nNew York, NY 10001' },
                { icon: 'fa-phone-alt', label: 'Phone', val: '+1 (800) 123-4567' },
                { icon: 'fa-envelope', label: 'Email', val: 'hello@sarabfood.com' },
                { icon: 'fa-clock', label: 'Working Hours', val: 'Wed - Sun: 9 AM - 11 PM' },
              ].map((f, i) => (
                <div className="ctitem" key={i}>
                  <div className="cticon"><i className={`fas ${f.icon}`}></i></div>
                  <div className="ctinfo">
                    <strong>{f.label}</strong>
                    <span>{f.val.split('\n').map((l, j) => <span key={j}>{l}<br /></span>)}</span>
                  </div>
                </div>
              ))}
              <div className="ctsocrow">
                {['facebook-f', 'instagram', 'twitter', 'youtube'].map((s) => (
                  <a href="#" key={s}><i className={`fab fa-${s}`}></i></a>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-8" data-aos="fade-left">
            <div className="fcard">
              <div className="row g-3" ref={formRef}>
                <div className="col-sm-6">
                  <label className="flbl">Your Name *</label>
                  <input type="text" name="name" className="fctrl" placeholder="John Doe" />
                </div>
                <div className="col-sm-6">
                  <label className="flbl">Email Address *</label>
                  <input type="email" name="email" className="fctrl" placeholder="you@email.com" />
                </div>
                <div className="col-sm-6">
                  <label className="flbl">Phone Number</label>
                  <input type="tel" name="phone" className="fctrl" placeholder="+1 (800) 000-0000" />
                </div>
                <div className="col-sm-6">
                  <label className="flbl">Subject *</label>
                  <select name="subject" className="fctrl">
                    {['General Inquiry', 'Catering & Events', 'Feedback', 'Partnership', 'Media & Press'].map((o, i) => (
                      <option key={i}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="col-12">
                  <label className="flbl">Message *</label>
                  <textarea name="message" className="fctrl" rows="5" placeholder="Write your message here..."></textarea>
                </div>
                {error && <div className="col-12"><p style={{ color: 'var(--primary)', fontSize: '.85rem' }}>{error}</p></div>}
                <div className="col-12">
                  <button className="btn-red" disabled={loading} onClick={handleSend}>
                    <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
                    {loading ? ' Sending...' : 'Send Message'}
                  </button>
                </div>
              </div>
              <div className="sucmsg" style={{ display: sent ? 'block' : 'none' }} id="ctcOk">
                <i className="fas fa-check-circle"></i>
                <p>Message sent! We'll reply within 2 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
