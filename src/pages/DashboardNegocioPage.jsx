import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard-negocio.css';

export default function DashboardNegocioPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    visualizaciones: 0,
    resenasTotal: 0,
    promedioCalificacion: 0,
    visitasHoy: 0,
  });

  useEffect(() => {
    // Aquí se cargarían las estadísticas reales desde la API
    // Por ahora usamos datos de ejemplo
    setStats({
      visualizaciones: 1234,
      resenasTotal: 45,
      promedioCalificacion: 4.5,
      visitasHoy: 23,
    });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard de tu Negocio</h1>
        <p className="dashboard-subtitle">
          Resumen de tu actividad y estadísticas
        </p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.visualizaciones.toLocaleString()}</h3>
            <p className="stat-label">Visualizaciones Totales</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.resenasTotal}</h3>
            <p className="stat-label">Reseñas Recibidas</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.visitasHoy}</h3>
            <p className="stat-label">Visitas Hoy</p>
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
          </div>
        </div>
      </div>

      {/* Sección de actividad reciente */}
      <div className="dashboard-section">
        <h2 className="section-title">Actividad Reciente</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">👁️</div>
            <div className="activity-content">
              <p className="activity-text">5 nuevas visualizaciones en tu perfil</p>
              <span className="activity-time">Hace 2 horas</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">⭐</div>
            <div className="activity-content">
              <p className="activity-text">Nueva reseña de 5 estrellas</p>
              <span className="activity-time">Hace 5 horas</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">📱</div>
            <div className="activity-content">
              <p className="activity-text">3 personas guardaron tu negocio</p>
              <span className="activity-time">Ayer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Consejos rápidos */}
      <div className="dashboard-section">
        <h2 className="section-title">Consejos para Mejorar</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">💡</div>
            <h3>Responde a las reseñas</h3>
            <p>Los negocios que responden tienen 30% más engagement</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">📸</div>
            <h3>Actualiza tus fotos</h3>
            <p>Fotos recientes atraen más clientes</p>
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
