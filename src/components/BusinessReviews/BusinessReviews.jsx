// src/components/BusinessReviews/BusinessReviews.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "./business-reviews.css";

const API_URL = import.meta.env.VITE_API_URL || "https://negociosv.com/api";

export default function BusinessReviews({
  business,
  user,
  userType,
  isAuthenticated,
}) {
  // ----- estado reseñas -----
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);
  const [isEditingReview, setIsEditingReview] = useState(false);

  const [reviewError, setReviewError] = useState("");
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ===== ID y nombre del usuario actual =====
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

  // Solo usuarios con perfil "persona" pueden dejar reseñas (no negocios)
  const isAuth =
    typeof isAuthenticated === "function" &&
    isAuthenticated() &&
    userType === "persona";

  // ID del negocio (soporta varias formas)
  const negocioId =
    business?.id_negocio ??
    business?.id ??
    business?.raw?.id_negocio ??
    business?.raw?.id ??
    null;

  // ========= OBTENER TOKEN SIN TOCAR OTROS CÓDIGOS =========
  const getAuthToken = () => {
    // Claves típicas
    const direct =
      localStorage.getItem("token") ||
      localStorage.getItem("auth_token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("access_token") ||
      localStorage.getItem("accessToken");

    if (direct) return direct;

    // Fallback: buscar cualquier clave que contenga "token"
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.toLowerCase().includes("token")) {
        const value = localStorage.getItem(key);
        if (value) return value;
      }
    }

    return null;
  };

  // ========= CARGAR RESEÑAS DESDE EL BACKEND =========
  useEffect(() => {
    if (!business || !negocioId) return;

    const fetchReviews = async () => {
      setIsLoadingReviews(true);
      setReviewError("");

      try {
        const { data } = await axios.get(
          `${API_URL}/negocio/${negocioId}/resenas`
        );

        // Acepta tanto array directo como { data: [...] }
        const list = Array.isArray(data) ? data : data.data ?? [];

        const mapped = list.map((r) => {
          const usuario = r.usuario ?? {};
          const perfil = usuario.perfil ?? {};

          const nameFromPerfil = `${perfil.nombres ?? ""} ${perfil.apellidos ?? ""
            }`.trim();

          return {
            id: r.id_resena,
            userId: r.id_usuario,
            userName:
              nameFromPerfil ||
              usuario.name ||
              usuario.nombre ||
              usuario.email ||
              "Usuario",
            rating: r.calificacion,
            comment: r.comentario,
            createdAt: r.created_at,
          };
        });

        setReviews(mapped);

        // Detectar si el usuario actual ya ha reseñado.
        // Preferimos comparar por id si existe, si no, por nombre (fallback).
        let mine = null;
        if (currentUserId) {
          mine = mapped.find((rv) => rv.userId === currentUserId);
        } else {
          mine = mapped.find((rv) => rv.userName === currentUserName);
        }

        if (mine) {
          setHasReviewed(true);
          setUserRating(mine.rating);
          setUserComment(mine.comment);
          setIsEditingReview(false);
        } else {
          setHasReviewed(false);
          setUserRating(0);
          setUserComment("");
          setIsEditingReview(false);
        }
      } catch (error) {
        console.error("Error cargando reseñas:", error);
        setReviewError("No se pudieron cargar las reseñas. Intenta más tarde.");
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [business, negocioId, currentUserId]);

  const myReview = currentUserId
    ? reviews.find((r) => r.userId === currentUserId)
    : reviews.find((r) => r.userName === currentUserName);

  // ========= ENVIAR / ACTUALIZAR RESEÑA (API) =========
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setReviewError("");

    if (!business || !negocioId) {
      setReviewError("No se encontró el negocio.");
      return;
    }

    if (!userRating || !userComment.trim()) {
      setReviewError("Debes colocar una calificación y un comentario.");
      return;
    }

    if (!(typeof isAuthenticated === "function" && isAuthenticated())) {
      setReviewError("Debes iniciar sesión para dejar una reseña.");
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setReviewError("No se encontró el token de autenticación.");
      return;
    }

    setIsSubmitting(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Si ya tiene reseña y está en modo edición → PUT
      if (myReview && isEditingReview) {
        const { data } = await axios.put(
          `${API_URL}/resena/${myReview.id}`,
          {
            comentario: userComment.trim(),
            calificacion: userRating,
          },
          config
        );

        const resenaActualizada = data.data ?? data;

        const updatedReviews = reviews.map((r) =>
          r.id === myReview.id
            ? {
              ...r,
              rating: resenaActualizada.calificacion,
              comment: resenaActualizada.comentario,
            }
            : r
        );

        setReviews(updatedReviews);
        setIsEditingReview(false);
        setHasReviewed(true);
      } else {
        // Crear nueva reseña → POST
        const { data } = await axios.post(
          `${API_URL}/negocio/${negocioId}/resena`,
          {
            comentario: userComment.trim(),
            calificacion: userRating,
          },
          config
        );

        const nuevaResena = data.data ?? data;

        const assignedUserId = currentUserId ?? nuevaResena.id_usuario;

        const newReview = {
          id: nuevaResena.id_resena,
          userId: assignedUserId,
          userName: currentUserName,
          rating: nuevaResena.calificacion,
          comment: nuevaResena.comentario,
          createdAt: nuevaResena.created_at,
        };

        // Reemplazar reseña existente del mismo usuario por si la API lo permite
        const filtered = reviews.filter((r) => r.userId !== assignedUserId);
        const updatedList = [...filtered, newReview];
        setReviews(updatedList);
        // Aseguramos que el estado local refleje la reseña recién creada
        setUserRating(newReview.rating);
        setUserComment(newReview.comment);
        setHasReviewed(true);
        setIsEditingReview(false);
      }
    } catch (error) {
      console.error("Error al enviar la reseña:", error);

      if (error.response?.status === 422) {
        setReviewError(
          error.response.data?.message ||
          "Revisa los datos de la reseña e inténtalo de nuevo."
        );
      } else if (error.response?.status === 403) {
        setReviewError("No tienes permiso para realizar esta acción.");
      } else {
        setReviewError("Ocurrió un error al guardar la reseña.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ========= ELIMINAR RESEÑA (API) =========
  const handleDeleteReview = async () => {
    setReviewError("");

    if (!myReview) return;

    if (!(typeof isAuthenticated === "function" && isAuthenticated())) {
      setReviewError("Debes iniciar sesión para eliminar tu reseña.");
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setReviewError("No se encontró el token de autenticación.");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`${API_URL}/resena/${myReview.id}`, config);

      const updated = reviews.filter((r) => r.id !== myReview.id);
      setReviews(updated);
      setHasReviewed(false);
      setIsEditingReview(false);
      setUserRating(0);
      setUserComment("");
    } catch (error) {
      console.error("Error al eliminar la reseña:", error);
      if (error.response?.status === 403) {
        setReviewError("No tienes permiso para eliminar esta reseña.");
      } else {
        setReviewError("Ocurrió un error al eliminar la reseña.");
      }
    }
  };

  const renderStars = (value) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i}>{i < value ? "★" : "☆"}</span>
    ));

  return (
    <div className="tab-content-box business-reviews">
      <h2>Reseñas</h2>

      {isLoadingReviews && <p>Cargando reseñas...</p>}

      {/* Lista de reseñas */}
      {!isLoadingReviews && reviews.length === 0 && (
        <p>Aún no hay reseñas para este negocio.</p>
      )}

      {!isLoadingReviews && reviews.length > 0 && (
        <div className="reviews-list">
          {reviews.map((r) => (
            <div key={r.id} className="review-item">
              <div className="review-header">
                <strong>{r.userName}</strong>
                <span className="review-stars">{renderStars(r.rating)}</span>
              </div>
              <p className="review-comment">{r.comment}</p>
            </div>
          ))}
        </div>
      )}

      {/* Bloque "tu reseña" con editar / eliminar */}
      {isAuth && myReview && !isEditingReview && (
        <div className="my-review-box">
          <div className="my-review-header">
            <span className="my-review-label">Tu reseña</span>
            <span className="review-stars">{renderStars(myReview.rating)}</span>
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
      {isAuth ? (
        (!hasReviewed || isEditingReview) && (
          <form
            className="review-form"
            onSubmit={handleSubmitReview}
            style={{ marginTop: "1.5rem" }}
          >
            <h3>
              {isEditingReview ? "Editar tu reseña" : "Deja tu reseña"}
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
                      value <= userRating ? "star-btn active" : "star-btn"
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

            {reviewError && <p className="review-error">{reviewError}</p>}

            <button
              className="review-submit-btn"
              type="submit"
              disabled={isSubmitting || !userRating || !userComment.trim()}
            >
              {isEditingReview
                ? isSubmitting
                  ? "Actualizando..."
                  : "Actualizar reseña"
                : isSubmitting
                  ? "Enviando..."
                  : "Enviar reseña"}
            </button>
          </form>
        )
      ) : (
        <p className="review-login-message">
          {!isAuthenticated || !(typeof isAuthenticated === "function" && isAuthenticated())
            ? "Inicia sesión para dejar tu reseña."
            : userType === "negocio"
              ? "Los negocios no pueden dejar reseñas."
              : "Inicia sesión con un perfil de persona para dejar tu reseña."}
        </p>
      )}
    </div>
  );
}
