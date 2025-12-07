// src/pages/BusinessDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/business-detail.css";
import { useAuth } from "../context/AuthContext";
import BusinessReviews from "../components/BusinessReviews/BusinessReviews";
import ShareButtons from "../components/ShareButtons";
import PromocionCard from "../components/PromocionCard";
import favoritosService from "../api/favoritosService";
import seguimientosService from "../api/seguimientosService";
import promocionesService from "../api/promocionesService";
import logrosService from "../api/logrosService";

const API_URL = `${import.meta.env.VITE_API_URL || "https://negociosv.com/api"}/negocio`;

export default function BusinessDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, userType, isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState("general");
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Estados para interacciones
  const [isFavorito, setIsFavorito] = useState(false);
  const [isSiguiendo, setIsSiguiendo] = useState(false);
  const [promociones, setPromociones] = useState([]);
  const [loadingAction, setLoadingAction] = useState(false);

  // ========== CARGAR NEGOCIO DESDE API ==========
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${API_URL}/${id}`);
        console.log("DETALLE NEGOCIO:", response.data);

        const body = response.data;
        const n = body.data || body;

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
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='800' height='400' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='24' fill='%23999'%3ENegocioSV%3C/text%3E%3C/svg%3E";

        setBusiness({
          id_negocio: n.id_negocio ?? n.id ?? null,
          id: n.id_negocio ?? n.id ?? null,
          name: n.nombre_negocio || n.nombre || "Negocio",
          description: n.descripcion || "",
          category,
          location,
          direccion: n.direccion || location,
          telefono: n.telefono || "",
          email_contacto: n.email_contacto || "",
          image,
          raw: n,
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

  // ========== CARGAR ESTADO DE FAVORITO Y SEGUIMIENTO ==========
  useEffect(() => {
    if (isAuthenticated() && userType === 'persona' && id) {
      checkFavoritoStatus();
      checkSeguimientoStatus();
      loadPromociones();
    }
  }, [id, isAuthenticated, userType]);

  const checkFavoritoStatus = async () => {
    try {
      const response = await favoritosService.verificarFavorito(id);
      setIsFavorito(response.es_favorito);
    } catch (error) {
      console.error("Error verificando favorito:", error);
    }
  };

  const checkSeguimientoStatus = async () => {
    try {
      const response = await seguimientosService.verificarSeguimiento(id);
      setIsSiguiendo(response.esta_siguiendo);
    } catch (error) {
      console.error("Error verificando seguimiento:", error);
    }
  };

  const loadPromociones = async () => {
    try {
      const response = await promocionesService.obtenerPromocionesPublicas(id);
      setPromociones(response.promociones || []);
    } catch (error) {
      console.error("Error cargando promociones:", error);
    }
  };

  // ========== MANEJAR FAVORITO ==========
  const handleToggleFavorito = async () => {
    if (!isAuthenticated()) {
      alert("Debes iniciar sesión para agregar favoritos");
      navigate("/login");
      return;
    }

    if (userType !== 'persona') {
      alert("Solo los usuarios persona pueden agregar favoritos");
      return;
    }

    setLoadingAction(true);
    try {
      if (isFavorito) {
        await favoritosService.eliminarFavorito(id);
        setIsFavorito(false);
      } else {
        await favoritosService.agregarFavorito(id);
        setIsFavorito(true);
        // Actualizar logros
        await logrosService.verificarLogros();
      }
    } catch (error) {
      console.error("Error al manejar favorito:", error);
      alert("Error al actualizar favorito");
    } finally {
      setLoadingAction(false);
    }
  };

  // ========== MANEJAR SEGUIMIENTO ==========
  const handleToggleSeguir = async () => {
    if (!isAuthenticated()) {
      alert("Debes iniciar sesión para seguir negocios");
      navigate("/login");
      return;
    }

    if (userType !== 'persona') {
      alert("Solo los usuarios persona pueden seguir negocios");
      return;
    }

    setLoadingAction(false);
    try {
      if (isSiguiendo) {
        await seguimientosService.dejarDeSeguir(id);
        setIsSiguiendo(false);
      } else {
        await seguimientosService.seguirNegocio(id);
        setIsSiguiendo(true);
        // Actualizar logros
        await logrosService.verificarLogros();
      }
    } catch (error) {
      console.error("Error al manejar seguimiento:", error);
      alert("Error al actualizar seguimiento");
    } finally {
      setLoadingAction(false);
    }
  };

  // ========== ESTADOS BÁSICOS ==========
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

      {/* BLOQUE CON EL NOMBRE Y BOTONES DE ACCIÓN */}
      <div className="business-title-box">
        <div className="business-header">
          <div className="business-title-content">
            <h1 className="business-title">{business.name}</h1>
            <p className="business-category">
              {business.category} • {business.location}
            </p>
          </div>

          {/* Botones de acción (solo para usuarios persona) */}
          {isAuthenticated() && userType === 'persona' && (
            <div className="business-actions">
              <button
                className={`action-btn action-btn-favorito ${isFavorito ? 'active' : ''}`}
                onClick={handleToggleFavorito}
                disabled={loadingAction}
              >
                <svg viewBox="0 0 24 24" fill={isFavorito ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {isFavorito ? 'Guardado' : 'Guardar'}
              </button>

              <button
                className={`action-btn action-btn-seguir ${isSiguiendo ? 'active' : ''}`}
                onClick={handleToggleSeguir}
                disabled={loadingAction}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {isSiguiendo ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  )}
                </svg>
                {isSiguiendo ? 'Siguiendo' : 'Seguir'}
              </button>
            </div>
          )}
        </div>
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
            className={`tab-btn ${activeTab === "general" ? "active" : ""
              }`}
            onClick={() => setActiveTab("general")}
          >
            Información general
          </button>

          {promociones.length > 0 && (
            <button
              className={`tab-btn ${activeTab === "promociones" ? "active" : ""
                }`}
              onClick={() => setActiveTab("promociones")}
            >
              Promociones ({promociones.length})
            </button>
          )}

          <button
            className={`tab-btn ${activeTab === "reviews" ? "active" : ""
              }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reseñas
          </button>

          <button
            className={`tab-btn ${activeTab === "contact" ? "active" : ""
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

                {/* Botones de compartir */}
                <ShareButtons
                  url={window.location.href}
                  title={`Mira ${business.name} en NegocioSV`}
                  description={business.description}
                />
              </div>

              <div className="info-map">
                <p style={{ padding: "1rem" }}>
                  Mapa del negocio próximamente.
                </p>
              </div>
            </div>
          )}

          {/* ----- PROMOCIONES ----- */}
          {activeTab === "promociones" && (
            <div className="tab-content-box">
              <h2>Promociones Activas</h2>
              {promociones.length > 0 ? (
                <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                  {promociones.map((promo) => (
                    <PromocionCard key={promo.id_promocion} promocion={promo} />
                  ))}
                </div>
              ) : (
                <p>Este negocio no tiene promociones activas en este momento.</p>
              )}
            </div>
          )}

          {/* ----- RESEÑAS ----- */}
          {activeTab === "reviews" && (
            <BusinessReviews
              business={business}
              user={user}
              userType={userType}
              isAuthenticated={isAuthenticated}
            />
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
