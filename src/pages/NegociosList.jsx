import { useState } from "react";
import BusinessesHero from "../components/BusinessHero/BusinessHero";
import FeedCards from "../components/FeedSection/FeedCards";

export default function Businesses() {
  // Lista FINAL de categorías (IDs y Nombres actualizados)
  // Usamos el 'nombre' como ID para el filtro de texto
  const categories = [
    { id: "Todos", name: "Todos" },
    { id: "Restaurante", name: "Restaurante" },
    { id: "Cafetería", name: "Cafetería" },
    { id: "Barbería", name: "Barbería" },
    { id: "Salón de Belleza", name: "Salón de Belleza" },
    { id: "Gimnasio", name: "Gimnasio" },
    { id: "Tienda", name: "Tienda" },
    { id: "Servicios Profesionales", name: "Servicios Profesionales" },
    { id: "Entretenimiento", name: "Entretenimiento" },
    { id: "Educación", name: "Educación" },
    { id: "Salud", name: "Salud" },
  ];

  const [activeCategory, setActiveCategory] = useState("Todos");

  return (
    <div className="businesses-page">
      {/* HERO: Muestra los botones y actualiza el estado */}
      <BusinessesHero
        categories={categories}
        active={activeCategory}      
        onSelectCategory={setActiveCategory} 
      />

      {/* FEED: Recibe la categoría y filtra los negocios */}
      <FeedCards selectedCategory={activeCategory} />
    </div>
  );
}