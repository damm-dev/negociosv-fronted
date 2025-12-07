import React from 'react';
import '../styles/formNegocio.css'; 

const SuccessModal = ({ isOpen, onClose, title, message, btnText = "Continuar" }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {/* Icono animado de éxito */}
          <span className="modal-icon success-bounce">🎉</span>
          <h2 className="modal-title">{title}</h2>
        </div>
        
        <p className="modal-message">
          {message}
        </p>
        
        <div className="modal-buttons" style={{ justifyContent: 'center' }}>
          <button 
            className="modal-btn modal-btn-confirm" 
            onClick={onClose}
            style={{ width: '100%' }} 
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;