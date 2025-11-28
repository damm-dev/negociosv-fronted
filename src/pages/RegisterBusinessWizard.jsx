import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/formNegocio.css';

export default function RegisterBusinessWizard() {
  const navigate = useNavigate();
  const { registerBusiness } = useAuth();
  
  const [step, setStep] = useState(1);
  const totalSteps = 11;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombreNegocio: '',
    oferta: [],
    descripcionCorta: '',
    direccionEscrita: '',
    logoFile: null,
    logoPreview: null,
    contactoEmail: '',
    telefonoWhatsApp: '',
    metodosPago: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- HELPERS PARA ACTUALIZAR DATOS ---
  
  const updateForm = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 8);
    if (value.length > 4) value = `${value.slice(0, 4)}-${value.slice(4)}`;
    updateForm({ telefonoWhatsApp: value });
  };

  const toggleList = (field, value) => {
    const currentList = formData[field] || [];
    const newList = currentList.includes(value)
      ? currentList.filter(item => item !== value)
      : [...currentList, value];
    updateForm({ [field]: newList });
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      updateForm({ logoFile: file, logoPreview: URL.createObjectURL(file) });
    }
  };

  // --- VALIDACIONES ---
  const validateStep = () => {
    switch (step) {
      case 1: // Email Usuario
        if (!formData.email) return alert("Escribe tu correo");
        return true;
      case 2: // Password
        if (!formData.password || formData.password.length < 8) return alert("Contraseña muy corta (mínimo 8)");
        return true;
      case 3: // Nombre Negocio
        if (!formData.nombreNegocio) return alert("Escribe el nombre del negocio");
        return true;
      case 4: // Oferta
        if (formData.oferta.length === 0) return alert("Selecciona qué ofreces");
        return true;
      case 5: // Descripción
        if (!formData.descripcionCorta) return alert("Escribe una descripción");
        return true;
      case 6: // Dirección
        if (!formData.direccionEscrita) return alert("Escribe la dirección");
        return true;
      case 7: // Foto
        if (!formData.logoPreview) return alert("Sube una foto o logo");
        return true;
      case 8: // Email Contacto
        if (!formData.contactoEmail) return alert("Escribe el correo de contacto");
        return true;
      case 9: // Teléfono
        if (!formData.telefonoWhatsApp || formData.telefonoWhatsApp.length < 9) return alert("Teléfono incompleto (####-####)");
        return true;
      // Paso 10 (Pagos) y 11 (Resumen) no requieren validación estricta para avanzar
      default: return true;
    }
  };

  // --- NAVEGACIÓN ---
  const nextStep = () => {
    if (validateStep()) {
      if (step < totalSteps) setStep(s => s + 1);
      else submitForm();
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(s => s - 1);
  };

  const submitForm = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await registerBusiness(formData);
      
      alert("¡Registro de Negocio Completado! 🚀");
      console.log("Respuesta del servidor:", response);
      
      navigate('/login');
    } catch (err) {
      console.error("Error completo en registro:", err);
      console.error("Error response:", err.response);
      
      let errorMessage = "Error en el registro:\n\n";
      
      if (err.response?.data) {
        const errors = err.response.data;
        console.log("Errores del servidor:", errors);
        
        // Si es un objeto con errores de validación
        if (typeof errors === 'object' && !errors.message) {
          Object.keys(errors).forEach(key => {
            const errorValue = errors[key];
            if (Array.isArray(errorValue)) {
              errorMessage += `• ${key}: ${errorValue.join(', ')}\n`;
            } else if (typeof errorValue === 'string') {
              errorMessage += `• ${key}: ${errorValue}\n`;
            }
          });
        } else if (errors.message) {
          errorMessage = errors.message;
        } else {
          errorMessage = "Error desconocido en el servidor";
        }
      } else if (err.message) {
        errorMessage = `Error: ${err.message}`;
      } else {
        errorMessage = "Error al conectar con el servidor. Verifica tu conexión.";
      }
      
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // --- RENDERIZADO DE PANTALLAS ---
  const renderScreen = () => {
    switch (step) {
      // 1. INFO USUARIO
      case 1:
        return (
          <>
            <h2 className="question-title">¿Cuál es tu correo?</h2>
            <p className="question-subtitle">Te enviaremos la confirmación por ahí.</p>
            {error && (
              <div style={{
                padding: '12px',
                marginBottom: '16px',
                backgroundColor: '#fee2e2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                color: '#dc2626',
                fontSize: '14px',
                whiteSpace: 'pre-line',
              }}>
                {error}
              </div>
            )}
            <input className="big-input" type="email" placeholder="ejemplo@correo.com"
              value={formData.email} onChange={(e) => updateForm({ email: e.target.value })} autoFocus disabled={loading} />
          </>
        );
      case 2:
        return (
          <>
            <h2 className="question-title">Crea tu contraseña</h2>
            <p className="question-subtitle">Al menos 8 caracteres.</p>
            <input className="big-input" type="password" placeholder="••••••••"
              value={formData.password} onChange={(e) => updateForm({ password: e.target.value })} autoFocus />
          </>
        );

      // 2. INFO NEGOCIO BÁSICA
      case 3:
        return (
          <>
            <h2 className="question-title">Nombre del negocio</h2>
            <p className="question-subtitle">Es el nombre que verán tus clientes.</p>
            <input className="big-input" type="text" placeholder="Ej: Café La Esquina"
              value={formData.nombreNegocio} onChange={(e) => updateForm({ nombreNegocio: e.target.value })} autoFocus />
            <div className="tip-box"><span>ℹ️</span><span>Mientras más claro sea el nombre, mejor.</span></div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="question-title">¿Qué ofreces?</h2>
            <p className="question-subtitle">Elige tu categoria.</p>
            <div className="options-container">
              {['Restaurante', 'Cafetería', 'Barbería', 'Clínica', 'Taller', 'Coworking', 'Tienda', 'Servicios', 'Otro'].map(opcion => (
                <div key={opcion} className={`option-card ${formData.oferta.includes(opcion) ? 'selected' : ''}`}
                  onClick={() => toggleList('oferta', opcion)}>
                  <input type="checkbox" className="option-checkbox" checked={formData.oferta.includes(opcion)} readOnly />
                  <span>{opcion}</span>
                </div>
              ))}
            </div>
          </>
        );
      case 5:
        return (
          <>
            <h2 className="question-title">Descripción corta</h2>
            <p className="question-subtitle">Describe tu negocio en pocas palabras.</p>
            <textarea className="big-input" placeholder="Venta de pasteles artesanales..."
              value={formData.descripcionCorta} onChange={(e) => updateForm({ descripcionCorta: e.target.value })} autoFocus />
          </>
        );

      // 3. UBICACIÓN Y FOTO
      case 6:
        return (
          <>
            <h2 className="question-title">Dirección escrita</h2>
            <p className="question-subtitle">Escríbela tal como aparece en Maps.</p>
            <textarea className="big-input" placeholder="Calle La Mascota #24..."
              value={formData.direccionEscrita} onChange={(e) => updateForm({ direccionEscrita: e.target.value })} autoFocus />
          </>
        );
      case 7:
        return (
          <>
            <h2 className="question-title">Foto o logo del negocio</h2>
            <p className="question-subtitle">Si no tienes logo, usa una foto clara de la fachada.</p>
            <label className="file-upload-box">
              <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
              {formData.logoPreview ? (
                <img src={formData.logoPreview} alt="Preview" className="file-preview-img" />
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <span className="upload-icon">+</span>
                  <span style={{ color: '#6b7280', display: 'block' }}>Haz clic para subir imagen</span>
                </div>
              )}
            </label>
          </>
        );

      // 4. CONTACTO Y PAGOS
      case 8:
        return (
          <>
            <h2 className="question-title">Correo de contacto</h2>
            <p className="question-subtitle">¿A dónde quieres que te escriban los clientes?</p>
            <input className="big-input" type="email" placeholder="contacto@negocio.com"
              value={formData.contactoEmail} onChange={(e) => updateForm({ contactoEmail: e.target.value })} autoFocus />
          </>
        );
      case 9:
        return (
          <>
            <h2 className="question-title">Teléfono o WhatsApp</h2>
            <p className="question-subtitle">Para que te llamen o escriban directamente.</p>
            <input className="big-input" type="tel" placeholder="7000-0000"
              value={formData.telefonoWhatsApp} onChange={handlePhoneChange} maxLength={9} autoFocus />
          </>
        );
      case 10:
        return (
          <>
            <h2 className="question-title">Métodos de pago</h2>
            <p className="question-subtitle">Selecciona los que aceptas.</p>
            <div className="options-container">
              {['Efectivo', 'Transferencia', 'Tarjetas', 'QR', 'Otros'].map(method => (
                <div key={method} className={`option-card ${formData.metodosPago.includes(method) ? 'selected' : ''}`}
                  onClick={() => toggleList('metodosPago', method)}>
                  <input type="checkbox" className="option-checkbox" checked={formData.metodosPago.includes(method)} readOnly />
                  <span>{method}</span>
                </div>
              ))}
            </div>
          </>
        );

      // 5. RESUMEN
      case 11:
        return (
          <div style={{width: '100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <h2 className="question-title">¡Todo listo!</h2>
            <p className="question-subtitle">Revisa la información antes de finalizar.</p>
            <div className="summary-container">
              <div className="summary-item"><span className="summary-label">Negocio</span><div className="summary-value">{formData.nombreNegocio}</div></div>
              <div className="summary-item"><span className="summary-label">Ubicación</span><div className="summary-value">{formData.direccionEscrita}</div></div>
              <div className="summary-item"><span className="summary-label">Contacto</span><div className="summary-value">{formData.telefonoWhatsApp}</div></div>
              <div className="summary-item"><span className="summary-label">Oferta</span><div className="summary-value">{formData.oferta.join(', ')}</div></div>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="wizard-layout">
      {/* CONTENIDO */}
      <div className="wizard-content">
        {renderScreen()}
      </div>

      {/* BARRA INFERIOR */}
      <div className="bottom-bar">
        <button className="btn-prev" onClick={prevStep} disabled={step === 1} style={{ opacity: step === 1 ? 0.5 : 1 }}>
          ← Anterior
        </button>
        
        <button 
          className="btn-next" 
          onClick={nextStep}
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Registrando..." : (step === totalSteps ? "Confirmar Registro ✨" : "Siguiente →")}
        </button>
      </div>
    </div>
  );
}