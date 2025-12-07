import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard-negocio.css';

const API_URL = "http://127.0.0.1:8000/api";

export default function DashboardNegocioPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalResenas: 0,
    promedioCalificacion: 0,
    totalFavoritos: 0,
    totalSeguidores: 0,
    resenasHoy: 0,
    nuevosSeguidoresSemana: 0,
    nuevosFavoritosSemana: 0,
  });
  const [actividad, setActividad] = useState([]);
  const [negocio, setNegocio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
          setError('No hay sesión activa');
          setLoading(false);
          return;
        }

        const { data } = await axios.get(`${API_URL}/dashboard/estadisticas`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (data.success) {
          setStats({
            totalResenas: data.estadisticas.total_resenas || 0,
            promedioCalificacion: data.estadisticas.promedio_calificacion || 0,
            totalFavoritos: data.estadisticas.total_favoritos || 0,
            totalSeguidores: data.estadisticas.total_seguidores || 0,
            resenasHoy: data.estadisticas.resenas_hoy || 0,
            nuevosSeguidoresSemana: data.estadisticas.nuevos_seguidores_semana || 0,
            nuevosFavoritosSemana: data.estadisticas.nuevos_favoritos_semana || 0,
          });
          setActividad(data.actividad_reciente || []);
          setNegocio(data.negocio || null);
        }
      } catch (err) {
        console.error('Error cargando dashboard:', err);
        setError('Error al cargar las estadísticas');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const nombreNegocio = negocio?.nombre || user?.negocio?.nombre || 'tu Negocio';

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Cargando Dashboard...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard de {nombreNegocio}</h1>
        <p className="dashboard-subtitle">
          Resumen de tu actividad y estadísticas en tiempo real
        </p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.totalSeguidores}</h3>
            <p className="stat-label">Seguidores</p>
            {stats.nuevosSeguidoresSemana > 0 && (
              <span className="stat-badge positive">+{stats.nuevosSeguidoresSemana} esta semana</span>
            )}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.totalResenas}</h3>
            <p className="stat-label">Reseñas Recibidas</p>
            {stats.resenasHoy > 0 && (
              <span className="stat-badge positive">+{stats.resenasHoy} hoy</span>
            )}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.totalFavoritos}</h3>
            <p className="stat-label">Guardados como Favorito</p>
            {stats.nuevosFavoritosSemana > 0 && (
              <span className="stat-badge positive">+{stats.nuevosFavoritosSemana} esta semana</span>
            )}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.promedioCalificacion.toFixed(1)}</h3>
            <p className="stat-label">Calificación Promedio</p>
            <span className="stat-stars">
              {'★'.repeat(Math.round(stats.promedioCalificacion))}
              {'☆'.repeat(5 - Math.round(stats.promedioCalificacion))}
            </span>
          </div>
        </div>
      </div>

      {/* Sección de actividad reciente */}
      <div className="dashboard-section">
        <h2 className="section-title">Actividad Reciente</h2>
        <div className="activity-list">
          {actividad.length > 0 ? (
            actividad.map((item, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">{item.icono}</div>
                <div className="activity-content">
                  <p className="activity-text">{item.texto}</p>
                  <span className="activity-time">{item.tiempo}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="activity-empty">
              <p>No hay actividad reciente</p>
              <span>Las reseñas y nuevos seguidores aparecerán aquí</span>
            </div>
          )}
        </div>
      </div>

      {/* Consejos rápidos */}
      <div className="dashboard-section">
        <h2 className="section-title">Consejos para Mejorar</h2>
        <div className="tips-grid">
          {stats.totalResenas === 0 && (
            <div className="tip-card">
              <div className="tip-icon">⭐</div>
              <h3>Consigue tu primera reseña</h3>
              <p>Pide a tus clientes satisfechos que dejen una reseña en la plataforma</p>
            </div>
          )}
          {stats.totalSeguidores < 10 && (
            <div className="tip-card">
              <div className="tip-icon">👥</div>
              <h3>Aumenta tus seguidores</h3>
              <p>Comparte tu perfil en redes sociales para ganar más visibilidad</p>
            </div>
          )}
          <div className="tip-card">
            <div className="tip-icon">📸</div>
            <h3>Actualiza tus fotos</h3>
            <p>Fotos recientes y de calidad atraen más clientes</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🎯</div>
            <h3>Crea promociones</h3>
            <p>Las promociones aumentan las visitas en un 40%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
