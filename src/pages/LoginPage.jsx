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
      <button 
        className="login-close-btn"
        onClick={() => navigate('/')}
        aria-label="Volver al inicio"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="login-card">
        <div className="login-form-header">
          <p className="login-greeting-top">¡Hola!</p>
          <h1 className="login-greeting-main">Bienvenido de nuevo</h1>
          <p className="login-greeting-sub">
            Inicia sesión para continuar explorando NegocioSV
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error">
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
  );
}
