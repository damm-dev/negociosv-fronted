import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/formNegocio.css";

export default function RegisterPersonWizard() {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    nombre: "",
    genero: "",
    correo: "",
    password: "",
    fotoFile: null,
    fotoPreview: null,
    intereses: [],
    emocionCasa: "",
    ciudad: "",
    activarUbicacion: false,
    terminos: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalSteps = 10;

  const interesesDisponibles = [
    "Tecnología","Música","Programación","Videojuegos","Noticias",
    "Deporte","Salud y Fitness","Películas","Comida","Política",
    "Finanzas","Viajes","Educación","Arte","Animales",
    "Moda","Fotografía","Cultura pop","Ciencia","Emprendimiento",
  ];

  const updateForm = (newData) =>
    setFormData((prev) => ({ ...prev, ...newData }));

  const toggleInteres = (interes) => {
    updateForm({
      intereses: formData.intereses.includes(interes)
        ? formData.intereses.filter((i) => i !== interes)
        : [...formData.intereses, interes],
    });
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    updateForm({
      fotoFile: file,
      fotoPreview: URL.createObjectURL(file),
    });
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: 
        if (!formData.nombre.trim()) {
          alert("Escribe tu nombre");
          return false;
        }
        return true;
      
      case 2: 
        if (!formData.genero) {
          alert("Selecciona tu género");
          return false;
        }
        return true;

      case 3: 
        if (!formData.correo.trim()) {
          alert("Escribe tu correo");
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.correo)) {
          alert("Por favor, ingresa un correo válido (ej: usuario@mail.com)");
          return false;
        }
        return true;
      case 4: 
        if (!formData.password || formData.password.length < 8) {
          alert("Contraseña mínimo 8 caracteres");
          return false;
        }
        return true;

      case 5: 
        return true;

      case 6: 
        if (!formData.intereses.length) {
          alert("Selecciona al menos 1 tema");
          return false;
        }
        return true;

      case 7: 
        if (!formData.emocionCasa.trim()) {
          alert("Cuéntanos qué te emociona encontrar");
          return false;
        }
        return true;

      case 8:
        if (!formData.ciudad.trim()) {
          alert("Escribe tu ciudad o municipio");
          return false;
        }
        return true;

      case 9: 
        return true;

      case 10: 
        if (!formData.terminos) {
          alert("Debes aceptar términos");
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

  const submitForm = async () => {
    setLoading(true);
    setError("");

    try {
      const userData = {
        nombre: formData.nombre,
        apellidos: "",
        genero: formData.genero,
        correo: formData.correo,
        password: formData.password,
        fotoFile: formData.fotoFile,
        ciudad: formData.ciudad,
        municipio: "",
        departamento: "",
        activarUbicacion: formData.activarUbicacion,
      };

      const response = await registerUser(userData);
      
      alert("¡Registro completado exitosamente! 🎉");
      console.log("Respuesta del servidor:", response);
      
      navigate('/login');
    } catch (err) {
      console.error("Error en registro:", err);
      
      if (err.response?.data) {
        const errors = err.response.data;
        let errorMessage = "Error en el registro:\n";
        
        if (typeof errors === 'object') {
          Object.keys(errors).forEach(key => {
            if (Array.isArray(errors[key])) {
              errorMessage += `${errors[key].join(', ')}\n`;
            }
          });
        } else {
          errorMessage = errors.message || "Error desconocido";
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="question-title">¿Cómo te llamas?</h2>
            <p className="question-subtitle">Queremos conocerte</p>
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
              placeholder="Tu nombre"
              value={formData.nombre}
              onChange={(e) => updateForm({ nombre: e.target.value })}
              autoFocus
              disabled={loading}
            />
          </>
        );
case 2: 
        return (
          <>
            <h2 className="question-title">¿Cómo te identificas?</h2>
            <p className="question-subtitle">
              Para dirigirnos a ti correctamente
            </p>

            <div className="options-container">
              {["Hombre", "Mujer", "Otro"].map((opcion) => (
                <div
                  key={opcion}
                  className={`option-card ${
                    formData.genero === opcion ? "selected" : ""
                  }`}
                  onClick={() => updateForm({ genero: opcion })}
                >
                  <input
                    type="radio"
                    className="option-checkbox"
                    checked={formData.genero === opcion}
                    readOnly
                  />
                  <span>{opcion}</span>
                </div>
              ))}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="question-title">¿Cuál es tu correo?</h2>
            <p className="question-subtitle"></p>
            <input
              className="big-input"
              type="email"
              placeholder="correo@ejemplo.com"
              value={formData.correo}
              onChange={(e) => updateForm({ correo: e.target.value })}
              autoFocus
            />
          </>
        );

      case 4:
        return (
          <>
            <h2 className="question-title">Crea tu contraseña</h2>
            <p className="question-subtitle">Al menos 8 caracteres.</p>
            <input
              className="big-input"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => updateForm({ password: e.target.value })}
              autoFocus
            />
          </>
        );

      case 5: // FOTO
        return (
          <>
            <h2 className="question-title">Sube una foto tuya</h2>
            <p className="question-subtitle">Ayuda a personalizar tu perfil.</p>

            {/* Usamos un label para que toda la caja sea clickeable */}
            <label className="file-upload-box">
              {/* Input oculto pero funcional */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                style={{ display: "none" }}
              />

              {formData.fotoPreview ? (
                // Si hay foto, mostramos la previsualización
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
      case 6:
        return (
          <>
            <h2 className="question-title">¿Qué temas te llaman la atención?</h2>
            <p className="question-subtitle">
              Mientras más nos cuentes de tus gustos, más certeras serán tus sugerencias.
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
              {interesesDisponibles.map((i) => {
                const selected = formData.intereses.includes(i);
                return (
                  <button
                    key={i}
                    type="button"
                    className={`option-card ${selected ? "selected" : ""}`}
                    style={{
                      width: "auto",
                      minWidth: 120,
                      justifyContent: "center",
                    }}
                    onClick={() => toggleInteres(i)}
                  >
                    {i}
                  </button>
                );
              })}
            </div>
          </>
        );

      case 7:
        return (
          <>
            <h2 className="question-title">
              Cuando sales de tu casa, ¿qué te emociona encontrar?
            </h2>
            <p className="question-subtitle">
              Cuéntanos un poquito más de ti.
            </p>
            <textarea
              className="big-input"
              placeholder="Ej: comida rica, lugares nuevos, eventos, etc."
              value={formData.emocionCasa}
              onChange={(e) => updateForm({ emocionCasa: e.target.value })}
              autoFocus
            />
          </>
        );

      case 8:
        return (
          <>
            <h2 className="question-title">¿En qué ciudad o municipio estás?</h2>
            <p className="question-subtitle">Para darte opciones locales.</p>
            <input
              className="big-input"
              type="text"
              placeholder="Ciudad / municipio"
              value={formData.ciudad}
              onChange={(e) => updateForm({ ciudad: e.target.value })}
              autoFocus
            />
          </>
        );

      case 9:
        return (
          <>
            <h2 className="question-title">
              ¿Quieres activar tu ubicación para ver opciones cerquita?
            </h2>
            <p className="question-subtitle">
              Ubicación activa = opciones cercanas que sí te quedan.
            </p>

            <div className="options-container">
              <button
                type="button"
                className={`option-card ${formData.activarUbicacion ? "selected" : ""}`}
                onClick={() => updateForm({ activarUbicacion: true })}
              >
                Sí, activar ubicación
              </button>

              <button
                type="button"
                className={`option-card ${!formData.activarUbicacion ? "selected" : ""}`}
                onClick={() => updateForm({ activarUbicacion: false })}
              >
                No por ahora
              </button>
            </div>
          </>
        );

      case 10:
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
    <div className="wizard-layout">
      <div className="wizard-content">
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
    </div>
  );
}
