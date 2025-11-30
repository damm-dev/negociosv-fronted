// src/pages/CuentaPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profileService from "../api/profileService";
import { useAuth } from "../context/AuthContext";
import "../styles/profile.css";

/* ==== ICONOS SVG MINIMALISTAS ==== */

function BadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="profile-menu-svg">
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="profile-menu-svg">
      <path
        d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="profile-menu-svg">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="profile-menu-svg">
      <path
        d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 17L21 12L16 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 12H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState("insignias");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    telefono: '',
    descripcion: '',
    id_municipio: null
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [updateMessage, setUpdateMessage] = useState('');

  // Cargar datos del perfil al montar el componente
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await profileService.getProfile();
      setProfileData(data);
      
      // Inicializar formulario con datos del perfil
      if (data.perfil) {
        setFormData({
          nombres: data.perfil.nombres || '',
          apellidos: data.perfil.apellidos || '',
          telefono: data.perfil.telefono || '',
          descripcion: data.perfil.descripcion || '',
          id_municipio: data.perfil.id_municipio || null
        });
      }
    } catch (err) {
      setError('Error al cargar el perfil. Por favor, intenta de nuevo.');
      console.error('Error cargando perfil:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdateMessage('');
      await profileService.updateProfile(formData);
      setUpdateMessage('Perfil actualizado correctamente');
      await loadProfile(); // Recargar datos
      setTimeout(() => setUpdateMessage(''), 3000);
    } catch (err) {
      setUpdateMessage('Error al actualizar el perfil');
      console.error('Error actualizando perfil:', err);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setUpdateMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      setUpdateMessage('');
      await profileService.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );
      setUpdateMessage('Contraseña actualizada correctamente');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setUpdateMessage(''), 3000);
    } catch (err) {
      setUpdateMessage('Error al cambiar la contraseña');
      console.error('Error cambiando contraseña:', err);
    }
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      logout();
      navigate('/');
    }
  };

  // Obtener iniciales para el avatar
  const getInitials = () => {
    if (!profileData?.perfil) return 'U';
    const nombres = profileData.perfil.nombres || '';
    const apellidos = profileData.perfil.apellidos || '';
    return `${nombres.charAt(0)}${apellidos.charAt(0)}`.toUpperCase();
  };

  // Obtener nombre completo
  const getFullName = () => {
    if (!profileData?.perfil) return 'Usuario';
    return `${profileData.perfil.nombres || ''} ${profileData.perfil.apellidos || ''}`.trim();
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-header">
          <h1>Cargando perfil...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="profile-header">
          <h1>Error</h1>
          <p>{error}</p>
          <button onClick={loadProfile} className="profile-btn-primary">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

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
              <span>{getInitials()}</span>
            </div>
            <div className="profile-user-info">
              <h3>{getFullName()}</h3>
              <p>{profileData?.usuario?.email || 'Sin email'}</p>
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
              <span className="profile-menu-icon">
                <BadgeIcon />
              </span>
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
              <span className="profile-menu-icon">
                <HeartIcon />
              </span>
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
              <span className="profile-menu-icon">
                <SettingsIcon />
              </span>
              <span>Configuración</span>
            </button>
          </nav>

          <div className="profile-sidebar-divider"></div>

          <button
            type="button"
            className="profile-logout-btn"
            onClick={handleLogout}
          >
            <span className="profile-menu-icon">
              <LogoutIcon />
            </span>
            <span>Cerrar sesión</span>
          </button>

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

              {updateMessage && (
                <div className={`profile-message ${updateMessage.includes('Error') ? 'error' : 'success'}`}>
                  {updateMessage}
                </div>
              )}

              <form className="profile-form" onSubmit={handleSubmit}>
                <div className="profile-form-row">
                  <div className="profile-form-group">
                    <label htmlFor="nombres">Nombres</label>
                    <input
                      id="nombres"
                      name="nombres"
                      type="text"
                      value={formData.nombres}
                      onChange={handleInputChange}
                      placeholder="Tus nombres"
                    />
                  </div>
                  <div className="profile-form-group">
                    <label htmlFor="apellidos">Apellidos</label>
                    <input
                      id="apellidos"
                      name="apellidos"
                      type="text"
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      placeholder="Tus apellidos"
                    />
                  </div>
                </div>

                <div className="profile-form-row">
                  <div className="profile-form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      placeholder="+503 7000 0000"
                    />
                  </div>
                  <div className="profile-form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                      id="email"
                      type="email"
                      value={profileData?.usuario?.email || ''}
                      disabled
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                </div>

                <div className="profile-form-group">
                  <label htmlFor="descripcion">Descripción</label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    placeholder="Cuéntanos sobre ti..."
                    rows="3"
                  />
                </div>

                <div className="profile-form-group">
                  <p><strong>Ubicación:</strong> {profileData?.municipio || 'No especificado'}, {profileData?.departamento || ''}</p>
                </div>

                <div className="profile-form-actions">
                  <button type="button" className="profile-btn-secondary" onClick={loadProfile}>
                    Cancelar
                  </button>
                  <button type="submit" className="profile-btn-primary">
                    Guardar cambios
                  </button>
                </div>
              </form>

              <hr className="profile-divider" />

              <h3 className="profile-section-title">Cambiar contraseña</h3>
              <form onSubmit={handlePasswordSubmit}>
                <div className="profile-form-row">
                  <div className="profile-form-group">
                    <label htmlFor="pass-actual">Contraseña actual</label>
                    <input 
                      id="pass-actual" 
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="profile-form-group">
                    <label htmlFor="pass-nueva">Nueva contraseña</label>
                    <input 
                      id="pass-nueva" 
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
                <div className="profile-form-group">
                  <label htmlFor="pass-confirm">
                    Confirmar nueva contraseña
                  </label>
                  <input 
                    id="pass-confirm" 
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="profile-form-actions">
                  <button type="submit" className="profile-btn-primary">
                    Cambiar contraseña
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
