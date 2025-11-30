import React from 'react';
import '../styles/progress-bar.css';

/**
 * Componente de barra de progreso animada
 * @param {number} currentStep - Paso actual
 * @param {number} totalSteps - Total de pasos
 * @param {string} label - Etiqueta opcional
 */
export default function ProgressBar({ currentStep, totalSteps, label }) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-header">
        <span className="progress-bar-label">
          {label || `Paso ${currentStep} de ${totalSteps}`}
        </span>
        <span className="progress-bar-percentage">{percentage}%</span>
      </div>
      
      <div className="progress-bar-track">
        <div 
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        >
          <div className="progress-bar-shine"></div>
        </div>
      </div>

      {/* Indicadores de pasos */}
      <div className="progress-bar-steps">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`progress-step ${
              index + 1 < currentStep
                ? 'completed'
                : index + 1 === currentStep
                ? 'active'
                : 'pending'
            }`}
          >
            {index + 1 < currentStep ? (
              <svg viewBox="0 0 24 24" className="step-check">
                <path
                  d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <span className="step-number">{index + 1}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
