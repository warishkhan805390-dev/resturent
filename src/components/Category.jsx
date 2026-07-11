const cats = [
  { filter: "all", label: "All Items", count: "99 items", img: "/img/category/1.jpg" },
  { filter: "burgers", label: "Burgers", count: "24 items", img: "/img/category/2.jpg" },
  { filter: "pizza", label: "Pizza", count: "18 items", img: "/img/category/3.jpg" },
  { filter: "chicken", label: "Fried Chicken", count: "15 items", img: "/img/category/4.jpg" },
  { filter: "wraps", label: "Wraps", count: "12 items", img: "/img/category/5.jpg" },
  { filter: "desserts", label: "Desserts", count: "20 items", img: "/img/category/6.jpg" },
];

export default function Category({ activeFilter, onCategoryClick }) {
  return (
    <section id="category">
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="slbl">What We Offer</span>
          <h2 className="stitle">Browse by <span>Category</span></h2>
          <div className="sline"></div>
          <p className="sdesc mx-auto" style={{ maxWidth: 480 }}>From sizzling burgers to exotic world cuisines - find your favourite in our menu</p>
        </div>
        <div className="row g-3 justify-content-center">
          {cats.map((c, i) => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={c.filter} data-aos="zoom-in" data-aos-delay={i * 70}>
              <div
                className={`catcard${activeFilter === c.filter ? " active" : ""}`}
                data-filter={c.filter}
                onClick={() => onCategoryClick(c.filter)}
              >
                <img className="catimg" src={c.img} alt="" />
                <div className="catnm">{c.label}</div>
                <div className="catct">{c.count}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
