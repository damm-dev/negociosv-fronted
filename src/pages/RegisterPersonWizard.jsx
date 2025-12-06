import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { initDraggableClosing } from "../utils/draggableInit";
import ProgressBar from "../components/ProgressBar";
import "../styles/formNegocio.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import SuccessModal from "../components/SuccessModal";

export default function RegisterPersonWizard() {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    genero: "",
    fecha_nacimiento: "",
    correo: "",
    password: "",
    telefono: "",
    fotoFile: null,
    fotoPreview: null,
    intereses: [],
    id_municipio: "",
    descripcion: "",
    ubicacion_activa: false,
    terminos: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [municipios, setMunicipios] = useState([]);
  const [loadingMunicipios, setLoadingMunicipios] = useState(true);

  const totalSteps = 11;

  // Cargar municipios desde la API al montar el componente
  useEffect(() => {
    // Inicializar draggable
    initDraggableClosing();
    
    // Cargar municipios desde la API
    const cargarMunicipios = async () => {
      try {
        setLoadingMunicipios(true);
        const response = await fetch('http://localhost:8000/api/municipios');
        const data = await response.json();
        
        if (data.success && data.data) {
          // Mapear los datos al formato esperado
          const municipiosFormateados = data.data.map(m => ({
            id: m.id,
            nombre: m.nombre,
            departamento: m.departamento
          }));
          setMunicipios(municipiosFormateados);
        } else {
          console.error('Error al cargar municipios:', data);
          // Fallback a lista básica si falla la API
          setMunicipios([
            { id: 1, nombre: "San Salvador" },
            { id: 20, nombre: "Santa Tecla" },
            { id: 18, nombre: "Soyapango" },
          ]);
        }
      } catch (error) {
        console.error('Error al cargar municipios:', error);
        // Fallback a lista básica si falla la API
        setMunicipios([
          { id: 1, nombre: "San Salvador" },
          { id: 20, nombre: "Santa Tecla" },
          { id: 18, nombre: "Soyapango" },
        ]);
      } finally {
        setLoadingMunicipios(false);
      }
    };

    cargarMunicipios();
  }, []);

  // Categorías/Intereses disponibles (IDs de la tabla categorias)
  const interesesDisponibles = [
    { id: 1, nombre: "Restaurantes" },
    { id: 2, nombre: "Cafeterías" },
    { id: 3, nombre: "Tecnología" },
    { id: 4, nombre: "Salud y Fitness" },
    { id: 5, nombre: "Entretenimiento" },
    { id: 6, nombre: "Educación" },
    { id: 7, nombre: "Moda" },
    { id: 8, nombre: "Belleza" },
    { id: 9, nombre: "Deportes" },
    { id: 10, nombre: "Arte y Cultura" },
  ];

  const updateForm = (newData) =>
    setFormData((prev) => ({ ...prev, ...newData }));

  const toggleInteres = (interesId) => {
    updateForm({
      intereses: formData.intereses.includes(interesId)
        ? formData.intereses.filter((i) => i !== interesId)
        : [...formData.intereses, interesId],
    });
  };

  // Función para aplicar máscara de teléfono
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 8);
    if (value.length > 4) {
      value = `${value.slice(0, 4)}-${value.slice(4)}`;
    }
    updateForm({ telefono: value });
  };

  // Función para calcular edad
  const calcularEdad = (fechaNacimiento) => {
    const nacimiento = fechaNacimiento instanceof Date 
        ? fechaNacimiento
        : new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamaño del archivo (máximo 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB en bytes
    if (file.size > maxSize) {
      alert('La imagen es demasiado grande. Por favor selecciona una imagen menor a 2MB.');
      e.target.value = ''; // Limpiar el input
      return;
    }

    // Convertir a base64 para enviar al backend
    const reader = new FileReader();
    reader.onloadend = () => {
      updateForm({
        fotoFile: file,
        fotoPreview: URL.createObjectURL(file),
        fotoBase64: reader.result, // Guardar base64
      });
    };
    reader.readAsDataURL(file);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: // Nombres
        if (!formData.nombres.trim()) {
          alert("Por favor, escribe tu nombre");
          return false;
        }
        // Validar que solo contenga letras y espacios
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!nameRegex.test(formData.nombres)) {
          alert("El nombre solo debe contener letras");
          return false;
        }
        if (formData.nombres.trim().length < 2) {
          alert("El nombre debe tener al menos 2 caracteres");
          return false;
        }
        return true;

      case 2: // Apellidos
        if (!formData.apellidos.trim()) {
          alert("Por favor, escribe tus apellidos");
          return false;
        }
        // Validar que solo contenga letras y espacios
        const apellidoRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!apellidoRegex.test(formData.apellidos)) {
          alert("Los apellidos solo deben contener letras");
          return false;
        }
        if (formData.apellidos.trim().length < 2) {
          alert("Los apellidos deben tener al menos 2 caracteres");
          return false;
        }
        return true;

      case 3: // Género
        if (!formData.genero) {
          alert("Por favor, selecciona tu género");
          return false;
        }
        return true;

      case 4: // Fecha de nacimiento (Validación actualizada)
        if (!formData.fecha_nacimiento) {
          alert("Por favor, selecciona tu fecha de nacimiento");
          return false;
        }

        // Convertir la fecha almacenada (string) a objeto Date para validación
        const fechaNacDate = new Date(formData.fecha_nacimiento);
        const hoy = new Date();
        
        if (fechaNacDate > hoy) {
          alert("La fecha de nacimiento no puede ser futura");
          return false;
        }
        
        const edad = calcularEdad(fechaNacDate);
        if (edad < 18) {
          alert("Debes ser mayor de 18 años para registrarte");
          return false;
        }
        if (edad > 120) {
          alert("Por favor, verifica tu fecha de nacimiento");
          return false;
        }
        return true;

      case 5: // Correo
        if (!formData.correo.trim()) {
          alert("Por favor, escribe tu correo electrónico");
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.correo)) {
          alert("Por favor, ingresa un correo electrónico válido (ejemplo@correo.com)");
          return false;
        }
        return true;

      case 6: // Contraseña
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

      case 7: // Teléfono
        if (!formData.telefono.trim()) {
          alert("Por favor, escribe tu número de teléfono");
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

      case 8: // Foto (opcional)
        return true;

      case 9: // Intereses
        if (!formData.intereses.length) {
          alert("Por favor, selecciona al menos 1 interés");
          return false;
        }
        if (formData.intereses.length > 5) {
          alert("Puedes seleccionar máximo 5 intereses");
          return false;
        }
        return true;

      case 10: // Municipio
        if (!formData.id_municipio) {
          alert("Por favor, selecciona tu municipio");
          return false;
        }
        return true;

      case 11: // Términos
        if (!formData.terminos) {
          alert("Debes aceptar los términos y condiciones para continuar");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () =>
    setCurrentStep((prev) => Math.max(prev - 1, 1));

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
      if (currentStep < totalSteps) {
        nextStep();
      } else {
        submitForm();
      }
    }
  };

  const submitForm = async () => {
    setLoading(true);
    setError("");

    try {
      const userData = {
        email: formData.correo,
        password: formData.password,
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        fecha_nacimiento: formData.fecha_nacimiento,
        genero: formData.genero,
        telefono: formData.telefono,
        foto: formData.fotoBase64 || "", // Enviar base64 si existe
        id_municipio: parseInt(formData.id_municipio),
        descripcion: formData.descripcion || "",
        intereses: formData.intereses,
        ubicacion_activa: formData.ubicacion_activa,
      };

      const response = await registerUser(userData);

      setLoading(false); // Dejamos de cargar
      setShowSuccessModal(true); // Mostramos el modal
      console.log("Respuesta del servidor:", response);

      
    } catch (err) {
      console.error("Error en registro:", err);
      if (err.response?.data) {
        const data = err.response.data;
        let errorMessage = "Error en el registro:\n";

        // Si viene en el formato típico de Laravel (message + errors)
        if (data.errors && typeof data.errors === "object") {
          const mensajes = Object.values(data.errors) // arrays de mensajes
            .flat()                                   // un solo array
            .join("\n");                              // unir con saltos de línea

          errorMessage += mensajes;
        } else if (data.message) {
          // Otro tipo de error desde Laravel
          errorMessage += data.message;
        } else {
          errorMessage += "Ocurrió un error desconocido.";
        }


        setError(errorMessage);
        alert(errorMessage);
      } else {
        setError("Error al conectar con el servidor");
        alert("Error al conectar con el servidor. Verifica tu conexión.");
      }
    } finally {
      setLoading(false);
    }
  };

const handleSuccessClose = () => {
  setShowSuccessModal(false);
  navigate('/login'); // O a donde quieras redirigir
};
  const renderStep = () => {
    switch (currentStep) {
      case 1: // Nombres
        return (
          <>
            <h2 className="question-title">¿Cómo te llamas?</h2>
            <p className="question-subtitle">Tu nombre</p>
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
            <input
              className="big-input"
              type="text"
              placeholder="Ej: Juan Carlos"
              value={formData.nombres}
              onChange={(e) => updateForm({ nombres: e.target.value })}
              onKeyPress={handleKeyPress}
              autoFocus
              disabled={loading}
            />
          </>
        );

      case 2: // Apellidos
        return (
          <>
            <h2 className="question-title">¿Cuáles son tus apellidos?</h2>
            <p className="question-subtitle">Tus apellidos completos</p>
            <input
              className="big-input"
              type="text"
              placeholder="Ej: Pérez García"
              value={formData.apellidos}
              onChange={(e) => updateForm({ apellidos: e.target.value })}
              onKeyPress={handleKeyPress}
              autoFocus
            />
          </>
        );

      case 3: // Género
        return (
          <>
            <h2 className="question-title">¿Cómo te identificas?</h2>
            <p className="question-subtitle">Tu género</p>
            <div className="options-container">
              {[
                { value: "M", label: "Hombre" },
                { value: "F", label: "Mujer" },
                { value: "O", label: "Otro" }
              ].map((opcion) => (
                <div
                  key={opcion.value}
                  className={`option-card ${formData.genero === opcion.value ? "selected" : ""
                    }`}
                  onClick={() => updateForm({ genero: opcion.value })}
                >
                  <input
                    type="radio"
                    className="option-checkbox"
                    checked={formData.genero === opcion.value}
                    readOnly
                  />
                  <span>{opcion.label}</span>
                </div>
              ))}
            </div>
          </>
        );

      case 4: // Fecha de nacimiento (Implementación con DatePicker)
        const selectedDate = formData.fecha_nacimiento 
            ? moment(formData.fecha_nacimiento).toDate() 
            : null;

        return (
          <>
            <h2 className="question-title">¿Cuál es tu fecha de nacimiento?</h2>
            <p className="question-subtitle">Para verificar tu edad</p>
            <DatePicker
              selected={selectedDate} // Usa el objeto Date de Moment
              onChange={(date) => {
                // Guarda la fecha en el formato 'YYYY-MM-DD' esperado por la API
                const dateString = date ? moment(date).format("YYYY-MM-DD") : "";
                updateForm({ fecha_nacimiento: dateString });
              }}
              dateFormat="dd/MM/yyyy"
              maxDate={new Date()} // No permite seleccionar fechas futuras
              showYearDropdown // Muestra un selector de año desplegable
              scrollableYearDropdown // Permite desplazarse por los años
              yearDropdownItemNumber={100} // Muestra 100 años en el desplegable
              placeholderText="Selecciona tu fecha"
              className="big-input date-picker-custom" // Aplica estilos para que se vea bien
            />
            <style jsx="true">{`
                .date-picker-custom {
                    width: 100%;
                    padding: 12px 16px;
                    font-size: 1.1em;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    transition: border-color 0.3s;
                    text-align: center;
                    cursor: pointer;
                }
                /* Sobrescribe estilos del datepicker para coincidir con big-input */
                .react-datepicker-wrapper {
                  width: 100%;
                }
            `}</style>
          </>
        );

      case 5: // Correo
        return (
          <>
            <h2 className="question-title">¿Cuál es tu correo?</h2>
            <p className="question-subtitle">Tu correo electrónico</p>
            <input
              className="big-input"
              type="email"
              placeholder="correo@ejemplo.com"
              value={formData.correo}
              onChange={(e) => updateForm({ correo: e.target.value })}
              onKeyPress={handleKeyPress}
              autoFocus
            />
          </>
        );

      case 6: // Contraseña
        return (
          <>
            <h2 className="question-title">Crea tu contraseña</h2>
            <p className="question-subtitle">Mínimo 8 caracteres</p>
            <input
              className="big-input"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => updateForm({ password: e.target.value })}
              onKeyPress={handleKeyPress}
              autoFocus
            />
          </>
        );

      case 7: // Teléfono
        return (
          <>
            <h2 className="question-title">¿Cuál es tu teléfono?</h2>
            <p className="question-subtitle">Para contactarte si es necesario</p>
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

      case 8: // Foto
        return (
          <>
            <h2 className="question-title">Sube una foto tuya (opcional)</h2>
            <p className="question-subtitle">Ayuda a personalizar tu perfil</p>
            <label className="file-upload-box">
              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                style={{ display: "none" }}
              />
              {formData.fotoPreview ? (
                <img
                  src={formData.fotoPreview}
                  alt="Previsualización"
                  className="file-preview-img"
                />
              ) : (
                <div style={{ textAlign: "center", color: "#9ca3af" }}>
                  <div className="upload-icon" style={{ fontSize: "3rem", marginBottom: "10px" }}>
                    📷
                  </div>
                  <span style={{ display: "block", fontSize: "1.1rem", fontWeight: 500 }}>
                    Toca para seleccionar
                  </span>
                  <span style={{ fontSize: "0.9rem" }}>o arrastra tu foto aquí</span>
                </div>
              )}
            </label>
            {formData.fotoPreview && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  updateForm({ fotoFile: null, fotoPreview: null });
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
                Eliminar foto y subir otra
              </button>
            )}
          </>
        );

      case 9: // Intereses
        return (
          <>
            <h2 className="question-title">¿Qué te interesa?</h2>
            <p className="question-subtitle">
              Selecciona entre 1 y 5 intereses para personalizar tu experiencia
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                justifyContent: "center",
                marginTop: 12,
              }}
            >
              {interesesDisponibles.map((interes) => {
                const selected = formData.intereses.includes(interes.id);
                return (
                  <button
                    key={interes.id}
                    type="button"
                    className={`option-card ${selected ? "selected" : ""}`}
                    style={{
                      width: "auto",
                      minWidth: 120,
                      justifyContent: "center",
                    }}
                    onClick={() => toggleInteres(interes.id)}
                  >
                    {interes.nombre}
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: '10px', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
              Seleccionados: {formData.intereses.length} / 5
            </div>
          </>
        );

      case 10: // Municipio
        return (
          <>
            <h2 className="question-title">¿En qué municipio vives?</h2>
            <p className="question-subtitle">Para mostrarte opciones cercanas</p>
            {loadingMunicipios ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <p>Cargando municipios...</p>
              </div>
            ) : (
              <select
                className="big-input"
                value={formData.id_municipio}
                onChange={(e) => updateForm({ id_municipio: e.target.value })}
                onKeyPress={handleKeyPress}
                autoFocus
              >
                <option value="">Selecciona tu municipio</option>
                {municipios.map((municipio) => (
                  <option key={municipio.id} value={municipio.id}>
                    {municipio.nombre} {municipio.departamento ? `(${municipio.departamento})` : ''}
                  </option>
                ))}
              </select>
            )}
            <div style={{ marginTop: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.ubicacion_activa}
                  onChange={(e) => updateForm({ ubicacion_activa: e.target.checked })}
                  style={{ width: 18, height: 18 }}
                />
                <span>Activar ubicación para ver opciones cercanas</span>
              </label>
            </div>
          </>
        );

      case 11: // Términos
        return (
          <>
            <h2 className="question-title">Términos y servicios</h2>
            <p className="question-subtitle">Solo falta un paso.</p>

            <div style={{ marginTop: 8, display: "flex", justifyContent: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={formData.terminos}
                onChange={(e) => updateForm({ terminos: e.target.checked })}
                style={{ width: 18, height: 18 }}
              />
              <span>Acepto términos y servicios</span>
            </div>
          </>
        );

      default:
        return <div>Paso no encontrado</div>;
    }
  };

  return (
    <div className="wizard-layout" data-draggable-closing="true">
      {/* Botón de cancelar - X simple */}
      <button className="cancel-button" onClick={handleCancelClick} title="Cancelar registro">
        ✕
      </button>

      {/* Barra de progreso */}
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <div className="wizard-content">
        {/* Indicador de arrastrar para cerrar (solo móvil) */}
        <div className="drag-indicator" data-draggable-handle>
          <div className="drag-indicator-bar"></div>
        </div>
        {renderStep()}
      </div>

      <div className="bottom-bar">
        <button
          className="btn-prev"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          ← Anterior
        </button>

        {currentStep < totalSteps ? (
          <button className="btn-next" onClick={nextStep}>
            Siguiente →
          </button>
        ) : (
          <button
            className="btn-next"
            onClick={submitForm}
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Registrando..." : "Confirmar Registro ✨"}
          </button>
        )}
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
              Estás a punto de cancelar la creación de tu cuenta. Se perderán todos los datos ingresados hasta el momento.
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
      {/* Modal de Éxito al Registrarse */}
<SuccessModal
  isOpen={showSuccessModal}
  onClose={handleSuccessClose}
  title="¡Cuenta creada!"
  message="Tu registro se ha completado exitosamente. Ahora puedes iniciar sesión y explorar."
  btnText="Ir a Iniciar Sesión"
/>
    </div>
  );
}
