import { useEffect, useState } from 'react';
import '../styles/loading-screen.css';

export default function LoadingScreen({ onLoadingComplete }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de recursos (mínimo 2 segundos para mostrar la animación)
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Esperar a que termine la animación de salida antes de notificar
      setTimeout(() => {
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      }, 600); // Duración de la animación de fade out
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isLoading) {
    return (
      <div className="loading-screen loading-screen--exit">
        <div className="loading-content">
          <div className="loading-logo-container">
            <img 
              src="/Banner.svg" 
              alt="NegocioSV" 
              className="loading-logo loading-logo--exit"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="loading-screen">
      <div className="loading-content">
        {/* Círculos animados de fondo */}
        <div className="loading-circles">
          <div className="loading-circle loading-circle--1"></div>
          <div className="loading-circle loading-circle--2"></div>
          <div className="loading-circle loading-circle--3"></div>
        </div>

        {/* Logo con animación */}
        <div className="loading-logo-container">
          <img 
            src="/Banner.svg" 
            alt="NegocioSV" 
            className="loading-logo"
          />
        </div>

        {/* Barra de progreso animada */}
        <div className="loading-progress">
          <div className="loading-progress-bar"></div>
        </div>

        {/* Texto de carga */}
        <div className="loading-text">
          <span className="loading-dot">.</span>
          <span className="loading-dot">.</span>
          <span className="loading-dot">.</span>
        </div>
      </div>
    </div>
  );
}
