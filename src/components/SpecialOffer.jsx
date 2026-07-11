import { useState, useEffect } from "react";

export default function SpecialOffer() {
  const [time, setTime] = useState({ h: 8, m: 45, s: 30 });

  useEffect(() => {
    const iv = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 8; m = 45; s = 30; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section id="special">
      <div className="spbg"></div>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="row align-items-center g-5">
          <div className="col-lg-6" data-aos="fade-right">
            <div className="sptag"><i className="fas fa-bolt me-1"></i>Limited Time Offer</div>
            <h2 className="sptitle">Get 30% Off<br />Our Signature<br /><span>Burger</span> Meal</h2>
            <p className="spdesc">Don't miss our weekend special - grab our award-winning signature burger combo with loaded fries and a premium shake at an unbeatable price.</p>
            <div className="cdwrap">
              <div className="cditem"><span className="cdnum">{pad(time.h)}</span><span className="cdlbl">Hours</span></div>
              <div className="cditem"><span className="cdnum">{pad(time.m)}</span><span className="cdlbl">Minutes</span></div>
              <div className="cditem"><span className="cdnum">{pad(time.s)}</span><span className="cdlbl">Seconds</span></div>
            </div>
            <a href="#menu" className="btn-red"><i className="fas fa-shopping-cart"></i>Grab the Deal</a>
          </div>
          <div className="col-lg-6" data-aos="fade-left">
            <div className="spimgw">
              <div className="spglow"></div>
              <div className="sppbdg"><span className="old">$24.99</span><span className="np">$17.49</span></div>
              <img src="/img/off-img.jpg" alt="Special Burger" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
