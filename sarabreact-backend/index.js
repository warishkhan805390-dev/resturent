require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

const Reservation = require('./models/Reservation')
const Contact = require('./models/Contact')
const Newsletter = require('./models/Newsletter')

const app = express()
const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI
const DATA_DIR = path.join(__dirname, 'data')
const STATIC_DIR = process.env.STATIC_DIR || path.join(__dirname, '..', 'sarabreact-frontend', 'dist')

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }))
app.use(express.json())

/* ── MongoDB connection ── */
let useMongo = false
if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => { useMongo = true; console.log('MongoDB connected') })
    .catch(err => console.warn('MongoDB connection failed, using JSON file storage:', err.message))
} else {
  console.log('MONGO_URI not set, using JSON file storage')
}

/* ── JSON file helpers (fallback) ── */
function readStore(name) {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, `${name}.json`), 'utf-8'))
  } catch { return [] }
}
function writeStore(name, data) {
  fs.writeFileSync(path.join(DATA_DIR, `${name}.json`), JSON.stringify(data, null, 2))
}

/* ── RESERVATIONS ── */
app.post('/api/reservations', async (req, res) => {
  const { name, phone, email, guests, date, time, requests } = req.body
  if (!name || !phone || !email || !guests || !date || !time) {
    return res.status(400).json({ error: 'Name, phone, email, guests, date, and time are required' })
  }
  if (useMongo) {
    try {
      const reservation = await Reservation.create({ name, phone, email, guests, date, time, requests })
      return res.status(201).json({ message: "Table reserved! We'll confirm via email shortly.", reservation })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
  const reservations = readStore('reservations')
  const reservation = { id: reservations.length + 1, name, phone, email, guests, date, time, requests: requests || '', createdAt: new Date().toISOString() }
  reservations.push(reservation)
  writeStore('reservations', reservations)
  res.status(201).json({ message: "Table reserved! We'll confirm via email shortly.", reservation })
})

/* ── CONTACT MESSAGES ── */
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Name, email, subject, and message are required' })
  }
  if (useMongo) {
    try {
      const contact = await Contact.create({ name, email, phone, subject, message })
      return res.status(201).json({ message: "Message sent! We'll reply within 2 hours.", contact })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
  const contacts = readStore('contacts')
  const contact = { id: contacts.length + 1, name, email, phone: phone || '', subject, message, createdAt: new Date().toISOString() }
  contacts.push(contact)
  writeStore('contacts', contacts)
  res.status(201).json({ message: "Message sent! We'll reply within 2 hours.", contact })
})

/* ── NEWSLETTER ── */
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }
  if (useMongo) {
    try {
      const exists = await Newsletter.findOne({ email })
      if (exists) return res.status(409).json({ error: 'This email is already subscribed' })
      const subscription = await Newsletter.create({ email })
      return res.status(201).json({ message: 'Subscribed successfully! Check your inbox for deals.', subscription })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
  const newsletters = readStore('newsletters')
  if (newsletters.find(n => n.email === email)) {
    return res.status(409).json({ error: 'This email is already subscribed' })
  }
  const subscription = { id: newsletters.length + 1, email, createdAt: new Date().toISOString() }
  newsletters.push(subscription)
  writeStore('newsletters', newsletters)
  res.status(201).json({ message: 'Subscribed successfully! Check your inbox for deals.', subscription })
})

/* ── HEALTH ── */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), db: useMongo ? 'mongodb' : 'json' })
})

/* ── SERVE FRONTEND BUILD ── */
if (fs.existsSync(STATIC_DIR)) {
  app.use(express.static(STATIC_DIR))
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) res.sendFile(path.join(STATIC_DIR, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Sarab API running on http://localhost:${PORT}`)
  console.log(`Storage: ${useMongo ? 'MongoDB' : 'JSON files'}`)
  if (fs.existsSync(STATIC_DIR)) console.log(`Serving frontend from ${STATIC_DIR}`)
})
