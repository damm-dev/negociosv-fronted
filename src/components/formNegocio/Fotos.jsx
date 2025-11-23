import React from 'react';
import '../../styles/formNegocio.css';

const Fotos = ({ formData, updateForm, nextStep, prevStep }) => {

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      updateForm({ 
        logoFile: file, 
        logoPreview: tempUrl 
      });
    }
  };

  const handleNext = () => {
    if (!formData.logoPreview) {
      return alert("Por favor sube una imagen para continuar.");
    }
    nextStep();
  };

  return (
    <div className="wizard-layout">
      
      {/* CONTENIDO CENTRADO */}
      <div className="wizard-content">
        <h2 className="question-title">Foto o logo del negocio</h2>
        <p className="question-subtitle">Si no tienes logo, usa una foto clara de la fachada.</p>

        {/* CAJA DE SUBIDA (Ahora se centrará gracias al CSS nuevo) */}
        <label className="file-upload-box">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            style={{display: 'none'}} 
          />
          
          {formData.logoPreview ? (
            <img src={formData.logoPreview} alt="Preview" className="file-preview-img" />
          ) : (
            <div style={{textAlign: 'center'}}> {/* Asegura centrado de texto interno */}
              <span className="upload-icon">+</span>
              <span style={{color: '#6b7280', display: 'block'}}>Haz clic para subir una imagen</span>
            </div>
          )}
        </label>
      </div>

      {/* BOTONES ABAJO */}
      <div className="bottom-bar">
        <button onClick={prevStep} className="btn-prev">← Anterior</button>
        <button onClick={handleNext} className="btn-next">Siguiente →</button>
      </div>
    </div>
  );
};

export default Fotos;