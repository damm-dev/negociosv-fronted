import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initDraggableClosing } from "../utils/draggableInit";
import "../styles/account-type.css";

function BusinessIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="at-icon-svg">
      <rect
        x="3.5"
        y="7"
        width="17"
        height="11"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9 10h1.8M13.2 10H15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M9.5 7V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="at-icon-svg">
      <circle
        cx="12"
        cy="9"
        r="3.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M6.5 18.3c.7-2.2 2.5-3.6 5.5-3.6s4.8 1.4 5.5 3.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AccountTypePage() {
  const navigate = useNavigate();
  
  // Inicializar draggable cuando el componente se monta
  useEffect(() => {
    initDraggableClosing();
  }, []);

  const handleBusinessClick = () => {
    navigate("/register/negocio");
  };

  const handlePersonClick = () => {
    navigate("/register/persona");
  };

  return (
    <div className="account-type-page" data-draggable-closing="true">
      <button 
        className="account-type-close-btn"
        onClick={() => navigate('/')}
        aria-label="Volver al inicio"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="account-type-content">
      {/* Indicador de arrastrar para cerrar (solo móvil) */}
      <div className="drag-indicator" data-draggable-handle>
        <div className="drag-indicator-bar"></div>
      </div>
      
      <div className="account-type-header">
        <h1>Bienvenido</h1>
        <p>¿Qué tipo de cuenta deseas crear?</p>
      </div>

      <div className="account-type-grid">
        {/* Card Negocio */}
        <button
          type="button"
          className="account-card account-card--business"
          onClick={handleBusinessClick}
        >
          <div className="account-card-icon-wrapper account-card-icon--business">
            <BusinessIcon />
          </div>
          <div className="account-card-body">
            <h2>Negocio</h2>
            <p>
              Registra tu negocio para aumentar tu visibilidad y llegar a más
              clientes en El Salvador.
            </p>
          </div>
        </button>

        {/* Card Persona */}
        <button
          type="button"
          className="account-card account-card--person"
          onClick={handlePersonClick}
        >
          <div className="account-card-icon-wrapper account-card-icon--person">
            <PersonIcon />
          </div>
          <div className="account-card-body">
            <h2>Persona</h2>
            <p>
              Descubre negocios locales, guarda tus favoritos y apoya a
              emprendedores salvadoreños.
            </p>
          </div>
        </button>
      </div>

      <p className="account-type-hint">
        Podrás cambiar información de tu perfil más adelante desde la sección
        <span> Cuenta</span>.
      </p>
      </div>
    </div>
  );
}
