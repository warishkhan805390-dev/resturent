const items = [
  "Crispy Fried Chicken", "Gourmet Burgers", "Artisan Pizzas",
  "Fresh Wraps & Rolls", "Loaded Fries", "Ice Cream Shakes", "Grilled Sandwiches"
];

export default function Marquee() {
  return (
    <div className="mqsec">
      <div className="mqtrack">
        {[...items, ...items].map((item, i) => (
          <div className="mqitem" key={i}><i className="fas fa-circle"></i>{item}</div>
        ))}
      </div>
    </div>
  );
}
