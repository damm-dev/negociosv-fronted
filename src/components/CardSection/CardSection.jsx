// src/components/CardSection.jsx
import "./card-section.css";

const BUSINESSES = [
  {
    id: 1,
    name: "Pupusería Doña Ana",
    description:
      "Especialidad en pupusas tradicionales y rellenos creativos. Ambiente familiar en el corazón de San Salvador.",
    category: "Comida típica",
    location: "San Salvador",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 2,
    name: "Café El Mirador",
    description:
      "Café de altura salvadoreño, repostería artesanal y una vista increíble de la ciudad.",
    category: "Cafetería",
    location: "Santa Tecla",
    image:
      "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 3,
    name: "TechSV",
    description:
      "Tienda de tecnología con accesorios, reparaciones y asesoría para emprendedores digitales.",
    category: "Tecnología",
    location: "San Miguel",
    image:
      "https://images.pexels.com/photos/18104/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export default function CardSection() {
  return (
    <section className="cards-section">
      <div className="cards-section-header">
        <h2>Negocios Recomendados</h2>
        <p>Explora algunos de los negocios recomendados en NegocioSV.</p>
      </div>

      <div className="cards-grid">
        {BUSINESSES.map((business) => (
          <article key={business.id} className="business-card">
            {/* Fondo con imagen */}
            <div
              className="business-card-bg"
              style={{ backgroundImage: `url(${business.image})` }}
            />

            {/* Título visible siempre */}
            <div className="business-card-label">
              <span>{business.name}</span>
            </div>

            {/* Panel que se desliza desde la izquierda al hacer hover */}
            <div className="business-card-overlay">
              <div className="business-card-overlay-inner">
                <p className="business-card-badge">{business.category}</p>
                <h3>{business.name}</h3>
                <p className="business-card-text">{business.description}</p>
                <p className="business-card-location">{business.location}</p>

                <button type="button" className="business-card-btn">
                  Ver detalles
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
