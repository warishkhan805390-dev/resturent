import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './assets/css/bootstrap.min.css'
import './assets/css/all.min.css'
import './assets/css/aos.css'
import './assets/css/swiper-bundle.min.css'
import './assets/css/magnific-popup.css'
import './assets/css/style.css'
import './assets/css/admin.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
