import React, { useState } from 'react';
import '../../styles/formNegocio.css';

const ContactoPago = ({ formData, updateForm, nextStep, prevStep }) => {
  const [internalStep, setInternalStep] = useState(0);

  // 1. Manejador de Correo
  const handleChange = (e) => {
    updateForm({ [e.target.name]: e.target.value });
  };

  // 2. Manejador de Teléfono (AGREGADO: Formato ####-####)
  // Este no lo tenías en tu código, por eso no te ponía el guion.
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 8);
    if (value.length > 4) {
      value = `${value.slice(0, 4)}-${value.slice(4)}`;
    }
    updateForm({ telefonoWhatsApp: value });
  };

  // 3. Manejador de Pagos
  const handlePaymentChange = (method) => {
    const current = formData.metodosPago || [];
    let updated;
    if (current.includes(method)) {
      updated = current.filter(i => i !== method);
    } else {
      updated = [...current, method];
    }
    updateForm({ metodosPago: updated });
  };

  // 4. TU LÓGICA DE VALIDACIÓN (Exactamente como la que te funcionó)
  // Solo agregué "return" para asegurar que pare si hay error.
  const handleNext = () => {
    
    // Paso 0: Correo
    if (internalStep === 0 && !formData.contactoEmail) {
      return alert("Ingresa un correo de contacto");
    }
    
    // Paso 1: Teléfono
    if (internalStep === 1) {
       // Agregué validación de longitud para que no pongan números a medias
       if (!formData.telefonoWhatsApp || formData.telefonoWhatsApp.length < 9) {
          return alert("Ingresa un teléfono válido (####-####)");
       }
    }

    // Avanzar
    if (internalStep === 2) {
      nextStep(); // Ir al resumen
    } else {
      setInternalStep(internalStep + 1);
    }
  };

  const handleBack = () => {
    if (internalStep > 0) setInternalStep(internalStep - 1);
    else prevStep();
  };

  const renderContent = () => {
    switch (internalStep) {
      case 0:
        return (
          <>
            <h2 className="question-title">Correo de contacto</h2>
            <p className="question-subtitle">¿A dónde quieres que te escriban los clientes?</p>
            <input className="big-input" type="email" name="contactoEmail" 
              value={formData.contactoEmail || ''} onChange={handleChange} autoFocus />
          </>
        );
      case 1:
        return (
          <>
            <h2 className="question-title">Teléfono o WhatsApp</h2>
            <p className="question-subtitle">Para que te llamen o escriban directamente.</p>
            
            {/* Usamos el manejador del guion aquí */}
            <input className="big-input" type="tel" name="telefonoWhatsApp" 
              placeholder="7000-0000"
              value={formData.telefonoWhatsApp || ''} onChange={handlePhoneChange} maxLength={9} autoFocus />
          </>
        );
      case 2:
        return (
          <>
            <h2 className="question-title">Métodos de pago aceptados</h2>
            <p className="question-subtitle">Puedes omitirlo y añadirlo después.</p>
            <div className="options-container">
              {['Efectivo', 'Transferencia', 'Tarjetas', 'QR', 'Otros'].map(method => (
                <div key={method} 
                  className={`option-card ${formData.metodosPago?.includes(method) ? 'selected' : ''}`}
                  onClick={() => handlePaymentChange(method)}
                >
                  <input type="checkbox" className="option-checkbox" 
                    checked={formData.metodosPago?.includes(method) || false} readOnly />
                  <span>{method}</span>
                </div>
              ))}
            </div>
          </>
        );
      default: return null;
    }
  };

  // 5. ESTRUCTURA VISUAL NUEVA
  // Aquí usamos "wizard-layout" y "bottom-bar" para que se vea como los otros.
  return (
    <div className="wizard-layout">
      
      {/* Contenido Centrado */}
      <div className="wizard-content">
        {renderContent()}
      </div>

      {/* Barra Inferior Fija (Solo UN par de botones) */}
      {/* Botones removidos para evitar duplicación */}

    </div>
  );
};

export default ContactoPago;