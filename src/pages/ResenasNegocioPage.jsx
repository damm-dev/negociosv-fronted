import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import authService from '../api/authService';
import '../styles/resenas-negocio.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function ResenasNegocioPage() {
  const { user: contextUser } = useAuth();
  const [resenas, setResenas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Si el contexto no tiene el usuario, intentar obtenerlo del localStorage directamente
  const currentUser = contextUser || authService.getCurrentUser()?.data || null;

  // Obtener ID del negocio del usuario autenticado
  // El negocio tiene la propiedad id_negocio dentro del objeto negocio
  const negocioId = 
    currentUser?.negocio?.id_negocio ?? 
    currentUser?.negocio?.id ?? 
    currentUser?.negocioId ?? 
    currentUser?.id_negocio ?? 
    currentUser?.id ?? 
    currentUser?.pk ?? 
    null;

  // Cargar reseñas desde el backend
  useEffect(() => {
    if (!negocioId) {
      setError("No se encontró el ID del negocio.");
      return;
    }

    const loadResenas = async () => {
      setIsLoading(true);
      setError("");

      try {
        const { data } = await axios.get(`${API_URL}/negocio/${negocioId}/resenas`);
        
        // Acepta array directo o { data: [...] }
        const list = Array.isArray(data) ? data : data.data ?? [];

        const mapped = list.map((r) => {
          const usuario = r.usuario ?? {};
          const perfil = usuario.perfil ?? {};

          const nameFromPerfil = `${perfil.nombres ?? ""} ${perfil.apellidos ?? ""}`.trim();

          return {
            id: r.id_resena,
            usuario: nameFromPerfil || usuario.name || usuario.nombre || usuario.email || "Usuario",
            calificacion: r.calificacion,
            comentario: r.comentario,
            fecha: r.created_at,
            respondida: false,
          };
        });

        setResenas(mapped);
      } catch (err) {
        console.error("Error cargando reseñas:", err);
        setError("No se pudieron cargar las reseñas. Intenta más tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    loadResenas();
  }, [negocioId]);

  const renderEstrellas = (calificacion) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`estrella ${i < calificacion ? 'llena' : 'vacia'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="resenas-container">
      <div className="resenas-header">
        <h1>Reseñas de tu Negocio</h1>
        <p className="resenas-subtitle">
          Visualiza las opiniones de tus clientes
        </p>
      </div>

      {isLoading && <p className="loading-message">Cargando reseñas...</p>}

      {error && <p className="error-message">{error}</p>}

      {!isLoading && resenas.length === 0 && (
        <p className="no-reviews-message">Aún no hay reseñas para tu negocio.</p>
      )}

      {!isLoading && resenas.length > 0 && (
        <>
          {/* Resumen de calificaciones */}
          <div className="calificacion-resumen">
            <div className="calificacion-principal">
              <div className="calificacion-numero">
                {(
                  resenas.reduce((sum, r) => sum + r.calificacion, 0) / resenas.length
                ).toFixed(1)}
              </div>
              <div className="calificacion-estrellas">
                {renderEstrellas(
                  Math.round(
                    resenas.reduce((sum, r) => sum + r.calificacion, 0) / resenas.length
                  )
                )}
              </div>
              <p className="calificacion-total">{resenas.length} reseñas totales</p>
            </div>

            <div className="calificacion-desglose">
              {[5, 4, 3, 2, 1].map((num) => {
                const count = resenas.filter((r) => r.calificacion === num).length;
                const porcentaje = (count / resenas.length) * 100;
                return (
                  <div key={num} className="calificacion-barra-item">
                    <span className="calificacion-numero-pequeno">{num} ★</span>
                    <div className="calificacion-barra">
                      <div
                        className="calificacion-barra-fill"
                        style={{ width: `${porcentaje}%` }}
                      ></div>
                    </div>
                    <span className="calificacion-count">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lista de reseñas (solo lectura) */}
          <div className="resenas-lista">
            <h2 className="section-title">Todas las Reseñas</h2>
            {resenas.map((resena) => (
              <div key={resena.id} className="resena-card">
                <div className="resena-header">
                  <div className="resena-usuario">
                    <div className="resena-avatar">
                      {resena.usuario.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="resena-nombre">{resena.usuario}</h3>
                      <p className="resena-fecha">
                        {new Date(resena.fecha).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="resena-calificacion">
                    {renderEstrellas(resena.calificacion)}
                  </div>
                </div>

                <p className="resena-comentario">{resena.comentario}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
