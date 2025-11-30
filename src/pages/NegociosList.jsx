import { useState, useEffect } from "react";
import BusinessHero from "../components/BusinessHero/BusinessHero";
import FeedCards from "../components/FeedSection/FeedCards"; // ahora será el GRID completo

const businessesData = [
  { id: 1, name: "Burger House", image: "/img/burger1.jpg", category: "burger" },
  { id: 2, name: "Pasta Bella", image: "/img/pasta1.jpg", category: "pasta" },
  { id: 3, name: "Green Salads", image: "/img/salad1.jpg", category: "salad" },
  { id: 4, name: "Pizza Corner", image: "/img/pizza1.jpg", category: "pizza" },
  { id: 5, name: "Sandwich Bros", image: "/img/sandwich1.jpg", category: "sandwich" },
  { id: 6, name: "Fried Rice Town", image: "/img/rice1.jpg", category: "fried-rice" },
];

export default function Businesses() {
  const categories = [
    { id: "all", name: "Todos" },
    { id: "restaurante", name: "Restaurante" },
    { id: "cafeteria", name: "Cafetería" },
    { id: "barberia", name: "Barbería" },
    { id: "clinica", name: "Clínica" },
    { id: "taller", name: "Taller" },
    { id: "coworking", name: "Coworking" },
    { id: "tienda", name: "Tienda" },
    { id: "servicios", name: "Servicios" },
  ];

  const [activeCategory, setActiveCategory] = useState("all");
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    setBusinesses(businessesData);
  }, []);

  const filteredBusinesses =
    activeCategory === "all"
      ? businesses
      : businesses.filter((biz) => biz.category === activeCategory);

  return (
    <div className="businesses-page">
      <BusinessHero
        categories={categories}
        active={activeCategory}
        onFilter={setActiveCategory}
      />

      {/* FeedCards recibe la lista y se encarga del grid + map */}
      <FeedCards businesses={filteredBusinesses} />
    </div>
  );
}
