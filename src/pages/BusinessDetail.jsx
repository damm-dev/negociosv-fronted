// src/pages/BusinessDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/business-detail.css";
import { useAuth } from "../context/AuthContext";

const API_URL = `${import.meta.env.VITE_API_URL}/negocio`;

export default function BusinessDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, userType, isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState("general");
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Estado reseñas
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);
  const [isEditingReview, setIsEditingReview] = useState(false);

  // ===== ID y nombre del usuario actual =====
  // Ajusta estas líneas a tu estructura real de usuario si es necesario.
  const currentUserId =
    user?.perfil?.id ??
    user?.id ??
    user?.perfil_id ??
    user?.user_id ??
    null;

  const currentUserName =
    ((user?.perfil?.nombres || "") + " " + (user?.perfil?.apellidos || "")).trim() ||
    user?.name ||
    user?.nombre ||
    user?.email ||
    "Usuario";

  // Identificador estable usado en localStorage para asociar la reseña a este visitante/usuario.
  // Si no hay un id real, usamos el email como fallback (anon_email) cuando esté disponible.
  const storageUserId =
    currentUserId ?? (user?.email ? `anon_${user.email}` : null);

  // Solo usuarios "persona" pueden dejar reseñas
  // Si en tu AuthContext el tipo se llama "perfil" o algo así, cámbialo aquí:
  const isPerfilUser = isAuthenticated() && userType === "persona";

  // ========== CARGAR NEGOCIO DESDE API ==========
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

  // ========== CARGAR Y "MIGRAR" RESEÑAS DESDE localStorage ==========
  useEffect(() => {
    if (!business) return;
    const safeId = business.id ?? business.name ?? "unknown";
    const key = `reviews_${String(safeId)}`;
    const stored = localStorage.getItem(key);
    let parsed = [];

    if (stored) {
      try {
        parsed = JSON.parse(stored);
      } catch {
        parsed = [];
      }
    }

    // MIGRACIÓN: si hay reseñas viejas sin userId pero con el mismo nombre que el usuario actual,
    // les asignamos currentUserId para que queden bien ligadas.
    if (currentUserId && currentUserName) {
      let changed = false;
      parsed = parsed.map((r) => {
        if (!r.userId && r.userName === currentUserName) {
          changed = true;
          return { ...r, userId: currentUserId };
        }
        return r;
      });

      if (changed) {
        localStorage.setItem(key, JSON.stringify(parsed));
      }
    }

    setReviews(parsed);

    if (storageUserId && isAuthenticated()) {
      const existing = parsed.find((r) => r.userId === storageUserId);
      if (existing) {
        setHasReviewed(true);
        setUserRating(existing.rating);
        setUserComment(existing.comment);
        setIsEditingReview(false);
      } else {
        setHasReviewed(false);
        setUserRating(0);
        setUserComment("");
        setIsEditingReview(false);
      }
    }
  }, [business, currentUserId, currentUserName, isAuthenticated]);

  // ========== ENVIAR / ACTUALIZAR RESEÑA ==========
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!business) return;
    if (!userRating || !userComment.trim()) return;
    if (!isAuthenticated()) return; // solo usuarios autenticados pueden guardar

    const safeId = business.id ?? business.name ?? "unknown";
    const key = `reviews_${String(safeId)}`;

    // userId fallback para usuarios que no tengan un id claro en el objeto user
    // Use the same storageUserId as above; if missing, create a temporary anon id
    const storageUserIdLocal = storageUserId ?? `anon_${Date.now()}`;

    console.log("[Reviews] Guardando reseña -> key:", key, "userId:", storageUserId);

    const newReview = {
      userId: storageUserIdLocal,
      userName: currentUserName.trim() || "Usuario",
      rating: userRating,
      comment: userComment.trim(),
      createdAt: new Date().toISOString(),
    };

    // Reemplazamos la reseña de este usuario (o la creamos si no existía)
    const filtered = reviews.filter((r) => r.userId !== currentUserId);
    const updated = [...filtered, newReview];

    setReviews(updated);
    setHasReviewed(true);
    setIsEditingReview(false);
    localStorage.setItem(key, JSON.stringify(updated));
    console.log("[Reviews] Guardado localStorage:", localStorage.getItem(key));
  };

  // ========== ELIMINAR RESEÑA ==========
  const handleDeleteReview = () => {
    if (!business) return;

    const safeId = business.id ?? business.name ?? "unknown";
    const key = `reviews_${String(safeId)}`;
    const storageUserIdLocal = storageUserId ?? (user?.email ? `anon_${user.email}` : null);
    const updated = storageUserIdLocal
      ? reviews.filter((r) => r.userId !== storageUserIdLocal)
      : reviews;

    setReviews(updated);
    setHasReviewed(false);
    setIsEditingReview(false);
    setUserRating(0);
    setUserComment("");
    localStorage.setItem(key, JSON.stringify(updated));
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

  const renderStars = (value) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i}>{i < value ? "★" : "☆"}</span>
    ));

  const myReview = storageUserId && reviews.find((r) => r.userId === storageUserId);

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

              {/* Lista de reseñas */}
              {reviews.length === 0 && (
                <p>Aún no hay reseñas para este negocio.</p>
              )}

              {reviews.length > 0 && (
                <div className="reviews-list">
                  {reviews.map((r) => (
                    <div key={r.userId ?? r.userName} className="review-item">
                      <div className="review-header">
                        <strong>{r.userName}</strong>
                        <span className="review-stars">
                          {renderStars(r.rating)}
                        </span>
                      </div>
                      <p className="review-comment">{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Bloque "tu reseña" con editar / eliminar */}
              {isPerfilUser && myReview && !isEditingReview && (
                <div className="my-review-box">
                  <div className="my-review-header">
                    <span className="my-review-label">Tu reseña</span>
                    <span className="review-stars">
                      {renderStars(myReview.rating)}
                    </span>
                  </div>
                  <p className="review-comment">{myReview.comment}</p>
                  <div className="review-my-actions">
                    <button
                      type="button"
                      className="review-edit-btn"
                      onClick={() => {
                        setIsEditingReview(true);
                        setUserRating(myReview.rating);
                        setUserComment(myReview.comment);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="review-delete-btn"
                      onClick={handleDeleteReview}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )}

              {/* Formulario (crear o editar reseña) */}
              {isPerfilUser ? (
                (!hasReviewed || isEditingReview) && (
                  <form
                    className="review-form"
                    onSubmit={handleSubmitReview}
                    style={{ marginTop: "1.5rem" }}
                  >
                    <h3>
                      {isEditingReview
                        ? "Editar tu reseña"
                        : "Deja tu reseña"}
                    </h3>

                    <div className="rating-input">
                      <span>Tu calificación: </span>
                      {Array.from({ length: 5 }, (_, i) => {
                        const value = i + 1;
                        return (
                          <button
                            key={value}
                            type="button"
                            className={
                              value <= userRating
                                ? "star-btn active"
                                : "star-btn"
                            }
                            onClick={() => setUserRating(value)}
                          >
                            {value <= userRating ? "★" : "☆"}
                          </button>
                        );
                      })}
                    </div>

                    <textarea
                      className="review-textarea"
                      placeholder="Escribe tu comentario..."
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      rows={4}
                    />

                    <button
                      className="review-submit-btn"
                      type="submit"
                      disabled={!userRating || !userComment.trim()}
                    >
                      {isEditingReview
                        ? "Actualizar reseña"
                        : "Enviar reseña"}
                    </button>
                  </form>
                )
              ) : (
                <p style={{ marginTop: "1rem", color: "#6b7280" }}>
                  Inicia sesión con un perfil para dejar tu reseña.
                </p>
              )}
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
