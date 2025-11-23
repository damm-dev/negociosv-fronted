// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(formData.email, formData.password);
      
      // Mostrar mensaje de éxito
      alert(`¡Bienvenido! ${response.message}`);
      
      // Redirigir según el tipo de usuario
      if (response.type === 'user') {
        navigate('/cuenta');
      } else if (response.type === 'negocio') {
        navigate('/cuenta');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error("Error en login:", err);
      
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 401) {
        setError("Credenciales inválidas. Por favor verifica tu correo y contraseña.");
      } else if (err.response?.status === 422) {
        setError("Por favor completa todos los campos correctamente.");
      } else {
        setError("Error al conectar con el servidor. Verifica tu conexión.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    navigate('/account-type');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* LADO IZQUIERDO: ilustración / mensaje */}
        <div className="login-illustration">
          <div className="login-illustration-orbit">
            <div className="login-illustration-moon" />
            <div className="login-illustration-hill hill-1" />
            <div className="login-illustration-hill hill-2" />
            <div className="login-illustration-hill hill-3" />
          </div>

          <div className="login-illustration-text">
            <h2>Descubre negocios salvadoreños</h2>
            <p>
              Apoya a emprendedores locales y encuentra el lugar perfecto para
              tu siguiente compra.
            </p>
          </div>
        </div>

        {/* LADO DERECHO: formulario */}
        <div className="login-form-wrapper">
          <div className="login-form-card">
            <div className="login-form-header">
              <p className="login-greeting-top">¡Hola!</p>
              <p className="login-greeting-main">Bienvenido de nuevo</p>
              <p className="login-greeting-sub">
                Inicia sesión para continuar explorando NegocioSV.
              </p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              {error && (
                <div style={{
                  padding: '12px',
                  marginBottom: '16px',
                  backgroundColor: '#fee2e2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  color: '#dc2626',
                  fontSize: '14px',
                }}>
                  {error}
                </div>
              )}
              <div className="login-input-group">
                <label className="login-label" htmlFor="email">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="login-input"
                  placeholder="tucorreo@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="login-input-group">
                <label className="login-label" htmlFor="password">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="login-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="login-extra-row">
                <label className="login-remember">
                  <input 
                    type="checkbox" 
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <span>Recordarme</span>
                </label>

                <button
                  type="button"
                  className="login-link-button login-forgot"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <button 
                type="submit" 
                className="login-submit"
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>

              <p className="login-register-text">
                ¿No tienes una cuenta?{" "}
                <button
                  type="button"
                  className="login-link-button login-register-link"
                  onClick={handleCreateAccount}
                  disabled={loading}
                >
                  Crear cuenta
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
