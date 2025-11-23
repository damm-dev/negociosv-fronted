// src/pages/CuentaPage.jsx
import { useState } from "react";
import "../styles/profile.css";

function Badge({ label, description }) {
  return (
    <div className="profile-badge">
      <div className="profile-badge-icon">★</div>
      <div>
        <h4>{label}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

function FavoriteItem({ name, category, location }) {
  return (
    <div className="profile-favorite">
      <div>
        <h4>{name}</h4>
        <p>
          {category} · {location}
        </p>
      </div>
      <button type="button" className="profile-favorite-btn">
        Ver
      </button>
    </div>
  );
}

export default function CuentaPage() {
  const [activeSection, setActiveSection] = useState("insignias");

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Tu perfil</h1>
        <p>Gestiona tu cuenta y personaliza tu experiencia en NegocioSV.</p>
      </div>

      <div className="profile-container">
        {/* SIDEBAR */}
        <aside className="profile-sidebar">
          <div className="profile-user-summary">
            <div className="profile-avatar">
              <span>AS</span>
            </div>
            <div className="profile-user-info">
              <h3>Amner Saucedo</h3>
              <p>amner@example.com</p>
            </div>
          </div>

          <nav className="profile-menu">
            <button
              type="button"
              className={
                "profile-menu-item" +
                (activeSection === "insignias" ? " profile-menu-item--active" : "")
              }
              onClick={() => setActiveSection("insignias")}
            >
              <span className="profile-menu-icon">🏅</span>
              <span>Insignias</span>
            </button>

            <button
              type="button"
              className={
                "profile-menu-item" +
                (activeSection === "favoritos" ? " profile-menu-item--active" : "")
              }
              onClick={() => setActiveSection("favoritos")}
            >
              <span className="profile-menu-icon">⭐</span>
              <span>Favoritos</span>
            </button>

            <button
              type="button"
              className={
                "profile-menu-item" +
                (activeSection === "config" ? " profile-menu-item--active" : "")
              }
              onClick={() => setActiveSection("config")}
            >
              <span className="profile-menu-icon">⚙️</span>
              <span>Configuración</span>
            </button>
          </nav>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <section className="profile-content">
          {activeSection === "insignias" && (
            <div className="profile-card">
              <h2>Insignias</h2>
              <p className="profile-card-sub">
                Gana insignias al apoyar negocios y usar la plataforma.
              </p>

              <div className="profile-badges-grid">
                <Badge
                  label="Explorador"
                  description="Visitaste 10 negocios distintos."
                />
                <Badge
                  label="Cliente fiel"
                  description="Guardaste 5 negocios como favoritos."
                />
                <Badge
                  label="Apoyo local"
                  description="Recomendaste negocios a otras personas."
                />
              </div>
            </div>
          )}

          {activeSection === "favoritos" && (
            <div className="profile-card">
              <h2>Favoritos</h2>
              <p className="profile-card-sub">
                Estos son algunos de los negocios que te gustan.
              </p>

              <div className="profile-favorites-list">
                <FavoriteItem
                  name="Pupusería Doña Ana"
                  category="Comida típica"
                  location="San Salvador"
                />
                <FavoriteItem
                  name="Café El Mirador"
                  category="Cafetería"
                  location="Santa Tecla"
                />
                <FavoriteItem
                  name="Tienda TechSV"
                  category="Tecnología"
                  location="San Miguel"
                />
              </div>
            </div>
          )}

          {activeSection === "config" && (
            <div className="profile-card">
              <h2>Configuración de perfil</h2>
              <p className="profile-card-sub">
                Actualiza tu información personal y preferencias.
              </p>

              <form className="profile-form">
                <div className="profile-form-row">
                  <div className="profile-form-group">
                    <label htmlFor="nombre">Nombre completo</label>
                    <input
                      id="nombre"
                      type="text"
                      placeholder="Amner Saucedo"
                    />
                  </div>
                  <div className="profile-form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="amner@example.com"
                    />
                  </div>
                </div>

                <div className="profile-form-row">
                  <div className="profile-form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                      id="telefono"
                      type="tel"
                      placeholder="+503 7000 0000"
                    />
                  </div>
                  <div className="profile-form-group">
                    <label htmlFor="ciudad">Ciudad</label>
                    <input id="ciudad" type="text" placeholder="San Salvador" />
                  </div>
                </div>

                <div className="profile-form-group">
                  <label htmlFor="direccion">Dirección</label>
                  <input
                    id="direccion"
                    type="text"
                    placeholder="Colonia, calle, referencia..."
                  />
                </div>

                <hr className="profile-divider" />

                <h3 className="profile-section-title">Cambiar contraseña</h3>
                <div className="profile-form-row">
                  <div className="profile-form-group">
                    <label htmlFor="pass-actual">Contraseña actual</label>
                    <input id="pass-actual" type="password" />
                  </div>
                  <div className="profile-form-group">
                    <label htmlFor="pass-nueva">Nueva contraseña</label>
                    <input id="pass-nueva" type="password" />
                  </div>
                </div>
                <div className="profile-form-group">
                  <label htmlFor="pass-confirm">
                    Confirmar nueva contraseña
                  </label>
                  <input id="pass-confirm" type="password" />
                </div>

                <div className="profile-form-actions">
                  <button type="button" className="profile-btn-secondary">
                    Cancelar
                  </button>
                  <button type="submit" className="profile-btn-primary">
                    Guardar cambios
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
