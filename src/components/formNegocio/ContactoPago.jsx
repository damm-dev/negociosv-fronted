import React, { useState } from 'react';
import '../../styles/formNegocio.css';

const ContactoPago = ({ formData, updateForm, nextStep, prevStep }) => {
  const [internalStep, setInternalStep] = useState(0);

  const handleChange = (e) => {
    updateForm({ [e.target.name]: e.target.value });
  };

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

  // Removed internal handleNext and handleBack handlers to move navigation control to parent.
  
  // Removed internalStep state.

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
            <input className="big-input" type="tel" name="telefonoWhatsApp" 
              value={formData.telefonoWhatsApp || ''} onChange={handleChange} autoFocus />
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

  return (
    <div className="full-screen-container">
      {renderContent()}
      {/* Removed navigation buttons - navigation controlled by parent */}
    </div>
  );
};

export default ContactoPago;