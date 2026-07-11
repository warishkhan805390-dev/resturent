export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-4">
            <div className="fnm">Sar<span>ab</span></div>
            <p className="fdesc">We bring the world's finest flavors together in a fast, friendly, and affordable experience. Every meal crafted with love.</p>
            <div className="fsoc">
              {["facebook-f", "instagram", "twitter", "youtube", "tiktok"].map((s) => (
                <a href="#" key={s}><i className={`fab fa-${s}`}></i></a>
              ))}
            </div>
          </div>
          <div className="col-sm-6 col-lg-2">
            <div className="ftit">Quick Links</div>
            <ul className="flinks ps-0">
              {[
                { href: "#hero", label: "Home" },
                { href: "#about", label: "About Us" },
                { href: "#menu", label: "Our Menu" },
                { href: "#reservation", label: "Reservation" },
                { href: "#blog", label: "Blog" },
                { href: "#contact-section", label: "Contact" },
              ].map((link) => (
                <li key={link.href}><a href={link.href}><i className="fas fa-chevron-right"></i>{link.label}</a></li>
              ))}
            </ul>
          </div>
          <div className="col-sm-6 col-lg-2">
            <div className="ftit">Our Menu</div>
            <ul className="flinks ps-0">
              {["Burgers", "Pizza", "Fried Chicken", "Wraps & Rolls", "Pasta", "Desserts"].map((m) => (
                <li key={m}><a href="#menu"><i className="fas fa-chevron-right"></i>{m}</a></li>
              ))}
            </ul>
          </div>
          <div className="col-lg-4">
            <div className="ftit">Get In Touch</div>
            {[
              { icon: "fa-map-marker-alt", label: "Address", val: "42 Flavor Street, Manhattan, NY 10001" },
              { icon: "fa-phone-alt", label: "Phone", val: "+1 (800) 123-4567" },
              { icon: "fa-envelope", label: "Email", val: "hello@sarabfood.com" },
              { icon: "fa-clock", label: "Hours", val: "Wed - Sun: 09 AM - 11 PM" },
            ].map((item) => (
              <div className="fci" key={item.label}>
                <div className="fciico"><i className={`fas ${item.icon}`}></i></div>
                <div className="fciinfo"><strong>{item.label}</strong>{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="fbot">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <p>&copy; 2026 <span>Sarab Restaurant</span>. All Rights Reserved by <a target="_blank" className="mx-0 fw-bold text-success" href="https://bestwpware.com/">Bestwpware</a>. Made with <span><i className="fas fa-heart"></i></span>  <br />Distributed by <a target="_blank" className="mx-0 fw-bold text-success" href="https://themewagon.com">ThemeWagon</a></p>
            <div>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
