// src/pages/BusinessDetail.jsx
import { useState } from "react";
import "../styles/business-detail.css";
import playa from "../assets/playa.avif";

const sampleBusiness = {
  id: 1,
  name: "Pupusería Doña Ana",
  category: "Comida típica",
  address: "Col. Miramonte, San Salvador",
  phone: "+503 7000 0000",
  horario: "Lun-Dom 8:00 - 21:00",
  rating: 4.6,
  reviews: [
    { user: "Ana", text: "Las pupusas son deliciosas, 100% recomendadas." },
    { user: "Carlos", text: "Buena atención y precios accesibles." }
  ],
  description:
    "Negocio familiar especializado en pupusas hechas a mano con recetas tradicionales. Opciones vegetarianas disponibles.",
  photos: [playa, playa, playa],
  extras: {
    servicios: ["Domicilio", "Wi-Fi"],
    website: "https://example.com",
    redes: { facebook: "https://facebook.com/donaana" }
  }
};

export default function BusinessDetail({ business = sampleBusiness }) {
  const [activeSection, setActiveSection] = useState("info");

  return (
    <div className="bd-page">
      <div className="bd-header">
        <h1>{business.name}</h1>
        <p>
          {business.category} · {business.address}
        </p>
      </div>

      <div className="bd-container">

        {/* ================= SIDEBAR ================= */}
        <aside className="bd-sidebar">
          <button
            className={
              "bd-menu-item" + (activeSection === "info" ? " active" : "")
            }
            onClick={() => setActiveSection("info")}
          >
            🛈 Información general
          </button>

          <button
            className={
              "bd-menu-item" + (activeSection === "reviews" ? " active" : "")
            }
            onClick={() => setActiveSection("reviews")}
          >
            ⭐ Reseñas
          </button>

          <button
            className={
              "bd-menu-item" + (activeSection === "extras" ? " active" : "")
            }
            onClick={() => setActiveSection("extras")}
          >
            📷 Fotos & extra
          </button>
        </aside>

        {/* ================= CONTENIDO ================= */}
        <section className="bd-content">

          {/* ---- Información general ---- */}
          {activeSection === "info" && (
            <div className="bd-card">
              <h2>Información general</h2>
              <p className="bd-description">{business.description}</p>

              <ul className="bd-info-list">
                <li><strong>Dirección:</strong> {business.address}</li>
                <li><strong>Teléfono:</strong> {business.phone}</li>
                <li><strong>Horario:</strong> {business.horario}</li>
                <li>
                  <strong>Sitio web:</strong>{" "}
                  <a href={business.extras.website} target="_blank">Visitar</a>
                </li>
              </ul>
            </div>
          )}

          {/* ---- Reseñas ---- */}
          {activeSection === "reviews" && (
            <div className="bd-card">
              <h2>Reseñas</h2>

              <div className="bd-reviews">
                {business.reviews.map((r, index) => (
                  <div key={index} className="bd-review">
                    <h4>{r.user}</h4>
                    <p>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---- Fotos e información extra ---- */}
          {activeSection === "extras" && (
            <div className="bd-card">
              <h2>Fotos del negocio</h2>

              <div className="bd-photo-grid">
                {business.photos.map((p, index) => (
                  <img key={index} src={p} alt={`foto-${index}`} />
                ))}
              </div>

              <hr className="bd-divider" />

              <h2>Información extra</h2>

              <ul className="bd-info-list">
                <li><strong>Servicios:</strong> {business.extras.servicios.join(", ")}</li>
                <li>
                  <strong>Facebook:</strong>{" "}
                  <a href={business.extras.redes.facebook} target="_blank">Página</a>
                </li>
              </ul>
            </div>
          )}

        </section>
      </div>
    </div>
  );
}
