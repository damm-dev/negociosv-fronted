// src/pages/BusinessDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/business-detail.css";

const API_URL = "http://127.0.0.1:8000/api/negocio";

export default function BusinessDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("general");
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${API_URL}/${id}`);
        console.log("DETALLE NEGOCIO:", response.data);

        const body = response.data;
        const n = body.data || body; // soporta {data: {...}} o {...}

        // categoría
        let category = "Sin categoría";
        if (Array.isArray(n.categorias)) {
          category = n.categorias
            .map((c) => (typeof c === "string" ? c : c.nombre))
            .join(", ");
        } else if (n.categoria) {
          category = n.categoria;
        }

        const location =
          (n.municipio && n.municipio.nombre) ||
          n.municipio ||
          n.ubicacion ||
          "Sin ubicación";

        const image =
          n.logo_url ||
          n.logo ||
          n.imagen ||
          "https://via.placeholder.com/800x400?text=NegocioSV";

        setBusiness({
          id: n.id,
          name: n.nombre_negocio || n.nombre || "Negocio",
          description: n.descripcion || "",
          category,
          location,
          direccion: n.direccion || location,
          telefono: n.telefono || "",
          email_contacto: n.email_contacto || "",
          image,
        });
      } catch (err) {
        console.error("Error cargando negocio:", err);
        setError("No se pudo cargar la información del negocio.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [id]);

  if (loading)
    return <p style={{ padding: "1rem" }}>Cargando negocio...</p>;

  if (error)
    return (
      <p style={{ padding: "1rem", color: "red" }}>
        {error}
      </p>
    );

  if (!business)
    return (
      <p style={{ padding: "1rem" }}>
        Negocio no encontrado.
      </p>
    );

  // galería simple: usamos el logo y generamos variantes
  const images = [
    business.image,
    business.image,
    business.image,
    business.image,
  ];

  return (
    <div className="business-detail-container">
      {/* Botón volver */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      {/* BLOQUE CON EL NOMBRE */}
      <div className="business-title-box">
        <h1 className="business-title">{business.name}</h1>
        <p className="business-category">
          {business.category} • {business.location}
        </p>
      </div>

      {/* GALERÍA DE FOTOS */}
      <div className="photo-grid">
        {images.map((img, i) => (
          <div className="photo-grid-item" key={i}>
            <img src={img} alt={`Foto ${i}`} />
          </div>
        ))}
      </div>

      {/* PESTAÑAS */}
      <div className="tabs-container">
        <div className="tabs-header">
          <button
            className={`tab-btn ${
              activeTab === "general" ? "active" : ""
            }`}
            onClick={() => setActiveTab("general")}
          >
            Información general
          </button>

          <button
            className={`tab-btn ${
              activeTab === "reviews" ? "active" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reseñas
          </button>

          <button
            className={`tab-btn ${
              activeTab === "contact" ? "active" : ""
            }`}
            onClick={() => setActiveTab("contact")}
          >
            Contáctanos
          </button>
        </div>

        <div className="tabs-content">
          {/* ----- INFORMACIÓN GENERAL ----- */}
          {activeTab === "general" && (
            <div className="info-flex">
              <div className="info-left">
                <h2>Sobre el negocio</h2>
                <p>{business.description}</p>

                <p>
                  <b>Dirección:</b> {business.direccion}
                </p>
                {business.telefono && (
                  <p>
                    <b>Teléfono:</b> {business.telefono}
                  </p>
                )}
                {business.email_contacto && (
                  <p>
                    <b>Correo:</b> {business.email_contacto}
                  </p>
                )}
              </div>

              {/* si quieres puedes luego hacer el mapa dinámico */}
              <div className="info-map">
                <p style={{ padding: "1rem" }}>
                  Mapa del negocio próximamente.
                </p>
              </div>
            </div>
          )}

          {/* ----- RESEÑAS ----- */}
          {activeTab === "reviews" && (
            <div className="tab-content-box">
              <h2>Reseñas</h2>
              <p>Aún no hay reseñas disponibles.</p>
            </div>
          )}

          {/* ----- CONTÁCTANOS ----- */}
          {activeTab === "contact" && (
            <div className="tab-content-box">
              <h2>Contáctanos</h2>
              {business.telefono && (
                <p>
                  <b>Teléfono:</b> {business.telefono}
                </p>
              )}
              {business.email_contacto && (
                <p>
                  <b>Correo:</b> {business.email_contacto}
                </p>
              )}
              {!business.telefono && !business.email_contacto && (
                <p>
                  Este negocio aún no ha agregado datos de contacto.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
