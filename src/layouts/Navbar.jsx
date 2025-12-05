// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import "../styles/navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/* ==== ICONOS SVG CLAROS ==== */

function HomeIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="nav-svg-icon">
      {/* casita */}
      <path
        d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4.5a.5.5 0 0 1-.5-.5V15h-4v5.5a.5.5 0 0 1-.5.5H5a1 1 0 0 1-1-1v-8.5Z"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NegociosIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="nav-svg-icon">
      {/* brújula - círculo se rellena cuando está activo */}
      <circle
        cx="12"
        cy="12"
        r="9"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Centro y aguja - blanco cuando activo */}
      <circle
        cx="12"
        cy="12"
        r="2"
        fill={active ? "#ffffff" : "currentColor"}
      />
      <path
        d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"
        fill={active ? "#ffffff" : "none"}
        stroke={active ? "#ffffff" : "currentColor"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogrosIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="nav-svg-icon">
      {/* trofeo */}
      <path
        d="M8 5h8v3a4 4 0 0 1-4 4 4 4 0 0 1-4-4V5Z"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 16h4v2.5H9.5a.5.5 0 0 1-.5-.5V17a1 1 0 0 1 1-1Z"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8H6a2 2 0 0 1-2-2V5.5A1.5 1.5 0 0 1 5.5 4H8m8 4h2a2 2 0 0 0 2-2V5.5A1.5 1.5 0 0 0 18.5 4H16"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DashboardIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="nav-svg-icon">
      {/* dashboard con gráficas */}
      <rect
        x="3"
        y="3"
        width="7"
        height="7"
        rx="1.5"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="14"
        y="3"
        width="7"
        height="7"
        rx="1.5"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="3"
        y="14"
        width="7"
        height="7"
        rx="1.5"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="14"
        y="14"
        width="7"
        height="7"
        rx="1.5"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function ResenasIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="nav-svg-icon">
      {/* estrella de reseñas */}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PromocionesIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="nav-svg-icon">
      {/* etiqueta de promoción */}
      <path
        d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="7" r="1.5" fill="currentColor" />
    </svg>
  );
}

function CuentaIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="nav-svg-icon">
      {/* usuario */}
      <circle
        cx="12"
        cy="9"
        r="3.2"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M6.5 18.5c.7-2.4 2.5-3.8 5.5-3.8s4.8 1.4 5.5 3.8"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ==== TABS PARA USUARIOS PERSONA ==== */
const TABS_PERSONA = [
  { id: "inicio", label: "Inicio", icon: HomeIcon, to: "/" },
  { id: "negocios", label: "Descubrir", icon: NegociosIcon, to: "/negocios" },
  { id: "logros", label: "Logros", icon: LogrosIcon, to: "/logros" },
  { id: "cuenta", label: "Cuenta", icon: CuentaIcon, to: "/cuenta", mobileOnly: true },
];

/* ==== TABS PARA USUARIOS NEGOCIO ==== */
const TABS_NEGOCIO = [
  { id: "dashboard", label: "Dashboard", icon: DashboardIcon, to: "/dashboard" },
  { id: "resenas", label: "Reseñas", icon: ResenasIcon, to: "/resenas" },
  { id: "promociones", label: "Promociones", icon: PromocionesIcon, to: "/promociones" },
  { id: "cuenta", label: "Cuenta", icon: CuentaIcon, to: "/cuenta", mobileOnly: true },
];


export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userType, isAuthenticated } = useAuth();
  const [_, setDummy] = useState(false);
  const [activeTab, setActiveTab] = useState("inicio");
  const pillRef = useState(null)[0];

  // Determinar qué tabs mostrar según el tipo de usuario
  // Si es persona y NO está autenticado, filtrar el tab de logros
  const TABS = userType === 'negocio' 
    ? TABS_NEGOCIO 
    : isAuthenticated() 
      ? TABS_PERSONA 
      : TABS_PERSONA.filter(tab => tab.id !== 'logros');

  // Actualizar posición de la barrita indicadora
  useEffect(() => {
    const updateIndicator = () => {
      const pill = document.querySelector('.nav-pill');
      const activeButton = document.querySelector('.nav-item--active');
      
      if (pill && activeButton) {
        const pillRect = pill.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        
        const left = buttonRect.left - pillRect.left + 12;
        const width = buttonRect.width - 24;
        
        pill.style.setProperty('--indicator-left', `${left}px`);
        pill.style.setProperty('--indicator-width', `${width}px`);
      }
    };

    // Actualizar inmediatamente y después de un pequeño delay para asegurar que el DOM esté listo
    updateIndicator();
    setTimeout(updateIndicator, 100);
    
    // Actualizar en resize
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeTab, userType, isAuthenticated()]); // Agregado isAuthenticated para recalcular cuando cambia

  // Actualizar tab activo basado en la ruta actual
  useEffect(() => {
    const path = location.pathname;
    if (path === '/cuenta') {
      setActiveTab('cuenta');
    } else if (path === '/' || path === '/dashboard') {
      setActiveTab(userType === 'negocio' ? 'dashboard' : 'inicio');
    } else if (path === '/negocios') {
      setActiveTab('negocios');
    } else if (path.includes('logros')) {
      setActiveTab('logros');
    } else if (path === '/resenas') {
      setActiveTab('resenas');
    } else if (path === '/promociones') {
      setActiveTab('promociones');
    }
  }, [location.pathname, userType]);

  // Obtener iniciales del usuario
  const getInitials = () => {
    if (!user?.perfil) return "U";
    const nombres = user.perfil.nombres || "";
    const apellidos = user.perfil.apellidos || "";
    return `${nombres.charAt(0)}${apellidos.charAt(0)}`.toUpperCase();
  };

  // Obtener nombre completo
  const getFullName = () => {
    if (!user?.perfil) return "Usuario";
    return `${user.perfil.nombres || ""} ${user.perfil.apellidos || ""}`.trim();
  };

  return (
    <header className="layout-header">
      <div className="nav-bar">
        {/* IZQUIERDA: marca con logo */}
        <div className="nav-brand" onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>
          <img src="/Banner.svg" alt="NegocioSV" className="nav-brand-logo" />
        </div>

        {/* CENTRO: tabs */}
        <nav className="nav-center">
          <div className="nav-pill">
            {TABS.map(({ id, label, icon: Icon, to, mobileOnly }) => (
              <button
                key={id}
                type="button"
                className={`nav-item ${
                  activeTab === id ? "nav-item--active" : ""
                } ${mobileOnly ? "nav-item--mobile-only" : ""}`}
                onClick={() => {
                  setActiveTab(id);
                  // Si es el botón de cuenta y no está autenticado, redirigir a crear cuenta
                  if (id === "cuenta" && !isAuthenticated()) {
                    navigate("/account-type");
                  } else if (to) {
                    navigate(to);
                  }
                }}
                data-tooltip={label}
              >
                <span className="nav-icon">
                  {id === "cuenta" && isAuthenticated() ? (
                    <div className="nav-mobile-avatar">
                      <span>{getInitials()}</span>
                    </div>
                  ) : (
                    <Icon active={activeTab === id} />
                  )}
                </span>
                <span className="nav-label">{label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* DERECHA: botones sesión o perfil de usuario */}
        <div className="nav-actions">
          {isAuthenticated() ? (
            <button 
              className="nav-user-profile" 
              type="button" 
              onClick={() => navigate("/cuenta")}
              title="Ver mi cuenta"
            >
              <div className="nav-user-avatar">
                <span>{getInitials()}</span>
              </div>
              <span className="nav-user-name">{getFullName()}</span>
            </button>
          ) : (
            <>
              <button className="nav-btn nav-btn-outline" type="button" onClick={() => navigate("/login")}>
                Iniciar sesión
              </button>
              <button className="nav-btn nav-btn-primary" type="button" onClick={() => navigate("/account-type")}>
                Registrarse
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
