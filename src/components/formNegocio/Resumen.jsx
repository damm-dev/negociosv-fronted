import React from 'react';
import '../../styles/formNegocio.css';

const Resumen = ({ formData, prevStep, submitForm }) => { // Asumimos que submitForm viene del padre

  const handleFinalSubmit = () => {
    // Aquí llamarías a la función real que envía a Laravel
    alert("¡Datos enviados al Backend! 🚀");
    // submitForm(); 
  };

  return (
    <div className="full-screen-container" style={{justifyContent: 'flex-start', paddingTop: '40px'}}>
      <h2 className="question-title">¡Todo listo!</h2>
      <p className="question-subtitle">Revisa que la información sea correcta.</p>

      <div className="summary-container">
        
        <div className="summary-item">
          <span className="summary-label">Negocio</span>
          <div className="summary-value">{formData.nombreNegocio}</div>
          <small>{formData.descripcionCorta}</small>
        </div>

        <div className="summary-item">
          <span className="summary-label">Ubicación</span>
          <div className="summary-value">{formData.direccionEscrita}</div>
        </div>

        <div className="summary-item">
          <span className="summary-label">Contacto</span>
          <div className="summary-value">{formData.contactoEmail}</div>
          <div className="summary-value">{formData.telefonoWhatsApp}</div>
        </div>

        <div className="summary-item">
          <span className="summary-label">Oferta y Pagos</span>
          <div className="summary-value">Ofrece: {formData.oferta?.join(', ')}</div>
          <div className="summary-value">Pagos: {formData.metodosPago?.join(', ')}</div>
        </div>

        {formData.logoPreview && (
          <div className="summary-item">
             <span className="summary-label">Logo</span>
             <img src={formData.logoPreview} alt="Logo" style={{width: '100px', borderRadius: '8px'}} />
          </div>
        )}

      </div>

      <div className="navigation-buttons">
        <button onClick={prevStep} className="btn-nav btn-prev">← Volver</button>
        <button onClick={handleFinalSubmit} className="btn-nav btn-next" style={{backgroundColor: '#10b981'}}>
          Confirmar Registro ✨
        </button>
      </div>
    </div>
  );
};

export default Resumen;