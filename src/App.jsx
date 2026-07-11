import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Category from './components/Category'
import About from './components/About'
import Menu from './components/Menu'
import SpecialOffer from './components/SpecialOffer'
import Gallery from './components/Gallery'
import History from './components/History'
import Chefs from './components/Chefs'
import Hours from './components/Hours'
import Testimonials from './components/Testimonials'
import Reservation from './components/Reservation'
import Blog from './components/Blog'
import Newsletter from './components/Newsletter'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import AdminLayout from './admin/AdminLayout'
import AdminOverview from './admin/AdminOverview'
import AdminMenu from './admin/AdminMenu'
import AdminOrders from './admin/AdminOrders'
import AdminPayments from './admin/AdminPayments'
import AdminSettings from './admin/AdminSettings'

function HomePage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [scrolled, setScrolled] = useState(false)
  const [bttVisible, setBttVisible] = useState(false)

  useEffect(() => {
    AOS.init({ duration: 680, once: true, offset: 55 })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY
      setScrolled(sy > 60)
      setBttVisible(sy > 300)
      document.querySelectorAll('section[id]').forEach((sec) => {
        const top = sec.offsetTop - 110
        const bot = top + sec.offsetHeight
        if (sy >= top && sy < bot) {
          document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'))
          const lnk = document.querySelector(`.nav-link[href="#${sec.id}"]`)
          if (lnk) lnk.classList.add('active')
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href')
        if (href === '#') return
        const t = document.querySelector(href)
        if (t) {
          e.preventDefault()
          const navCollapse = document.getElementById('navmenu')
          if (navCollapse?.classList.contains('show')) {
            navCollapse.classList.remove('show')
          }
          setTimeout(() => {
            t.scrollIntoView({ behavior: 'smooth', block: 'start' })
            window.scrollBy(0, -78)
          }, 50)
        }
      })
    })
  }, [])

  return (
    <>
      <TopBar />
      <Navbar onFilter={setActiveFilter} />
      <Hero />
      <Marquee />
      <Category activeFilter={activeFilter} onFilter={setActiveFilter} />
      <About />
      <Menu activeFilter={activeFilter} onFilter={setActiveFilter} />
      <SpecialOffer />
      <Gallery />
      <History />
      <Chefs />
      <Hours />
      <Testimonials />
      <Reservation />
      <Blog />
      <Newsletter />
      <Contact />
      <Footer />
      <BackToTop visible={bttVisible} />
    </>
  )
}

function AdminDashboard() {
  const [page, setPage] = useState('overview')

  const renderPage = () => {
    switch (page) {
      case 'overview': return <AdminOverview />
      case 'menu': return <AdminMenu />
      case 'orders': return <AdminOrders />
      case 'payments': return <AdminPayments />
      case 'settings': return <AdminSettings />
      default: return <AdminOverview />
    }
  }

  return (
    <AdminLayout activePage={page} onNavigate={setPage}>
      {renderPage()}
    </AdminLayout>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}
