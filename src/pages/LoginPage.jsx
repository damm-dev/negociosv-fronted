// src/pages/LoginPage.jsx
import "../styles/login.css";

export default function LoginPage() {
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

            <form className="login-form">
              <div className="login-input-group">
                <label className="login-label" htmlFor="email">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  className="login-input"
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>

              <div className="login-input-group">
                <label className="login-label" htmlFor="password">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  className="login-input"
                  placeholder="••••••••"
                />
              </div>

              <div className="login-extra-row">
                <label className="login-remember">
                  <input type="checkbox" />
                  <span>Recordarme</span>
                </label>

                <button
                  type="button"
                  className="login-link-button login-forgot"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <button type="submit" className="login-submit">
                Iniciar sesión
              </button>

              <p className="login-register-text">
                ¿No tienes una cuenta?{" "}
                <button
                  type="button"
                  className="login-link-button login-register-link"
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
