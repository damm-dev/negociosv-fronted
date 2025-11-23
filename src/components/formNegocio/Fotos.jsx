import React from 'react'; // No necesitamos state interno porque es 1 sola pantalla
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

  // Removed internal handleNext navigation and buttons - parent controls navigation

  return (
    <div className="full-screen-container">
      <h2 className="question-title">Foto o logo del negocio</h2>
      <p className="question-subtitle">Si no tienes logo, usa una foto clara de la fachada.</p>

      {/* Input de archivo camuflado */}
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
          <>
            <span className="upload-icon">+</span>
            <span style={{color: '#6b7280'}}>Haz clic para subir una imagen</span>
          </>
        )}
      </label>

      {/* Removed navigation buttons - controlled by parent */}
    </div>
  );
};

export default Fotos;