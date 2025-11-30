import React, { useState } from "react";
import "../styles/formNegocio.css";

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    foto: null,
    previewFoto: null,
    intereses: [],
    emocionCasa: "",
    ciudad: "",
    activarUbicacion: false,
    terminos: false,
  });

  const totalSteps = 9;

  const interesesDisponibles = [
    "Tecnología", "Música", "Programación", "Videojuegos", "Noticias",
    "Deporte", "Salud y Fitness", "Películas", "Comida", "Política",
    "Finanzas", "Viajes", "Educación", "Arte", "Animales",
    "Moda", "Fotografía", "Cultura pop", "Ciencia", "Emprendimiento",
  ];

  const toggleInteres = (interes) => {
    setForm((prev) => {
      const yaEsta = prev.intereses.includes(interes);
      return {
        ...prev,
        intereses: yaEsta
          ? prev.intereses.filter((i) => i !== interes)
          : [...prev.intereses, interes],
      };
    });
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      foto: file,
      previewFoto: URL.createObjectURL(file),
    }));
  };

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const submitForm = () => {
    console.log("Formulario final:", form);
    alert("Formulario enviado  (mira la consola)");
  };

  return (
    <div style={{ width: "100%", height: "100vh", margin: 0, padding: 0 }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 12,
          color: "#aaa",
          zIndex: 999,
        }}
      >
        Registro paso {step} de {totalSteps}
      </div>

      <div className="wizard-card" style={{ maxWidth: "480px", margin: "0 auto", padding: "20px" }}>
        <h2 className="wizard-title">Registro paso a paso</h2>
        <p className="wizard-sub">Responde rápido y te daremos sugerencias más certeras.</p>

        {step === 1 && (
          <div>
            <label>¿Cómo te llamas?</label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, nombre: e.target.value }))
              }
              placeholder="Escribe tu nombre"
            />

            <div className="actions">
              <span />
              <button
                className="btn-primary"
                disabled={!form.nombre.trim()}
                onClick={next}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <label>¿Cuál es tu correo?</label>
            <input
              type="email"
              value={form.correo}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, correo: e.target.value }))
              }
              placeholder="correo@ejemplo.com"
            />
            <div className="help">
              Mientras más nos cuentes de tus gustos, más certeras serán tus sugerencias.
            </div>

            <div className="actions">
              <button className="btn-secondary" onClick={back}>
                Atrás
              </button>
              <button
                className="btn-primary"
                disabled={!form.correo.trim()}
                onClick={next}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <label>Crea una contraseña</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="••••••••"
            />

            <div className="actions">
              <button className="btn-secondary" onClick={back}>
                Atrás
              </button>
              <button
                className="btn-primary"
                disabled={form.password.length < 6}
                onClick={next}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <label>Sube una foto tuya</label>

            <div className="photo-row">
              <input type="file" accept="image/*" onChange={handleFile} />
              {form.previewFoto && (
                <img
                  className="photo-preview"
                  src={form.previewFoto}
                  alt="preview"
                />
              )}
            </div>

            <div className="actions">
              <button className="btn-secondary" onClick={back}>
                Atrás
              </button>
              <button className="btn-primary" onClick={next}>
                Siguiente
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <label>¿Qué temas te llaman la atención?</label>
            <div className="help">
              Mientras más nos cuentes de tus gustos, más certeras serán tus sugerencias.
            </div>

            <div className="interests">
              {interesesDisponibles.map((i) => {
                const selected = form.intereses.includes(i);
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => toggleInteres(i)}
                    className={`chip ${selected ? "selected" : ""}`}
                  >
                    {i}
                  </button>
                );
              })}
            </div>

            <div className="actions">
              <button className="btn-secondary" onClick={back}>
                Atrás
              </button>
              <button className="btn-primary" onClick={next}>
                Siguiente
              </button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <label>
              Cuando sales de tu casa, ¿qué te emociona encontrar?
            </label>
            <textarea
              value={form.emocionCasa}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, emocionCasa: e.target.value }))
              }
              placeholder="Por ejemplo: comida rica, lugares nuevos, gente cool..."
            />

            <div className="actions">
              <button className="btn-secondary" onClick={back}>
                Atrás
              </button>
              <button className="btn-primary" onClick={next}>
                Siguiente
              </button>
            </div>
          </div>
        )}

        {step === 7 && (
          <div>
            <label>¿En qué ciudad o municipio te encuentras?</label>
            <input
              type="text"
              value={form.ciudad}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, ciudad: e.target.value }))
              }
              placeholder="Ciudad / municipio"
            />

            <div className="actions">
              <button className="btn-secondary" onClick={back}>
                Atrás
              </button>
              <button
                className="btn-primary"
                disabled={!form.ciudad.trim()}
                onClick={next}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {step === 8 && (
          <div>
            <label>
              ¿Quieres activar tu ubicación para ver opciones cerquita?
            </label>
            <div className="help">
              Ubicación activa = opciones cercanas que sí te quedan.
            </div>

            <select
              value={form.activarUbicacion ? "si" : "no"}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  activarUbicacion: e.target.value === "si",
                }))
              }
            >
              <option value="no">No por ahora</option>
              <option value="si">Sí, activar ubicación</option>
            </select>

            <div className="actions">
              <button className="btn-secondary" onClick={back}>
                Atrás
              </button>
              <button className="btn-primary" onClick={next}>
                Siguiente
              </button>
            </div>
          </div>
        )}

        {step === 9 && (
          <div>
            <label>Términos y servicios</label>

            <div className="checkbox-row">
              <input
                type="checkbox"
                checked={form.terminos}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, terminos: e.target.checked }))
                }
              />
              <span>Acepto términos y servicios</span>
            </div>

            <div className="actions">
              <button className="btn-secondary" onClick={back}>
                Atrás
              </button>
              <button
                className="btn-primary"
                disabled={!form.terminos}
                onClick={submitForm}
              >
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
