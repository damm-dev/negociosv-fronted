import React from 'react';
import '../../styles/formNegocio.css';

const DatosNegocio = ({ formData, updateForm, internalStep, setInternalStep, nextStep, prevStep }) => {
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

  const renderContent = () => {
    // Wrap content of each step in a centered container with max-width, consistent for all steps
    const content = (() => {
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
    })();

    return (
      <div style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center' }}>
        {content}
      </div>
    );
  };

  return (
    <div className="wizard-layout">

      {/* BLOQUE 1: CONTENIDO (Ocupa todo el centro) */}
      <div className="wizard-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default DatosNegocio;
