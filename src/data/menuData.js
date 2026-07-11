const menuItems = [
  {
    id: 1, cat: "burgers", img: "/img/menu/1.jpg", title: "Classic Smash Burger",
    price: "$14.99", oldPrice: "$18.99", rating: 4.9, reviews: 128, cal: 620, time: 12,
    desc: "Double smashed patty, cheddar cheese, caramelized onions, house pickles and our legendary special sauce. Made fresh to order on a toasted brioche bun.",
    tags: ["Spicy", "Bestseller", "Beef"], badge: { text: "Hot", cls: "hot" }
  },
  {
    id: 2, cat: "pizza", img: "/img/menu/2.jpg", title: "Margherita Royale",
    price: "$19.99", oldPrice: "$24.99", rating: 4.8, reviews: 95, cal: 480, time: 18,
    desc: "San Marzano tomatoes, fresh buffalo mozzarella, fragrant basil leaves, drizzled with Italian truffle oil on a hand-stretched sourdough base.",
    tags: ["Vegetarian", "New", "Italian"], badge: { text: "New", cls: "new" }
  },
  {
    id: 3, cat: "chicken", img: "/img/menu/3.jpg", title: "Nashville Hot Chicken",
    price: "$12.99", oldPrice: "$16.99", rating: 5.0, reviews: 210, cal: 710, time: 15,
    desc: "Extra-crispy fried chicken tossed in our signature fiery Nashville spice blend, served with honey drizzle and house pickles on a toasted brioche bun.",
    tags: ["Spicy", "Bestseller", "Crispy"], badge: { text: "Best Seller" }
  },
  {
    id: 4, cat: "wraps", img: "/img/menu/4.jpg", title: "Loaded Fajita Wrap",
    price: "$10.99", oldPrice: "", rating: 4.5, reviews: 74, cal: 520, time: 10,
    desc: "Grilled chicken strips, sauteed bell peppers and onions, sour cream, fresh guacamole and salsa wrapped in a warm flour tortilla with melted cheddar.",
    tags: ["Grilled", "Fresh", "Mexican"]
  },
  {
    id: 5, cat: "desserts", img: "/img/menu/5.jpg", title: "Nutella Lava Cake",
    price: "$8.99", oldPrice: "$11.99", rating: 4.9, reviews: 56, cal: 390, time: 8,
    desc: "Warm molten chocolate cake with a gooey Nutella center, served alongside Madagascar vanilla bean ice cream with salted caramel drizzle and fresh berries.",
    tags: ["Sweet", "New", "Chocolate"], badge: { text: "New", cls: "new" }
  },
  {
    id: 6, cat: "pasta", img: "/img/menu/6.jpg", title: "Truffle Mushroom Pasta",
    price: "$16.99", oldPrice: "", rating: 4.9, reviews: 88, cal: 560, time: 20,
    desc: "Al dente tagliatelle tossed with mixed wild mushrooms, freshly shaved black truffle, aged parmesan, fresh thyme and a touch of cream in garlic butter.",
    tags: ["Vegetarian", "Chef's Pick", "Italian"], badge: { text: "Chef's Pick", cls: "hot" }
  },
];

export default menuItems;
