import React, { useState } from 'react';
import '../../styles/formNegocio.css';

const DatosNegocio = ({ formData, updateForm, nextStep }) => {
  const [internalStep, setInternalStep] = useState(0);

  const handleChange = (e) => {
    updateForm({ [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (field, value) => {
    const currentList = formData[field] || [];
    let newList;
    if (currentList.includes(value)) {
      newList = currentList.filter(item => item !== value);
    } else {
      newList = [...currentList, value];
    }
    updateForm({ [field]: newList });
  };

  const handleNext = () => {
    if (internalStep === 0 && !formData.email) return alert("Escribe tu correo");
    if (internalStep === 1 && (!formData.password || formData.password.length < 8)) return alert("Contraseña muy corta");
    if (internalStep === 2 && !formData.nombreNegocio) return alert("Nombre requerido");
    if (internalStep === 3 && (!formData.oferta || formData.oferta.length === 0)) return alert("Selecciona una opción");
    if (internalStep === 4 && !formData.descripcionCorta) return alert("Descripción requerida");

    if (internalStep < 4) setInternalStep(internalStep + 1);
    else nextStep(); 
  };

  const handleBack = () => {
    if (internalStep > 0) setInternalStep(internalStep - 1);
  };

  // Renderizado del contenido (SOLO PREGUNTA E INPUT)
  const renderContent = () => {
    switch (internalStep) {
      case 0:
        return (
          <>
            <h2 className="question-title">¿Cuál es tu correo?</h2>
            <p className="question-subtitle">Te enviaremos la confirmación por ahí.</p>
            <input className="big-input" type="email" name="email" 
              placeholder="ejemplo@correo.com" value={formData.email || ''} onChange={handleChange} autoFocus />
          </>
        );
      case 1:
        return (
          <>
            <h2 className="question-title">Crea tu contraseña</h2>
            <p className="question-subtitle">Al menos 8 caracteres.</p>
            <input className="big-input" type="password" name="password" 
              placeholder="••••••••" value={formData.password || ''} onChange={handleChange} autoFocus />
          </>
        );
      case 2:
        return (
          <>
            <h2 className="question-title">Nombre del negocio</h2>
            <p className="question-subtitle">Es el nombre que verán tus clientes.</p>
            <input className="big-input" type="text" name="nombreNegocio" 
              placeholder="Ej: Café La Esquina" value={formData.nombreNegocio || ''} onChange={handleChange} autoFocus />
          </>
        );
      case 3:
        return (
          <>
            <h2 className="question-title">¿Qué ofreces?</h2>
            <p className="question-subtitle">Elige una o más opciones.</p>
            <div className="options-container">
              {['Productos', 'Servicios', 'Ambos'].map((opcion) => (
                 <div key={opcion} className={`option-card ${formData.oferta?.includes(opcion) ? 'selected' : ''}`}
                   onClick={() => handleMultiSelect('oferta', opcion)}>
                   <input type="checkbox" className="option-checkbox" checked={formData.oferta?.includes(opcion) || false} readOnly />
                   <span>{opcion}</span>
                 </div>
              ))}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="question-title">Descripción corta</h2>
            <p className="question-subtitle">Describe tu negocio en pocas palabras.</p>
            <textarea 
              className="big-input" 
              name="descripcionCorta"
              placeholder="Venta de pasteles artesanales..."
              value={formData.descripcionCorta || ''}
              onChange={handleChange}
              autoFocus
            />
          </>
        );
      default: return null;
    }
  };

  return (
    <div className="wizard-layout">
      
      {/* BLOQUE 1: CONTENIDO (Ocupa todo el centro) */}
      <div className="wizard-content">
        {renderContent()}
      </div>

      {/* BLOQUE 2: BOTONES (Barra fija abajo) */}
      <div className="bottom-bar">
        <button 
          onClick={handleBack} 
          className="btn-prev"
          style={{ visibility: internalStep === 0 ? 'hidden' : 'visible' }} 
        >
          ← Anterior
        </button>

        <button onClick={handleNext} className="btn-next">
          Siguiente →
        </button>
      </div>

    </div>
  );
};

export default DatosNegocio;