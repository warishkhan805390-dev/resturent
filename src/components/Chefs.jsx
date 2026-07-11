const chefs = [
  { name: "Alice Mortal", role: "Head Chef", exp: "12 years experience", img: "/img/chefs/1.jpg" },
  { name: "Michael Corn", role: "Grill Master", exp: "8 years experience", img: "/img/chefs/2.jpg" },
  { name: "Faz Chowdel", role: "Pastry Chef", exp: "10 years experience", img: "/img/chefs/3.jpg" },
  { name: "William Latnum", role: "Pizza Artisan", exp: "9 years experience", img: "/img/chefs/4.jpg" },
];

export default function Chefs() {
  return (
    <section id="chefs">
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="slbl">The Culinary Team</span>
          <h2 className="stitle">Meet Our Expert <span>Chefs</span></h2>
          <div className="sline"></div>
        </div>
        <div className="row g-4">
          {chefs.map((ch, i) => (
            <div className="col-sm-6 col-lg-3" key={ch.name} data-aos="fade-up" data-aos-delay={i * 80}>
              <div className="chcard">
                <div className="chimg">
                  <img src={ch.img} alt="" />
                  <div className="chsoc">
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                  </div>
                </div>
                <div className="chbody">
                  <div className="chnm">{ch.name}</div>
                  <div className="chrole">{ch.role}</div>
                  <div className="chexp">{ch.exp}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
