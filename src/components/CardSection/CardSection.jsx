// src/components/CardSection.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "./card-section.css";

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

        let raw = [];

        const body = response.data;

        // 1) [ {...}, {...} ]
        if (Array.isArray(body)) {
          raw = body;
        }
        // 2) { data: [ ... ] }
        else if (Array.isArray(body.data)) {
          raw = body.data;
        }
        // 3) { status: true, data: { negocios: [ ... ] } }
        else if (body.data && Array.isArray(body.data.negocios)) {
          raw = body.data.negocios;
        }
        // 4) { status: true, data: { ...algunObjeto... } }
        //    Busca la primera propiedad que sea un array
        else if (body.data && typeof body.data === "object") {
          const firstArray = Object.values(body.data).find((v) =>
            Array.isArray(v)
          );
          if (firstArray) {
            raw = firstArray;
          } else {
            // si no hay arrays, asumimos que no hay negocios
            raw = [];
          }
        } else {
          // ya no lanzamos error, solo dejamos la lista vacía
          raw = [];
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
            "https://via.placeholder.com/600x400?text=NegocioSV";

          return {
            id: negocio.id,
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

        {/* Estados de carga / error */}
        {loading && <p>Cargando negocios...</p>}

        {error && !loading && (
          <p style={{ color: "red", marginTop: "8px" }}>{error}</p>
        )}

        {!loading && !error && businesses.length === 0 && (
          <p>No hay negocios registrados todavía.</p>
        )}

        {!loading && !error && businesses.length > 0 && (
          <div className="cards-grid">
            {businesses.map((business) => (
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
                    <p className="business-card-text">
                      {business.description}
                    </p>
                    <p className="business-card-location">
                      {business.location}
                    </p>

                    <button type="button" className="business-card-btn">
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
