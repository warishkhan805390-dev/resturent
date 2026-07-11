import { useEffect, useRef } from "react";
import { register } from "swiper/element";

register();

const testimonials = [
  { name: "Monica Wilber", role: "Regular Customer", img: "/img/testimonial/1.jpg", text: "Honestly the best burgers I've ever had. The smash burger is incredible - perfectly crispy edges, juicy inside, and those pickles! We come every Friday now." },
  { name: "Cameron Fox", role: "Food Blogger", img: "/img/testimonial/2.jpg", text: "Ordered delivery and the food arrived hot and fresh in 22 minutes. Portions are generous. Sarab has become my go-to comfort food spot without question." },
  { name: "Priya Sharma", role: "Food Enthusiast", img: "/img/testimonial/3.jpg", text: "The truffle pasta blew my mind. I didn't expect that quality from a fast food place. Great ambiance, super friendly staff. Highly recommended!" },
  { name: "David Park", role: "Corporate Client", img: "/img/testimonial/4.jpg", text: "Catered our office party of 50 people and everything was flawless. Fresh, delicious, on time and well presented. Nashville chicken was the absolute star!" },
];

export default function Testimonials() {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      Object.assign(swiperRef.current, {
        slidesPerView: 1,
        spaceBetween: 22,
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { clickable: true },
        breakpoints: {
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
      swiperRef.current.initialize();
    }
  }, []);

  return (
    <section id="testimonials">
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="slbl">What People Say</span>
          <h2 className="stitle">Our Customers <span>Feedback</span></h2>
          <div className="sline"></div>
        </div>
        <div data-aos="fade-up">
          <swiper-container ref={swiperRef} init="false">
            {testimonials.map((t) => (
              <swiper-slide key={t.name}>
                <div className="tescard">
                  <div className="tesq">"</div>
                  <div className="tess">
                    {Array(5).fill().map((_, i) => <i className="fas fa-star" key={i}></i>)}
                  </div>
                  <p className="testxt">{t.text}</p>
                  <div className="tesauth">
                    <img src={t.img} alt="" />
                    <div>
                      <div className="tesnm">{t.name}</div>
                      <div className="tesrl">{t.role}</div>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            ))}
          </swiper-container>
          <div className="swiper-pagination mt-4" style={{ position: "static" }}></div>
        </div>
      </div>
    </section>
  );
}
