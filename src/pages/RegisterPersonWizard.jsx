import React, { useState } from "react";
import "../styles/formNegocio.css"; // reutilizamos el mismo CSS/UX del wizard de negocio

export default function RegisterPersonWizard() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    nombre: "",
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

  const totalSteps = 9;

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
        if (!formData.correo.trim()) {
          alert("Escribe tu correo");
          return false;
        }
        return true;
      case 3:
        if (!formData.password || formData.password.length < 8) {
          alert("Contraseña mínimo 8 caracteres");
          return false;
        }
        return true;
      case 4:
        // Foto opcional (si la quieres obligatoria, descomenta abajo)
        // if (!formData.fotoPreview) { alert("Sube una foto para continuar"); return false; }
        return true;
      case 5:
        if (!formData.intereses.length) {
          alert("Selecciona al menos 1 tema");
          return false;
        }
        return true;
      case 6:
        if (!formData.emocionCasa.trim()) {
          alert("Cuéntanos qué te emociona encontrar");
          return false;
        }
        return true;
      case 7:
        if (!formData.ciudad.trim()) {
          alert("Escribe tu ciudad o municipio");
          return false;
        }
        return true;
      case 8:
        return true;
      case 9:
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

  const submitForm = () => {
    alert("¡Registro completado!");
    console.log("DATA FINAL PERSONA:", formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="question-title">¿Cómo te llamas?</h2>
            <p className="question-subtitle">Queremos conocerte 🙂</p>
            <input
              className="big-input"
              type="text"
              placeholder="Tu nombre"
              value={formData.nombre}
              onChange={(e) => updateForm({ nombre: e.target.value })}
              autoFocus
            />
          </>
        );

      case 2:
        return (
          <>
            <h2 className="question-title">¿Cuál es tu correo?</h2>
            <p className="question-subtitle">Será tu usuario para entrar.</p>
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

      case 3:
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

      case 4:
        return (
          <>
            <h2 className="question-title">Sube una foto tuya</h2>
            <p className="question-subtitle">Ayuda a personalizar tu perfil.</p>

            <input
              className="big-input"
              style={{ padding: "10px" }}
              type="file"
              accept="image/*"
              onChange={handleFile}
            />

            {formData.fotoPreview && (
              <div style={{ marginTop: 16 }}>
                <img
                  src={formData.fotoPreview}
                  alt="preview"
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: "999px",
                    objectFit: "cover",
                    border: "2px solid #e5e7eb",
                  }}
                />
              </div>
            )}
          </>
        );

      case 5:
        return (
          <>
            <h2 className="question-title">¿Qué temas te llaman la atención?</h2>
            <p className="question-subtitle">
              Mientras más nos cuentes de tus gustos, más certeras serán tus sugerencias.
            </p>

            {/* Usamos el look de "option-card" del CSS de negocio */}
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

      case 6:
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

      case 7:
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

      case 8:
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

      case 9:
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
      {/* contenido centrado */}
      <div className="wizard-content">
        {renderStep()}
      </div>

      {/* barra inferior idéntica UX del wizard negocio */}
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
          <button className="btn-next" onClick={submitForm}>
            Confirmar Registro ✨
          </button>
        )}
      </div>
    </div>
  );
}
