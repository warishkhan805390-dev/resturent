import { useEffect, useRef } from "react";

const features = [
  { icon: "fa-leaf", cls: "r", title: "100% Fresh Ingredients", desc: "We source locally and sustainably. Every ingredient is hand-picked daily for maximum freshness." },
  { icon: "fa-award", cls: "y", title: "Award-Winning Recipes", desc: "Our signature recipes have won national culinary awards 5 years in a row." },
  { icon: "fa-shipping-fast", cls: "g", title: "Lightning-Fast Delivery", desc: "Order online and get hot, fresh food at your door in under 25 minutes, guaranteed." },
];

export default function About() {
  const counterRef = useRef(false);

  useEffect(() => {
    const handle = () => {
      const hero = document.getElementById("hero");
      if (!counterRef.current && hero && window.scrollY > hero.offsetHeight - 300) {
        counterRef.current = true;
        document.querySelectorAll(".snum").forEach((el) => {
          const txt = el.textContent;
          const num = parseInt(txt);
          if (isNaN(num)) return;
          const suf = txt.replace(/[0-9]/g, "");
          let start = 0;
          const step = Math.ceil(num / 55);
          const iv = setInterval(() => {
            start += step;
            if (start >= num) { start = num; clearInterval(iv); }
            el.textContent = start + suf;
          }, 1400 / 55);
        });
      }
    };
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <section id="about">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-5" data-aos="fade-right">
            <div className="astack">
              <div className="aexp"><span className="anum">12+</span><small>Years of<br />Excellence</small></div>
              <div className="amain"><img src="/img/about1.jpg" alt="Restaurant" /></div>
              <div className="asm"><img src="/img/about2.jpg" alt="" /></div>
            </div>
          </div>
          <div className="col-lg-7" data-aos="fade-left">
            <span className="slbl">Our Story</span>
            <h2 className="stitle text-start">We Invite You to Visit<br />Our <span>Food Restaurant</span></h2>
            <div className="sline lft"></div>
            <p className="sdesc mb-4">Founded in 2012, Sarab began as a small corner joint with a big dream - to serve food that brings people together. Today we're proud to serve thousands of happy customers every week with the same passion that started it all.</p>
            <div className="mb-4">
              {features.map((f, i) => (
                <div className="fti" key={i}>
                  <div className={`ftico ${f.cls}`}><i className={`fas ${f.icon}`}></i></div>
                  <div>
                    <h6>{f.title}</h6>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="#menu" className="btn-red"><i className="fas fa-book-open"></i>View Full Menu</a>
          </div>
        </div>
      </div>
    </section>
  );
}
