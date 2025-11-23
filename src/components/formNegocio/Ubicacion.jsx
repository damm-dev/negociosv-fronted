import React from 'react';
import '../../styles/formNegocio.css';

const Ubicacion = ({ formData, updateForm, nextStep, prevStep }) => {

  // Manejamos el cambio en el textarea
  const handleChange = (e) => {
    updateForm({ [e.target.name]: e.target.value });
  };

  // Validamos y avanzamos al siguiente componente (Fotos)
  const handleNext = () => {
    if (!formData.direccionEscrita || formData.direccionEscrita.trim() === "") {
      return alert("Por favor escribe la dirección del negocio.");
    }
    nextStep(); 
  };

  return (
    <div className="full-screen-container">
      
      {/* Título y Pregunta */}
      <h2 className="question-title">Dirección escrita</h2>
      <p className="question-subtitle">
        Escríbela tal como aparece en Maps o como la darías a un cliente.
      </p>

      {/* Input de Dirección */}
      <textarea
        className="big-input"
        rows="4"
        name="direccionEscrita"
        placeholder="Calle La Mascota, #24, San Benito..."
        value={formData.direccionEscrita || ''}
        onChange={handleChange}
        autoFocus
      />

      {/* Botones de Navegación */}
      <div className="navigation-buttons">
        <button onClick={prevStep} className="btn-nav btn-prev">
          ← Atrás
        </button>
        <button onClick={handleNext} className="btn-nav btn-next">
          Siguiente →
        </button>
      </div>

    </div>
  );
};

export default Ubicacion;