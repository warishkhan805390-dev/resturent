import { useState, useEffect, useRef } from "react";

const categories = [
  { cat: "all", label: "All Items", img: "/img/menu/1.jpg" },
  { cat: "burgers", label: "Burgers", img: "/img/menu/1.jpg" },
  { cat: "pizza", label: "Pizza", img: "/img/menu/2.jpg" },
  { cat: "chicken", label: "Chicken", img: "/img/menu/3.jpg" },
  { cat: "wraps", label: "Wraps", img: "/img/menu/4.jpg" },
  { cat: "pasta", label: "Pasta", img: "/img/menu/5.jpg" },
  { cat: "desserts", label: "Desserts", img: "/img/menu/6.jpg" },
];

const trends = [
  "Smash Burger", "Nashville Chicken", "Truffle Pizza",
  "Lava Cake", "Loaded Fries", "Mango Shake"
];

export default function Navbar({ onFilter }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [navOpen, setNavOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    const handle = (e) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 220);
  }, [searchOpen]);

  const handleSearchCat = (cat) => {
    setActiveCat(cat);
    setSearchOpen(false);
    onFilter(cat);
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    setNavOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg${scrolled ? " scrolled" : ""}`} id="nav">
        <div className="container">
          <a className="navbar-brand" href="#">
            <div className="blogo">
              <div className="bico"><i className="fas fa-utensils"></i></div>
              <div>
                <div className="bname">Sar<span>ab</span></div>
                <div className="bsub">Fast Food & Restaurant</div>
              </div>
            </div>
          </a>
          <button
            className={`navbar-toggler border-0${navOpen ? "" : " collapsed"}`}
            type="button"
            onClick={() => setNavOpen(!navOpen)}
          >
            <i className="fas fa-bars" style={{ color: "var(--primary)", fontSize: "1.35rem" }}></i>
          </button>
          <div className={`collapse navbar-collapse${navOpen ? " show" : ""}`} id="navmenu">
            <ul className="navbar-nav mx-auto">
              {["hero", "about", "menu", "chefs", "reservation", "testimonials", "contact-section"].map((id) => (
                <li className="nav-item" key={id}>
                  <a className="nav-link" href={`#${id}`} onClick={(e) => handleSmoothScroll(e, `#${id}`)}>
                    {id === "hero" ? "Home" : id === "contact-section" ? "Contact" : id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="d-flex align-items-center gap-1">
              <button id="navSearchBtn" title="Search" onClick={() => setSearchOpen(true)}>
                <i className="fas fa-search"></i>
              </button>
              <a href="#menu" className="nav-link nav-cta" onClick={(e) => handleSmoothScroll(e, "#menu")}>
                <i className="fas fa-shopping-bag me-1"></i>Order Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div id="searchOv" className={searchOpen ? "open" : ""} onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}>
        <button className="sovclose" onClick={() => setSearchOpen(false)}><i className="fas fa-times"></i></button>
        <div className="sovbox">
          <h4>What are you craving today?</h4>
          <div className="sovinput">
            <input type="text" ref={searchRef} value={searchVal} onChange={(e) => setSearchVal(e.target.value)} placeholder="Search burgers, pizza, chicken..." autoComplete="off" />
            <button><i className="fas fa-search"></i></button>
          </div>
          <div className="sovcats">
            {categories.map((c) => (
              <div key={c.cat} className={`sovcat${activeCat === c.cat ? " active" : ""}`} onClick={() => handleSearchCat(c.cat)}>
                <img src={c.img} alt="" />{c.label}
              </div>
            ))}
          </div>
          <div className="sovtrend">
            <p><i className="fas fa-fire me-1" style={{ color: "var(--secondary)" }}></i>Trending Searches</p>
            {trends.map((t) => (
              <span className="ttag" key={t} onClick={() => setSearchVal(t)}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
