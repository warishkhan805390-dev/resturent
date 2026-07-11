export default function Hours() {
  return (
    <section id="hours">
      <div className="hrsbg"></div>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="slbl" style={{ color: "#a5d6bc" }}>Opening Hours</span>
          <h2 className="stitle" style={{ color: "#fff" }}>We're Open <span style={{ color: "var(--secondary)" }}>For You</span></h2>
          <div className="sline"></div>
        </div>
        <div className="row g-4 align-items-start">
          <div className="col-lg-5" data-aos="fade-right">
            <div className="hrscard">
              {[
                { day: "Monday - Tuesday", time: "Closed", dot: "off" },
                { day: "Wednesday - Thursday", time: "09:00 AM - 10:00 PM", dot: "on" },
                { day: "Friday", time: "09:00 AM - 11:00 PM", dot: "on" },
                { day: "Saturday", time: "10:00 AM - 11:30 PM", dot: "on" },
                { day: "Sunday", time: "11:00 AM - 09:00 PM", dot: "on" },
              ].map((r) => (
                <div className="hrsrow" key={r.day}>
                  <span className="hrsday"><i className="fas fa-calendar-day me-2" style={{ color: "var(--secondary)" }}></i>{r.day}</span>
                  <div className="d-flex align-items-center gap-2">
                    <div className={`hdot ${r.dot}`}></div>
                    <span className="hrstime" style={r.dot === "off" ? { color: "#ff6b6b" } : {}}>{r.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-3" data-aos="zoom-in">
            <div className="hrscta">
              <i className="fas fa-truck-fast fa-2x mb-3" style={{ color: "rgba(255,255,255,.8)" }}></i>
              <h4>Order Online</h4>
              <p>Get hot food delivered in 25 minutes</p>
              <a href="#menu" className="btnw">Order Now <i className="fas fa-arrow-right ms-1"></i></a>
            </div>
          </div>
          <div className="col-lg-4" data-aos="fade-left">
            <div className="hrscard">
              <h5 style={{ color: "#fff", marginBottom: 18, fontFamily: "'Poppins',sans-serif", fontSize: ".95rem", fontWeight: 700 }}>
                <i className="fas fa-map-marker-alt me-2" style={{ color: "var(--secondary)" }}></i>Find Us
              </h5>
              <div className="hrsrow">
                <span className="hrsday"><i className="fas fa-location-dot me-2" style={{ color: "var(--secondary)" }}></i>Address</span>
                <span className="hrstime" style={{ fontSize: ".8rem" }}>42 Flavor Street, NY</span>
              </div>
              <div className="hrsrow">
                <span className="hrsday"><i className="fas fa-phone me-2" style={{ color: "var(--secondary)" }}></i>Phone</span>
                <span className="hrstime" style={{ fontSize: ".8rem" }}>+1 (800) 123-4567</span>
              </div>
              <div className="hrsrow">
                <span className="hrsday"><i className="fas fa-envelope me-2" style={{ color: "var(--secondary)" }}></i>Email</span>
                <span className="hrstime" style={{ fontSize: ".8rem" }}>hello@sarabfood.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
