import { useState } from "react";
import menuItems from "../data/menuData";

const filters = ["all", "burgers", "pizza", "chicken", "wraps", "desserts", "pasta"];

export default function Menu({ activeFilter, onFilterChange }) {
  const [popupItem, setPopupItem] = useState(null);
  const [qty, setQty] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [added, setAdded] = useState(false);

  const filtered = activeFilter === "all" ? menuItems : menuItems.filter((m) => m.cat === activeFilter);

  const openPopup = (item) => {
    setPopupItem(item);
    setQty(1);
    setAdded(false);
  };

  const addToCart = () => {
    setCartCount((c) => c + qty);
    setAdded(true);
    setTimeout(() => setPopupItem(null), 800);
  };

  const renderStars = (rating) => {
    const full = Math.round(rating);
    return (
      <>
        {Array(full).fill().map((_, i) => <i className="fas fa-star" key={i}></i>)}
        {Array(5 - full).fill().map((_, i) => <i className="far fa-star" key={i}></i>)}
      </>
    );
  };

  return (
    <section id="menu">
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="slbl">What's Cooking</span>
          <h2 className="stitle">Our Delicious <span>Menu</span></h2>
          <div className="sline"></div>
        </div>
        <div className="text-center mb-4" data-aos="fade-up">
          {filters.map((f) => (
            <button
              key={f}
              className={`filtbtn${activeFilter === f ? " active" : ""}`}
              onClick={() => onFilterChange(f)}
            >
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="row g-4" id="mgrid">
          {filtered.map((item, i) => (
            <div className="col-sm-6 col-lg-4 mwrap" key={item.id} data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
              <div className="mcard" onClick={() => openPopup(item)}>
                <div className="mimg">
                  <img src={item.img} alt={item.title} />
                  {item.badge && <div className={`mbdg${item.badge.cls ? " " + item.badge.cls : ""}`}><i className="fas fa-star"></i> {item.badge.text}</div>}
                  <div className="mhrt" onClick={(e) => { e.stopPropagation(); }}><i className="far fa-heart"></i></div>
                </div>
                <div className="mbody">
                  <div className="mcat">{item.cat}</div>
                  <div className="mtit">{item.title}</div>
                  <div className="mdesc">{item.desc.split(".")[0]}.</div>
                  <div className="mfoot">
                    <div>
                      <div className="mprice">{item.price} {item.oldPrice && <small>{item.oldPrice}</small>}</div>
                      <div className="mstars">{renderStars(item.rating)} <span style={{ color: "#bbb", fontSize: ".7rem" }}>({item.reviews})</span></div>
                    </div>
                    <button className="madd" title="View Details" onClick={(e) => { e.stopPropagation(); openPopup(item); }}><i className="fas fa-plus"></i></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <a href="#" className="btn-red"><i className="fas fa-th-large"></i>View Full Menu</a>
        </div>
      </div>

      {popupItem && (
        <div id="menuPop" className="open" onClick={() => setPopupItem(null)}>
          <div className="mpbox" onClick={(e) => e.stopPropagation()}>
            <button className="mpclose" onClick={() => setPopupItem(null)}><i className="fas fa-times"></i></button>
            <div className="mpimg"><img id="mpImg" src={popupItem.img} alt="" /></div>
            <div className="mpbody">
              <div id="mpCat">{popupItem.cat}</div>
              <div id="mpTitle">{popupItem.title}</div>
              <div id="mpStars">{renderStars(popupItem.rating)} <span style={{ color: "#bbb", fontSize: ".78rem" }}>{popupItem.rating} ({popupItem.reviews} reviews)</span></div>
              <div id="mpDesc">{popupItem.desc}</div>
              <div id="mpPrice">
                {popupItem.price}
                {popupItem.oldPrice && <small style={{ color: "#ccc", textDecoration: "line-through", marginLeft: 8, fontSize: "1rem" }}>{popupItem.oldPrice}</small>}
              </div>
              <div className="mpmeta" id="mpMeta">
                <div className="mpm"><div className="mpmv">{popupItem.cal} kcal</div><div className="mpml">Calories</div></div>
                <div className="mpm"><div className="mpmv">{popupItem.time} min</div><div className="mpml">Prep Time</div></div>
                <div className="mpm"><div className="mpmv">{popupItem.rating}/5</div><div className="mpml">Rating</div></div>
              </div>
              <div className="mpqty">
                <button className="mpqbtn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <span className="mpqnum">{qty}</span>
                <button className="mpqbtn" onClick={() => setQty(qty + 1)}>+</button>
                <span style={{ fontSize: ".82rem", color: "#aaa", marginLeft: 9 }}>portion</span>
              </div>
              <div className="mptags" id="mpTags">
                {popupItem.tags?.map((t) => <span className="mptag" key={t}>{t}</span>)}
              </div>
              <button className="mpaddcart" id="mpAddCart" onClick={addToCart} style={added ? { background: "linear-gradient(135deg,var(--green),#1a4a35)" } : {}}>
                <i className={`fas ${added ? "fa-check" : "fa-shopping-cart"}`}></i> {added ? "Added to Cart!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="cartfl"><i className="fas fa-shopping-cart"></i><span>My Cart</span><div className="ccount">{cartCount}</div></div>
    </section>
  );
}
