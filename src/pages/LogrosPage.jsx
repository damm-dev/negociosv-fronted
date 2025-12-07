import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import logrosService from "../api/logrosService";
import "../styles/logros.css";

/* ==== COMPONENTE DE INSIGNIA CON SVG ==== */

function AchievementBadge({ achievement }) {
  const { id, title, description, icon, progress, total, completed } = achievement;
  const percentage = (progress / total) * 100;
  
  // Determinar el color basado en el progreso
  const getColorClass = () => {
    if (completed) return 'achievement-badge--completed';
    if (percentage >= 75) return 'achievement-badge--high';
    if (percentage >= 50) return 'achievement-badge--medium';
    if (percentage >= 25) return 'achievement-badge--low';
    return 'achievement-badge--none';
  };

  return (
    <div className={`achievement-badge ${getColorClass()}`}>
      <div className="achievement-icon-container">
        <div className="achievement-icon-bg">
          <div 
            className="achievement-icon-progress" 
            style={{ 
              clipPath: `inset(${100 - percentage}% 0 0 0)` 
            }}
          >
            {icon}
          </div>
          <div className="achievement-icon-gray">
            {icon}
          </div>
        </div>
        {completed && (
          <div className="achievement-checkmark">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
      
      <div className="achievement-content">
        <h3 className="achievement-title">{title}</h3>
        <p className="achievement-description">{description}</p>
        
        <div className="achievement-progress-container">
          <div className="achievement-progress-bar">
            <div 
              className="achievement-progress-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="achievement-progress-text">
            {progress} / {total}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ==== ICONOS SVG PARA LOGROS ==== */

function ExplorerIcon() {
  return (
    <svg viewBox="0 0 64 64" className="achievement-svg">
      <circle cx="32" cy="32" r="28" fill="currentColor" opacity="0.2"/>
      <path
        d="M32 8L36 24L48 20L40 32L56 36L40 40L48 52L36 44L32 60L28 44L16 52L24 40L8 36L24 32L16 20L28 24L32 8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LoyalCustomerIcon() {
  return (
    <svg viewBox="0 0 64 64" className="achievement-svg">
      <circle cx="32" cy="32" r="28" fill="currentColor" opacity="0.2"/>
      <path
        d="M32 12C26 12 20 16 20 22C20 30 32 42 32 42C32 42 44 30 44 22C44 16 38 12 32 12Z"
        fill="currentColor"
      />
      <circle cx="32" cy="22" r="4" fill="#fff"/>
    </svg>
  );
}

function LocalSupportIcon() {
  return (
    <svg viewBox="0 0 64 64" className="achievement-svg">
      <circle cx="32" cy="32" r="28" fill="currentColor" opacity="0.2"/>
      <path
        d="M32 16L28 28L16 32L28 36L32 48L36 36L48 32L36 28L32 16Z"
        fill="currentColor"
      />
      <circle cx="32" cy="32" r="6" fill="#fff"/>
    </svg>
  );
}

function SocialIcon() {
  return (
    <svg viewBox="0 0 64 64" className="achievement-svg">
      <circle cx="32" cy="32" r="28" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="24" r="6" fill="currentColor"/>
      <circle cx="40" cy="24" r="6" fill="currentColor"/>
      <circle cx="32" cy="40" r="6" fill="currentColor"/>
      <line x1="24" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth="3"/>
      <line x1="24" y1="24" x2="32" y2="40" stroke="currentColor" strokeWidth="3"/>
      <line x1="40" y1="24" x2="32" y2="40" stroke="currentColor" strokeWidth="3"/>
    </svg>
  );
}

function ReviewerIcon() {
  return (
    <svg viewBox="0 0 64 64" className="achievement-svg">
      <circle cx="32" cy="32" r="28" fill="currentColor" opacity="0.2"/>
      <path
        d="M32 16L35 26L45 26L37 32L40 42L32 36L24 42L27 32L19 26L29 26L32 16Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InfluencerIcon() {
  return (
    <svg viewBox="0 0 64 64" className="achievement-svg">
      <circle cx="32" cy="32" r="28" fill="currentColor" opacity="0.2"/>
      <path
        d="M32 12L38 24L52 26L42 36L44 50L32 44L20 50L22 36L12 26L26 24L32 12Z"
        fill="currentColor"
      />
      <circle cx="32" cy="32" r="8" fill="#fff"/>
    </svg>
  );
}

export default function LogrosPage() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState({
    completed: 0,
    total: 0,
    percentage: 0
  });

  useEffect(() => {
    cargarLogros();
  }, []);

  const cargarLogros = async () => {
    try {
      const data = await logrosService.obtenerLogros();
      
      // Mapear los logros del backend al formato del componente
      const logrosFormateados = data.logros.map(logro => {
        // Determinar el icono según el tipo
        let IconComponent;
        switch(logro.tipo) {
          case 'explorador':
            IconComponent = ExplorerIcon;
            break;
          case 'cliente_fiel':
            IconComponent = LoyalCustomerIcon;
            break;
          case 'apoyo_local':
            IconComponent = LocalSupportIcon;
            break;
          case 'social':
            IconComponent = SocialIcon;
            break;
          case 'critico':
            IconComponent = ReviewerIcon;
            break;
          case 'influencer':
            IconComponent = InfluencerIcon;
            break;
          default:
            IconComponent = ExplorerIcon;
        }

        return {
          id: logro.id,
          title: logro.nombre,
          description: logro.descripcion,
          icon: <IconComponent />,
          progress: logro.progreso || 0,
          total: logro.meta,
          completed: logro.completado || false
        };
      });

      setAchievements(logrosFormateados);

      // Usar las estadísticas del backend
      setStats({
        completed: data.completados,
        total: data.total,
        percentage: data.porcentaje_completado
      });
    } catch (error) {
      console.error('Error al cargar logros:', error);
      
      // Fallback a datos mock si falla la carga
      const mockAchievements = [
      {
        id: 1,
        title: "Explorador",
        description: "Visita 10 negocios distintos",
        icon: <ExplorerIcon />,
        progress: 7,
        total: 10,
        completed: false
      },
      {
        id: 2,
        title: "Cliente Fiel",
        description: "Guarda 5 negocios como favoritos",
        icon: <LoyalCustomerIcon />,
        progress: 5,
        total: 5,
        completed: true
      },
      {
        id: 3,
        title: "Apoyo Local",
        description: "Recomienda 3 negocios a otras personas",
        icon: <LocalSupportIcon />,
        progress: 2,
        total: 3,
        completed: false
      },
      {
        id: 4,
        title: "Social",
        description: "Sigue a 10 negocios en la plataforma",
        icon: <SocialIcon />,
        progress: 4,
        total: 10,
        completed: false
      },
      {
        id: 5,
        title: "Crítico",
        description: "Deja 5 reseñas en diferentes negocios",
        icon: <ReviewerIcon />,
        progress: 1,
        total: 5,
        completed: false
      },
      {
        id: 6,
        title: "Influencer",
        description: "Consigue que 20 personas visiten negocios por tu recomendación",
        icon: <InfluencerIcon />,
        progress: 0,
        total: 20,
        completed: false
      }
      ];

      setAchievements(mockAchievements);

      // Calcular estadísticas
      const completed = mockAchievements.filter(a => a.completed).length;
      const total = mockAchievements.length;
      const percentage = Math.round((completed / total) * 100);

      setStats({ completed, total, percentage });
    }
  };

  return (
    <div className="logros-page">
      <div className="logros-header">
        <div className="logros-header-content">
          <h1>Tus Logros</h1>
          <p>Completa desafíos y gana insignias mientras apoyas negocios locales</p>
        </div>
        
        <div className="logros-stats">
          <div className="logros-stat-card">
            <div className="logros-stat-number">{stats.completed}</div>
            <div className="logros-stat-label">Completados</div>
          </div>
          <div className="logros-stat-card">
            <div className="logros-stat-number">{stats.total}</div>
            <div className="logros-stat-label">Total</div>
          </div>
          <div className="logros-stat-card logros-stat-card--highlight">
            <div className="logros-stat-number">{stats.percentage}%</div>
            <div className="logros-stat-label">Progreso</div>
          </div>
        </div>
      </div>

      <div className="logros-container">
        <div className="logros-grid">
          {achievements.map(achievement => (
            <AchievementBadge key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>

      <div className="logros-footer">
        <p>¡Sigue explorando y apoyando negocios locales para desbloquear más logros!</p>
      </div>
    </div>
  );
}
