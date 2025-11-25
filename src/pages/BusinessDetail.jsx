import { useState } from "react";
import "../styles/business-detail.css";

export default function BusinessDetail() {
  const [activeTab, setActiveTab] = useState("general");

  const images = [
    "https://picsum.photos/600/600?random=101",
    "https://picsum.photos/600/600?random=102",
    "https://picsum.photos/600/600?random=103",
    "https://picsum.photos/600/600?random=104",
  ];

  return (
    <div className="business-detail-container">

      {/* ============================
           BLOQUE CON EL NOMBRE
      ============================ */}
      <div className="business-title-box">
        <h1 className="business-title">Pupusería Doña Ana</h1>
        <p className="business-category">
          Comida típica • Col. Miramonte, San Salvador
        </p>
      </div>

      {/* ============================
           GALERÍA DE FOTOS
      ============================ */}
      <div className="photo-grid">
        {images.map((img, i) => (
          <div className="photo-grid-item" key={i}>
            <img src={img} alt={`Foto ${i}`} />
          </div>
        ))}
      </div>

      {/* ============================
           PESTAÑAS
      ============================ */}
      <div className="tabs-container">
        <div className="tabs-header">
          <button
            className={`tab-btn ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            Información general
          </button>

          <button
            className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reseñas
          </button>

          <button
            className={`tab-btn ${activeTab === "contact" ? "active" : ""}`}
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
                <p>
                  Negocio familiar especializado en pupusas hechas a mano,
                  utilizando ingredientes frescos y recetas tradicionales.
                </p>

                <p><b>Dirección:</b> Col. Miramonte, San Salvador</p>
                <p><b>Teléfono:</b> +503 7000 0000</p>
                <p><b>Horario:</b> Lun-Dom · 8:00 AM – 9:00 PM</p>
              </div>

              <div className="info-map">
                <iframe
                  title="mapa"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "12px" }}
                  loading="lazy"
                  allowFullScreen
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.514736315342!2d-89.224!3d13.698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0000000000000000!2sSan%20Salvador!5e0!3m2!1ses!2ssv!4v1234567890123"
                ></iframe>
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
              <p>Puedes comunicarte con nosotros a través de los siguientes medios:</p>
              <p><b>Teléfono:</b> +503 7000 0000</p>
              <p><b>Correo:</b> ejemplo@pupuseriadoana.com</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
