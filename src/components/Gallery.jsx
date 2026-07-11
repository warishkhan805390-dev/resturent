const galleryItems = [
  { img: 'img/portfolio/work1.jpg', title: 'Gourmet Burgers', desc: 'Our award-winning smash burgers, hand-crafted with 100% premium beef, aged cheddar and house-made sauces.' },
  { img: 'img/portfolio/work2.jpg', title: 'Wood-Fired Pizza', desc: 'Authentic Neapolitan-style pizzas fired at 900\u00b0F in our wood-burning stone oven for the perfect char.' },
  { img: 'img/portfolio/work3.jpg', title: 'Crispy Fried Chicken', desc: 'Double-brined, hand-battered chicken fried to golden perfection using our 15-spice secret blend.' },
  { img: 'img/portfolio/work4.jpg', title: 'Sweet Desserts', desc: 'Handcrafted desserts - from molten lava cakes to artisan ice cream sundaes and seasonal pastries.' },
  { img: 'img/portfolio/work5.jpg', title: 'Fresh Wraps & Rolls', desc: 'Loaded fresh wraps packed with grilled proteins, crunchy vegetables and our house-made sauces.' },
]

export default function Gallery({ onGalleryOpen }) {
  return (
    <section id="gallery">
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="slbl">Food Showcase</span>
          <h2 className="stitle">Let's See Our <span>Fast Food</span></h2>
          <div className="sline"></div>
        </div>
        <div className="ggrid" data-aos="fade-up">
          {galleryItems.map((g, i) => (
            <div className="gitem" key={i} data-gi={i} onClick={() => onGalleryOpen(i)}>
              <img src={g.img} alt={g.title} />
              <div className="gover"><span><i className="fas fa-expand-alt"></i> {g.title}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { galleryItems }
