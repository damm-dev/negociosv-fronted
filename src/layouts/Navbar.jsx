// src/components/Navbar.jsx
import { useState } from "react";
import "../styles/navbar.css";
import { NavLink, useNavigate } from "react-router-dom";

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
      {/* cuadricula 3x2 */}
      <rect
        x="3"
        y="4"
        width="6"
        height="6"
        rx="1.3"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="10"
        y="4"
        width="6"
        height="6"
        rx="1.3"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="17"
        y="4"
        width="4"
        height="6"
        rx="1.3"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="3"
        y="13"
        width="8"
        height="7"
        rx="1.5"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="13"
        y="13"
        width="8"
        height="7"
        rx="1.5"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
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

/* ==== TABS EN ESPAÑOL ==== */

const TABS = [
  { id: "inicio", label: "Inicio", icon: HomeIcon, to: "/" },
  { id: "negocios", label: "Negocios", icon: NegociosIcon },
  { id: "logros", label: "Logros", icon: LogrosIcon },
  { id: "cuenta", label: "Cuenta", icon: CuentaIcon, to: "/cuenta" },
];


export default function Navbar() {
  const navigate = useNavigate();
  const [_, setDummy] = useState(false);
  const [activeTab, setActiveTab] = useState("inicio");

  return (
    <header className="layout-header">
      <div className="nav-bar">
        {/* IZQUIERDA: marca */}
        <div className="nav-brand">NegocioSV</div>

        {/* CENTRO: tabs */}
        <nav className="nav-center">
          <div className="nav-pill">
            {TABS.map(({ id, label, icon: Icon, to }) => (
              <button
                key={id}
                type="button"
                className={`nav-item ${
                  activeTab === id ? "nav-item--active" : ""
                }`}
                onClick={() => {
                  setActiveTab(id);
                  if (to) navigate(to);
                }}
              >
                <span className="nav-icon"><Icon active={activeTab === id} /></span>
                <span className="nav-label">{label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* DERECHA: botones sesión */}
        <div className="nav-actions">
          <button className="nav-btn nav-btn-outline" type="button" onClick={()=> navigate("/login")}>Iniciar sesión</button>
          <button className="nav-btn nav-btn-primary" type="button" onClick={()=> navigate("/account-type")}>Registrarse</button>
        </div>
      </div>
    </header>
  );
}
