// src/components/CardSection.jsx
import "./FeedCards.css";

const BUSINESSES = [
  {
    id: 1,
    name: "Pupusería Doña Ana",
    category: "Comida típica",
    description:
      "Especialidad en pupusas tradicionales y rellenos creativos. Ambiente familiar en San Salvador.",
    location: "San Salvador",
    installs: "70,000+ visitas",
    rating: 4.8,
    reviews: 732,
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 2,
    name: "Café El Mirador",
    category: "Cafetería",
    description:
      "Café salvadoreño, repostería artesanal y vista panorámica de la ciudad.",
    location: "Santa Tecla",
    installs: "100,000+ visitas",
    rating: 4.9,
    reviews: 845,
    image:
      "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 3,
    name: "TechSV",
    category: "Tecnología",
    description:
      "Accesorios tecnológicos, reparaciones y soporte para emprendedores digitales.",
    location: "San Miguel",
    installs: "50,000+ visitas",
    rating: 4.6,
    reviews: 421,
    image:
      "https://images.pexels.com/photos/18104/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
  },
   {
    id: 3,
    name: "TechSV",
    category: "Tecnología",
    description:
      "Accesorios tecnológicos, reparaciones y soporte para emprendedores digitales.",
    location: "San Miguel",
    installs: "50,000+ visitas",
    rating: 4.6,
    reviews: 421,
    image:
      "https://images.pexels.com/photos/18104/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
  },
   {
    id: 3,
    name: "TechSV",
    category: "Tecnología",
    description:
      "Accesorios tecnológicos, reparaciones y soporte para emprendedores digitales.",
    location: "San Miguel",
    installs: "50,000+ visitas",
    rating: 4.6,
    reviews: 421,
    image:
      "https://images.pexels.com/photos/18104/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
  },
   {
    id: 3,
    name: "TechSV",
    category: "Tecnología",
    description:
      "Accesorios tecnológicos, reparaciones y soporte para emprendedores digitales.",
    location: "San Miguel",
    installs: "50,000+ visitas",
    rating: 4.6,
    reviews: 421,
    image:
      "https://images.pexels.com/photos/18104/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
  },
   {
    id: 3,
    name: "TechSV",
    category: "Tecnología",
    description:
      "Accesorios tecnológicos, reparaciones y soporte para emprendedores digitales.",
    location: "San Miguel",
    installs: "50,000+ visitas",
    rating: 4.6,
    reviews: 421,
    image:
      "https://images.pexels.com/photos/18104/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export default function CardSection() {
  return (
    <section className="cards-section">


      <div className="wp-style-grid">
        {BUSINESSES.map((b) => (
          <article key={b.id} className="wp-card">
            {/* Imagen */}
            <div
              className="wp-card-image"
              style={{ backgroundImage: `url(${b.image})` }}
            />

            {/* Contenido principal */}
            <div className="wp-card-body">
              <h3 className="wp-card-name">{b.name}</h3>
              <p className="wp-card-description">{b.description}</p>

              <div className="wp-card-meta">
                <span className="wp-card-category">{b.category}</span>
                <span className="wp-card-location">{b.location}</span>
              </div>

              <div className="wp-card-stats">
                <span className="wp-card-rating">⭐ {b.rating}</span>
                <span className="wp-card-reviews">({b.reviews} reseñas)</span>
                <span className="wp-card-installs">{b.installs}</span>
              </div>
            </div>

            {/* Botón estilo WordPress */}
            <div className="wp-card-actions">
              <button className="wp-card-btn">Ver detalles</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
