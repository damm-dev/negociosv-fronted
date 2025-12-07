// src/components/CardSection.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./card-section.css";

const API_URL = "http://127.0.0.1:8000/api/negocios";

export default function CardSection() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(API_URL);
        console.log("RESPONSE NEGOCIOS:", response.data);

        const body = response.data;
        let raw = [];

        // formatos posibles de tu API
        if (Array.isArray(body)) raw = body;
        else if (Array.isArray(body.data)) raw = body.data;
        else if (body.data && Array.isArray(body.data.negocios))
          raw = body.data.negocios;
        else if (body.data && typeof body.data === "object") {
          const firstArray = Object.values(body.data).find((v) =>
            Array.isArray(v)
          );
          raw = firstArray || [];
        }

        const mapped = raw.map((negocio) => {
          // categoría
          let category = "Sin categoría";
          if (Array.isArray(negocio.categorias)) {
            category = negocio.categorias
              .map((c) => (typeof c === "string" ? c : c.nombre))
              .join(", ");
          } else if (negocio.categoria) {
            category = negocio.categoria;
          }

          // ubicación
          const location =
            (negocio.municipio && negocio.municipio.nombre) ||
            negocio.municipio ||
            negocio.ubicacion ||
            "Sin ubicación";

          // imagen
          const image =
            negocio.logo_url ||
            negocio.logo ||
            negocio.imagen ||
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect fill='%23f0f0f0' width='600' height='400'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='24' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3ENegocioSV%3C/text%3E%3C/svg%3E";

          // intento robusto de obtener un id desde distintas formas que pueda devolver la API
          const id =
            negocio.id ?? negocio._id ?? negocio.pk ?? negocio.id_negocio ?? negocio.uuid ?? negocio.nombre_negocio ?? negocio.nombre ?? null;

          return {
            id,
            name: negocio.nombre_negocio || negocio.nombre || "Negocio",
            description: negocio.descripcion || "",
            category,
            location,
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
      <div className="cards-section-row">
        <div className="cards-section-header">
          <h2>Negocios recomendados</h2>
          <p>
            Explora algunos de los negocios recomendados en NegocioSV y descubre
            nuevas opciones cerca de ti.
          </p>
        </div>

        {loading && <p>Cargando negocios...</p>}

        {error && !loading && (
          <p style={{ color: "red", marginTop: "8px" }}>{error}</p>
        )}

        {!loading && !error && businesses.length === 0 && (
          <p>No hay negocios registrados todavía.</p>
        )}

        {!loading && !error && businesses.length > 0 && (
          <div className="cards-grid">
            {businesses.map((business, idx) => (
              <article key={business.id ?? idx} className="business-card">
                {/* Fondo con imagen */}
                <div
                  className="business-card-bg"
                  style={{ backgroundImage: `url(${business.image})` }}
                />

                {/* Título visible siempre */}
                <div className="business-card-label">
                  <span>{business.name}</span>
                </div>

                {/* Panel que se desliza al hacer hover */}
                <div className="business-card-overlay">
                  <div className="business-card-overlay-inner">
                    <p className="business-card-badge">
                      {business.category}
                    </p>
                    <h3>{business.name}</h3>
                    <p className="business-card-text">
                      {business.description}
                    </p>
                    <p className="business-card-location">
                      {business.location}
                    </p>

                    <button
                      className="business-card-btn"
                      onClick={() => {
                        if (!business.id) {
                          console.warn("Intento de navegar a detalle sin id:", business);
                          return;
                        }
                        navigate(`/negocios/${business.id}`);
                      }}
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
