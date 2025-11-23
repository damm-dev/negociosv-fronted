import React, { useState } from 'react';
import DatosNegocio from '../components/formNegocio/DatosNegocio';
import Ubicacion from '../components/formNegocio/Ubicacion';
import Fotos from '../components/formNegocio/Fotos';
import ContactoPago from '../components/formNegocio/ContactoPago';
import Resumen from '../components/formNegocio/Resumen';

import '../styles/wizardclient.css';

export default function RegisterBusinessWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [internalSubStep, setInternalSubStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombreNegocio: '',
    oferta: [],
    descripcionCorta: '',
    contactoEmail: '',
    telefonoWhatsApp: '',
    metodosPago: [],
    direccionEscrita: '',
    logoFile: null,
    logoPreview: null,
  });

  const updateForm = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const validateCurrentStep = () => {
    if (currentStep === 1) {
      switch (internalSubStep) {
        case 0:
          if (!formData.email) {
            alert('Escribe tu correo');
            return false;
          }
          return true;
        case 1:
          if (!formData.password || formData.password.length < 8) {
            alert('Contraseña muy corta');
            return false;
          }
          return true;
        case 2:
          if (!formData.nombreNegocio) {
            alert('Nombre requerido');
            return false;
          }
          return true;
        case 3:
          if (!formData.oferta || formData.oferta.length === 0) {
            alert('Selecciona una opción');
            return false;
          }
          return true;
        case 4:
          if (!formData.descripcionCorta) {
            alert('Descripción requerida');
            return false;
          }
          return true;
        default:
          return true;
      }
    } else {
      switch (currentStep) {
        case 2:
          if (!formData.direccionEscrita || formData.direccionEscrita.trim() === '') {
            alert('Por favor escribe la dirección del negocio.');
            return false;
          }
          return true;
        case 3:
          if (!formData.logoPreview) {
            alert('Sube una foto para continuar');
            return false;
          }
          return true;
        case 4:
          if (!formData.contactoEmail) {
            alert('Ingresa un correo de contacto');
            return false;
          }
          if (!formData.telefonoWhatsApp) {
            alert('Ingresa un teléfono');
            return false;
          }
          return true;
        default:
          return true;
      }
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const submitForm = () => {
    alert('¡Flujo completado! Datos listos para enviar al backend.');
    console.log('DATA FINAL:', formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DatosNegocio
            formData={formData}
            updateForm={updateForm}
            internalStep={internalSubStep}
            setInternalStep={setInternalSubStep}
            nextStep={() => {
              if (internalSubStep < 4) {
                setInternalSubStep(internalSubStep + 1);
              } else {
                setInternalSubStep(0);
                setCurrentStep(2);
              }
            }}
            prevStep={() => {
              if (internalSubStep > 0) {
                setInternalSubStep(internalSubStep - 1);
              } else if (currentStep > 1) {
                setCurrentStep(currentStep - 1);
              }
            }}
          />
        );
      case 2:
        return (
          <Ubicacion
            formData={formData}
            updateForm={updateForm}
          />
        );
      case 3:
        return (
          <Fotos
            formData={formData}
            updateForm={updateForm}
          />
        );
      case 4:
        return (
          <ContactoPago
            formData={formData}
            updateForm={updateForm}
          />
        );
      case 5:
        return (
          <Resumen
            formData={formData}
          />
        );
      default:
        return <div>Paso no encontrado</div>;
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: '0 24px 64px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 12,
          color: '#aaa',
          zIndex: 999,
          padding: '4px 0',
          background: '#fff',
          borderBottom: '1px solid #ddd',
        }}
      >
        Modo de Prueba - Paso {currentStep} de 5
      </div>

      <div style={{
        width: '100%',
        flexGrow: 1,
        overflow: 'visible',
      }}>
        {renderStep()}
      </div>

      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTop: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '12px 40px',
        zIndex: 1000,
      }}>
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          style={{
            backgroundColor: currentStep === 1 ? '#ddd' : '#6b7280',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 40px',
            cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          ← Anterior
        </button>
        {currentStep < 5 ? (
          <button
            onClick={nextStep}
            style={{
              backgroundColor: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 40px',
              cursor: 'pointer',
            }}
          >
            Siguiente →
          </button>
        ) : (
          <button
            onClick={submitForm}
            style={{
              backgroundColor: '#10b981',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 40px',
              cursor: 'pointer',
            }}
          >
            Confirmar Registro ✨
          </button>
        )}
      </div>
    </div>
  );
}
