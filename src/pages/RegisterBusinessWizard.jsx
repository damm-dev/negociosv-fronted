import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { initDraggableClosing } from '../utils/draggableInit';
import ProgressBar from '../components/ProgressBar';
import '../styles/formNegocio.css';

export default function RegisterBusinessWizard() {
  const navigate = useNavigate();
  const { registerBusiness } = useAuth();

  const [step, setStep] = useState(1);
  const totalSteps = 11;
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre_negocio: '',
    id_categoria: [],
    descripcion: '',
    direccion: '',
    id_municipio: '',
    logoFile: null,
    logoPreview: null,
    email_contacto: '',
    telefono: '',
    metodos_pago: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [municipios, setMunicipios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);

  // Cargar datos e inicializar draggable al montar el componente
  useEffect(() => {
    // Inicializar draggable
    initDraggableClosing();
    
    // Municipios de El Salvador
    const municipiosSV = [
      { id: 1, nombre: "San Salvador" },
      { id: 2, nombre: "Santa Tecla" },
      { id: 3, nombre: "Soyapango" },
      { id: 4, nombre: "San Miguel" },
      { id: 5, nombre: "Santa Ana" },
      { id: 6, nombre: "Mejicanos" },
      { id: 7, nombre: "Apopa" },
      { id: 8, nombre: "Delgado" },
      { id: 9, nombre: "Sonsonate" },
      { id: 10, nombre: "Ahuachapán" },
      { id: 11, nombre: "Usulután" },
      { id: 12, nombre: "La Unión" },
      { id: 13, nombre: "Chalatenango" },
      { id: 14, nombre: "Cojutepeque" },
      { id: 15, nombre: "Zacatecoluca" },
    ];
    setMunicipios(municipiosSV);

    // Categorías de negocios (IDs de la tabla categorias)
    const categoriasNegocio = [
      { id: 1, nombre: "Restaurante" },
      { id: 2, nombre: "Cafetería" },
      { id: 3, nombre: "Barbería" },
      { id: 4, nombre: "Salón de Belleza" },
      { id: 5, nombre: "Gimnasio" },
      { id: 6, nombre: "Tienda" },
      { id: 7, nombre: "Servicios Profesionales" },
      { id: 8, nombre: "Entretenimiento" },
      { id: 9, nombre: "Educación" },
      { id: 10, nombre: "Salud" },
    ];
    setCategorias(categoriasNegocio);

    // Métodos de pago (IDs de la tabla metodos_pago)
    const metodosPagoDisponibles = [
      { id: 1, nombre: "Efectivo" },
      { id: 2, nombre: "Tarjeta" },
      { id: 3, nombre: "Transferencia" },
      { id: 4, nombre: "Bitcoin" },
      { id: 5, nombre: "Otros" },
    ];
    setMetodosPago(metodosPagoDisponibles);
  }, []);

  // --- HELPERS PARA ACTUALIZAR DATOS ---

  const updateForm = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 8);
    if (value.length > 4) value = `${value.slice(0, 4)}-${value.slice(4)}`;
    updateForm({ telefono: value });
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
      // Validar tamaño del archivo (máximo 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB en bytes
      if (file.size > maxSize) {
        alert('La imagen es demasiado grande. Por favor selecciona una imagen menor a 2MB.');
        e.target.value = ''; // Limpiar el input
        return;
      }
      updateForm({ logoFile: file, logoPreview: URL.createObjectURL(file) });
    }
  };

  // --- VALIDACIONES ---
  const validateStep = () => {
    switch (step) {
      case 1: // Email Usuario
        if (!formData.email.trim()) {
          alert("Por favor, escribe tu correo electrónico");
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          alert("Por favor, ingresa un correo electrónico válido (ejemplo@correo.com)");
          return false;
        }
        return true;

      case 2: // Password
        if (!formData.password) {
          alert("Por favor, crea una contraseña");
          return false;
        }
        if (formData.password.length < 8) {
          alert("La contraseña debe tener al menos 8 caracteres");
          return false;
        }
        // Validar que tenga al menos una letra y un número
        if (!/[a-zA-Z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
          alert("La contraseña debe contener al menos una letra y un número");
          return false;
        }
        return true;

      case 3: // Nombre Negocio
        if (!formData.nombre_negocio.trim()) {
          alert("Por favor, escribe el nombre del negocio");
          return false;
        }
        if (formData.nombre_negocio.trim().length < 3) {
          alert("El nombre del negocio debe tener al menos 3 caracteres");
          return false;
        }
        if (formData.nombre_negocio.trim().length > 100) {
          alert("El nombre del negocio no puede exceder 100 caracteres");
          return false;
        }
        return true;

      case 4: // Categoría
        if (formData.id_categoria.length === 0) {
          alert("Por favor, selecciona al menos una categoría");
          return false;
        }
        if (formData.id_categoria.length > 3) {
          alert("Puedes seleccionar máximo 3 categorías");
          return false;
        }
        return true;

      case 5: // Descripción
        if (!formData.descripcion.trim()) {
          alert("Por favor, escribe una descripción del negocio");
          return false;
        }
        if (formData.descripcion.trim().length < 20) {
          alert("La descripción debe tener al menos 20 caracteres");
          return false;
        }
        if (formData.descripcion.trim().length > 500) {
          alert("La descripción no puede exceder 500 caracteres");
          return false;
        }
        return true;

      case 6: // Dirección
        if (!formData.direccion.trim()) {
          alert("Por favor, escribe la dirección del negocio");
          return false;
        }
        if (formData.direccion.trim().length < 10) {
          alert("La dirección debe tener al menos 10 caracteres");
          return false;
        }
        return true;

      case 7: // Municipio
        if (!formData.id_municipio) {
          alert("Por favor, selecciona el municipio donde está ubicado el negocio");
          return false;
        }
        return true;

      case 8: // Foto
        if (!formData.logoPreview) {
          alert("Por favor, sube una foto o logo del negocio");
          return false;
        }
        return true;

      case 9: // Email Contacto
        if (!formData.email_contacto.trim()) {
          alert("Por favor, escribe el correo de contacto del negocio");
          return false;
        }
        const emailContactoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailContactoRegex.test(formData.email_contacto)) {
          alert("Por favor, ingresa un correo de contacto válido");
          return false;
        }
        return true;

      case 10: // Teléfono
        if (!formData.telefono.trim()) {
          alert("Por favor, escribe el número de teléfono del negocio");
          return false;
        }
        // Validar formato de teléfono salvadoreño (####-####)
        const phoneRegex = /^\d{4}-\d{4}$/;
        if (!phoneRegex.test(formData.telefono)) {
          alert("El teléfono debe tener el formato ####-#### (8 dígitos)");
          return false;
        }
        // Validar que empiece con 2, 6, 7 (números válidos en El Salvador)
        const primerDigito = formData.telefono.charAt(0);
        if (!['2', '6', '7'].includes(primerDigito)) {
          alert("El teléfono debe comenzar con 2, 6 o 7");
          return false;
        }
        return true;

      case 11: // Métodos de pago (opcional pero recomendado)
        if (formData.metodos_pago.length === 0) {
          const confirmar = window.confirm("No has seleccionado ningún método de pago. ¿Deseas continuar sin seleccionar métodos de pago?");
          return confirmar;
        }
        return true;

      default:
        return true;
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

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleCancelConfirm = () => {
    navigate('/account-type');
  };

  const handleCancelClose = () => {
    setShowCancelModal(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextStep();
    }
  };

  const submitForm = async () => {
    setLoading(true);
    setError("");

    try {
      const businessData = {
        email: formData.email,
        password: formData.password,
        nombre_negocio: formData.nombre_negocio,
        id_categoria: formData.id_categoria,
        descripcion: formData.descripcion,
        direccion: formData.direccion,
        id_municipio: parseInt(formData.id_municipio),
        logoFile: formData.logoFile,
        email_contacto: formData.email_contacto,
        telefono: formData.telefono,
        metodos_pago: formData.metodos_pago,
      };

      const response = await registerBusiness(businessData);

      alert("¡Registro de Negocio Completado! 🚀");
      console.log("Respuesta del servidor:", response);

      navigate('/login');
    } catch (err) {
      console.error("Error completo en registro:", err);
      console.error("Error response:", err.response);

      let errorMessage = "Error en el registro:\n\n";

      if (err.response?.data) {
        const data = err.response.data;
        console.log("Respuesta del servidor:", data);

        // Formato típico de validación de Laravel
        if (data.errors && typeof data.errors === "object") {
          const mensajes = Object.values(data.errors)   // arrays de mensajes
            .flat()                                     // los junto en un solo array
            .join("\n");                                // los uno con saltos de línea

          errorMessage += mensajes;
        } else if (data.message) {
          // Otro tipo de error de Laravel
          errorMessage += data.message;
        } else if (typeof data === "string") {
          errorMessage += data;
        } else {
          errorMessage += "Ocurrió un error desconocido en el servidor.";
        }
      } else if (err.message) {
        errorMessage += err.message;
      } else {
        errorMessage += "Error al conectar con el servidor. Verifica tu conexión.";
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
              value={formData.email} onChange={(e) => updateForm({ email: e.target.value })} onKeyPress={handleKeyPress} autoFocus disabled={loading} />
          </>
        );
      case 2:
        return (
          <>
            <h2 className="question-title">Crea tu contraseña</h2>
            <p className="question-subtitle">Al menos 8 caracteres.</p>
            <input className="big-input" type="password" placeholder="••••••••"
              value={formData.password} onChange={(e) => updateForm({ password: e.target.value })} onKeyPress={handleKeyPress} autoFocus />
          </>
        );

      // 2. INFO NEGOCIO BÁSICA
      case 3:
        return (
          <>
            <h2 className="question-title">Nombre del negocio</h2>
            <p className="question-subtitle">Es el nombre que verán tus clientes.</p>
            <input
              className="big-input"
              type="text"
              placeholder="Ej: Café La Esquina"
              value={formData.nombre_negocio}
              onChange={(e) => updateForm({ nombre_negocio: e.target.value })}
              onKeyPress={handleKeyPress}
              maxLength={100}
              autoFocus
            />
            <div className="tip-box">
              <span>ℹ️</span>
              <span>Mientras más claro sea el nombre, mejor. (3-100 caracteres)</span>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="question-title">¿Qué tipo de negocio es?</h2>
            <p className="question-subtitle">Selecciona entre 1 y 3 categorías.</p>
            <div className="options-container">
              {categorias.map(categoria => (
                <div key={categoria.id} className={`option-card ${formData.id_categoria.includes(categoria.id) ? 'selected' : ''}`}
                  onClick={() => toggleList('id_categoria', categoria.id)}>
                  <input type="checkbox" className="option-checkbox" checked={formData.id_categoria.includes(categoria.id)} readOnly />
                  <span>{categoria.nombre}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '10px', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
              Seleccionadas: {formData.id_categoria.length} / 3
            </div>
          </>
        );
      case 5:
        return (
          <>
            <h2 className="question-title">Descripción del negocio</h2>
            <p className="question-subtitle">Describe tu negocio en pocas palabras (20-500 caracteres).</p>
            <textarea
              className="big-input"
              placeholder="Ej: Cafetería especializada en café de altura con ambiente acogedor..."
              value={formData.descripcion}
              onChange={(e) => updateForm({ descripcion: e.target.value })}
              maxLength={500}
              rows={4}
              autoFocus
            />
            <div style={{ marginTop: '5px', textAlign: 'right', color: '#6b7280', fontSize: '0.85rem' }}>
              {formData.descripcion.length} / 500 caracteres
            </div>
          </>
        );

      // 3. UBICACIÓN
      case 6:
        return (
          <>
            <h2 className="question-title">Dirección del negocio</h2>
            <p className="question-subtitle">Escríbela tal como aparece en Maps.</p>
            <textarea
              className="big-input"
              placeholder="Ej: Calle La Mascota #24, Colonia San Benito, San Salvador"
              value={formData.direccion}
              onChange={(e) => updateForm({ direccion: e.target.value })}
              rows={3}
              autoFocus
            />
            <div className="tip-box" style={{ marginTop: '10px' }}>
              <span>ℹ️</span>
              <span>Incluye calle, número, colonia y referencias importantes</span>
            </div>
          </>
        );
      case 7:
        return (
          <>
            <h2 className="question-title">¿En qué municipio está ubicado?</h2>
            <p className="question-subtitle">Selecciona el municipio.</p>
            <select
              className="big-input"
              value={formData.id_municipio}
              onChange={(e) => updateForm({ id_municipio: e.target.value })}
              onKeyPress={handleKeyPress}
              autoFocus
            >
              <option value="">Selecciona un municipio</option>
              {municipios.map((municipio) => (
                <option key={municipio.id} value={municipio.id}>
                  {municipio.nombre}
                </option>
              ))}
            </select>
          </>
        );
      case 8:
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
            {formData.logoPreview && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  updateForm({ logoFile: null, logoPreview: null });
                }}
                style={{
                  marginTop: '10px',
                  background: 'transparent',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Eliminar y subir otra
              </button>
            )}
          </>
        );

      // 4. CONTACTO Y PAGOS
      case 9:
        return (
          <>
            <h2 className="question-title">Correo de contacto</h2>
            <p className="question-subtitle">¿A dónde quieres que te escriban los clientes?</p>
            <input className="big-input" type="email" placeholder="contacto@negocio.com"
              value={formData.email_contacto} onChange={(e) => updateForm({ email_contacto: e.target.value })} onKeyPress={handleKeyPress} autoFocus />
          </>
        );
      case 10:
        return (
          <>
            <h2 className="question-title">Teléfono o WhatsApp</h2>
            <p className="question-subtitle">Para que te llamen o escriban directamente.</p>
            <input
              className="big-input"
              type="tel"
              placeholder="7000-0000"
              value={formData.telefono}
              onChange={handlePhoneChange}
              onKeyPress={handleKeyPress}
              maxLength={9}
              autoFocus
            />
            <div className="tip-box" style={{ marginTop: '10px' }}>
              <span>ℹ️</span>
              <span>Formato: ####-#### (8 dígitos)</span>
            </div>
          </>
        );
      case 11:
        return (
          <>
            <h2 className="question-title">Métodos de pago</h2>
            <p className="question-subtitle">Selecciona los que aceptas (opcional).</p>
            <div className="options-container">
              {metodosPago.map(metodo => (
                <div key={metodo.id} className={`option-card ${formData.metodos_pago.includes(metodo.id) ? 'selected' : ''}`}
                  onClick={() => toggleList('metodos_pago', metodo.id)}>
                  <input type="checkbox" className="option-checkbox" checked={formData.metodos_pago.includes(metodo.id)} readOnly />
                  <span>{metodo.nombre}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '10px', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
              {formData.metodos_pago.length > 0
                ? `Seleccionados: ${formData.metodos_pago.length}`
                : 'Puedes agregar métodos de pago después'}
            </div>
          </>
        );

      default: return null;
    }
  };

  return (
    <div className="wizard-layout" data-draggable-closing="true">
      {/* Botón de cancelar - X simple */}
      <button className="cancel-button" onClick={handleCancelClick} title="Cancelar registro">
        ✕
      </button>

      {/* Barra de progreso */}
      <ProgressBar currentStep={step} totalSteps={totalSteps} />

      {/* CONTENIDO */}
      <div className="wizard-content">
        {/* Indicador de arrastrar para cerrar (solo móvil) */}
        <div className="drag-indicator" data-draggable-handle>
          <div className="drag-indicator-bar"></div>
        </div>
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

      {/* Modal de confirmación de cancelación */}
      {showCancelModal && (
        <div className="modal-overlay" onClick={handleCancelClose}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-icon">⚠️</span>
              <h2 className="modal-title">¿Cancelar registro?</h2>
            </div>
            <p className="modal-message">
              Estás a punto de cancelar la creación de tu cuenta de negocio. Se perderán todos los datos ingresados hasta el momento.
            </p>
            <div className="modal-buttons">
              <button className="modal-btn modal-btn-cancel" onClick={handleCancelClose}>
                Continuar registrándome
              </button>
              <button className="modal-btn modal-btn-confirm" onClick={handleCancelConfirm}>
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
