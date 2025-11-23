import React from 'react';
import '../../styles/formNegocio.css';

const Ubicacion = ({ formData, updateForm, nextStep, prevStep }) => {

  const handleChange = (e) => {
    updateForm({ [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!formData.direccionEscrita) return alert("Escribe la dirección");
    nextStep();
  };

  return (
    <div className="wizard-layout">
      {/* CONTENIDO CENTRADO */}
      <div className="wizard-content">
        <h2 className="question-title">Dirección escrita</h2>
        <p className="question-subtitle">
          Escríbela tal como aparece en Maps o como la darías a un cliente.
        </p>
        
        <textarea
          className="big-input"
          rows="4"
          name="direccionEscrita"
          placeholder="Calle La Mascota, #24, San Benito..."
          value={formData.direccionEscrita || ''}
          onChange={handleChange}
          autoFocus
        />
      </div>

      {/* BOTONES ABAJO */}
      {/* Botones removidos para evitar duplicación */}
    </div>
  );
};

export default Ubicacion;