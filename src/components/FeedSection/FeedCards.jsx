// src/components/CardSection.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "./FeedCards.css";

const API_URL = "http://127.0.0.1:8000/api/negocios";

export default function CardSection() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(API_URL);
        console.log("RESPONSE NEGOCIOS:", response.data);

        const body = response.data;
        let raw = [];

        // Formatos posibles de tu API:
        // 1) [ {..}, {..} ]
        if (Array.isArray(body)) {
          raw = body;
        }
        // 2) { data: [ {..} ] }
        else if (Array.isArray(body.data)) {
          raw = body.data;
        }
        // 3) { status: true, data: { negocios: [ {..} ] } }
        else if (body.data && Array.isArray(body.data.negocios)) {
          raw = body.data.negocios;
        }
        // 4) { status: true, data: { ... } } → buscamos el primer array dentro de data
        else if (body.data && typeof body.data === "object") {
          const firstArray = Object.values(body.data).find((v) =>
            Array.isArray(v)
          );
          raw = firstArray || [];
        } else {
          raw = [];
        }

        const mapped = raw.map((negocio) => {
          // Categoría
          let category = "Sin categoría";
          if (Array.isArray(negocio.categorias)) {
            category = negocio.categorias
              .map((c) => (typeof c === "string" ? c : c.nombre))
              .join(", ");
          } else if (negocio.categoria) {
            category = negocio.categoria;
          }

          // Ubicación
          const location =
            (negocio.municipio && negocio.municipio.nombre) ||
            negocio.municipio ||
            negocio.ubicacion ||
            "Sin ubicación";

          // Imagen
          const image =
            negocio.logo_url ||
            negocio.logo ||
            negocio.imagen ||
            "https://via.placeholder.com/600x400?text=NegocioSV";

          return {
            id: negocio.id,
            name: negocio.nombre_negocio || negocio.nombre || "Negocio",
            description: negocio.descripcion || "",
            category,
            location,
            // Si aún no tienes estos campos en la BD, ponemos valores por defecto
            installs: negocio.installs || "Nuevas visitas",
            rating: negocio.rating || 4.8,
            reviews: negocio.reviews || 0,
            image,
          };
        });

        setBusinesses(mapped);
      } catch (err) {
        console.error("Error cargando negocios:", err);
        setError("No se pudieron cargar los negocios. Intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <section className="cards-section">
      {loading && <p>Cargando negocios...</p>}

      {error && !loading && (
        <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
      )}

      {!loading && !error && businesses.length === 0 && (
        <p>No hay negocios registrados todavía.</p>
      )}

      {!loading && !error && businesses.length > 0 && (
        <div className="wp-style-grid">
          {businesses.map((b) => (
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
                  <span className="wp-card-reviews">
                    ({b.reviews} reseñas)
                  </span>
                  <span className="wp-card-installs">{b.installs}</span>
                </div>
              </div>

              {/* Botón estilo WordPress */}
              <div className="wp-card-actions">
                <a href={`/negocios/${b.id}`}>
                  <button className="wp-card-btn">Ver detalles</button>
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
