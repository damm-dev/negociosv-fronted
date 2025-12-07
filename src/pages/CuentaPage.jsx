// src/pages/CuentaPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profileService from "../api/profileService";
import favoritosService from "../api/favoritosService";
import logrosService from "../api/logrosService";
import seguimientosService from "../api/seguimientosService";
import negocioService from "../api/negocioService";
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

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="profile-menu-svg">
      <path
        d="M3 3v18h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 17V9M13 17V5M8 17v-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReviewIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="profile-menu-svg">
      <path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="profile-upload-icon">
      <path
        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Componente para logros (persona) - CON DATOS REALES
function Achievement({ logro, progreso }) {
  // Validar que el logro tenga datos
  if (!logro) {
    return null;
  }

  const porcentaje = progreso && logro.meta ? (progreso.progreso_actual / logro.meta) * 100 : 0;
  const completado = progreso?.completado || false;

  return (
    <div className={`profile-achievement ${completado ? 'unlocked' : 'locked'}`}>
      <div className="profile-achievement-icon">{logro.icono || '🏆'}</div>
      <div className="profile-achievement-info">
        <h4>{logro.nombre || 'Logro sin nombre'}</h4>
        <p>{logro.descripcion || 'Sin descripción'}</p>
        {!completado && progreso && logro.meta && (
          <div className="profile-achievement-progress">
            <div className="profile-progress-bar">
              <div 
                className="profile-progress-fill" 
                style={{ width: `${Math.min(porcentaje, 100)}%` }}
              ></div>
            </div>
            <span className="profile-progress-text">
              {progreso.progreso_actual} / {logro.meta}
            </span>
          </div>
        )}
      </div>
      {completado && <span className="profile-achievement-badge">✓</span>}
    </div>
  );
}

// Componente para favoritos (persona) - CON DATOS REALES
function FavoriteItem({ favorito, onEliminar, onVer }) {
  const [eliminando, setEliminando] = useState(false);

  // Validar que el favorito tenga datos del negocio
  if (!favorito || !favorito.negocio) {
    return null;
  }

  const handleEliminar = async () => {
    if (window.confirm('¿Estás seguro de eliminar este favorito?')) {
      setEliminando(true);
      try {
        await onEliminar(favorito.negocio.id);
      } catch (error) {
        console.error('Error al eliminar favorito:', error);
        setEliminando(false);
      }
    }
  };

  return (
    <div className="profile-favorite">
      <div>
        <h4>{favorito.negocio.nombre || 'Negocio sin nombre'}</h4>
        <p>
          {favorito.negocio.categoria?.nombre || 'Sin categoría'} · {favorito.negocio.municipio?.nombre || 'Sin ubicación'}
        </p>
      </div>
      <div className="profile-favorite-actions">
        <button
          type="button"
          className="profile-favorite-btn profile-btn-view"
          onClick={() => onVer(favorito.negocio.id)}
        >
          Ver
        </button>
        <button
          type="button"
          className="profile-favorite-btn profile-btn-delete"
          onClick={handleEliminar}
          disabled={eliminando}
        >
          {eliminando ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </div>
  );
}

// Componente para estadísticas (negocio) - CON DATOS REALES
function StatCard({ label, value, icon }) {
  return (
    <div className="profile-stat-card">
      <div className="profile-stat-icon">{icon}</div>
      <div className="profile-stat-info">
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
}

// Componente para reseñas (negocio)
function ReviewItem({ author, rating, comment, date }) {
  return (
    <div className="profile-review">
      <div className="profile-review-header">
        <div>
          <h4>{author}</h4>
          <div className="profile-review-rating">
            {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
          </div>
        </div>
        <span className="profile-review-date">{date}</span>
      </div>
      <p className="profile-review-comment">{comment}</p>
    </div>
  );
}

export default function CuentaPage() {
  const navigate = useNavigate();
  const { logout, userType } = useAuth();
  const [activeSection, setActiveSection] = useState(userType === 'negocio' ? 'estadisticas' : 'logros');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [updateMessage, setUpdateMessage] = useState('');

  // Estados para funcionalidades nuevas
  const [logros, setLogros] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    visualizaciones: 0,
    favoritos: 0,
    resenas: 0,
    seguidores: 0
  });
  const [loadingLogros, setLoadingLogros] = useState(false);
  const [loadingFavoritos, setLoadingFavoritos] = useState(false);
  const [loadingEstadisticas, setLoadingEstadisticas] = useState(false);

  // Estados para upload de fotos
  const [uploadingFoto, setUploadingFoto] = useState(false);
  const [previewFoto, setPreviewFoto] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [fotosNegocio, setFotosNegocio] = useState([]);
  const [uploadingFotoNegocio, setUploadingFotoNegocio] = useState(false);

  // Cargar datos del perfil al montar el componente
  useEffect(() => {
    loadProfile();
  }, [userType]);

  // Cargar logros cuando se selecciona la sección (solo persona)
  useEffect(() => {
    if (userType === 'persona' && activeSection === 'logros') {
      loadLogros();
    }
  }, [activeSection, userType]);

  // Cargar favoritos cuando se selecciona la sección (solo persona)
  useEffect(() => {
    if (userType === 'persona' && activeSection === 'favoritos') {
      loadFavoritos();
    }
  }, [activeSection, userType]);

  // Cargar estadísticas cuando se selecciona la sección (solo negocio)
  useEffect(() => {
    if (userType === 'negocio' && activeSection === 'estadisticas' && profileData?.negocio?.id) {
      loadEstadisticas();
    }
  }, [activeSection, userType, profileData]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data;
      if (userType === 'negocio') {
        data = await profileService.getBusinessProfile();
        // Inicializar formulario con datos del negocio
        if (data.negocio) {
          setFormData({
            id: data.negocio.id,
            nombre: data.negocio.nombre || '',
            descripcion: data.negocio.descripcion || '',
            direccion: data.negocio.direccion || '',
            telefono: data.negocio.telefono || '',
            email_contacto: data.negocio.email_contacto || '',
            id_municipio: data.negocio.id_municipio || null
          });
          // Cargar fotos del negocio si existen
          if (data.negocio.fotos) {
            setFotosNegocio(data.negocio.fotos);
          }
        }
      } else {
        data = await profileService.getProfile();
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
      }
      
      setProfileData(data);
    } catch (err) {
      setError('Error al cargar el perfil. Por favor, intenta de nuevo.');
      console.error('Error cargando perfil:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadLogros = async () => {
    try {
      setLoadingLogros(true);
      const data = await logrosService.obtenerLogros();
      setLogros(data.logros || []);
    } catch (err) {
      console.error('Error cargando logros:', err);
    } finally {
      setLoadingLogros(false);
    }
  };

  const loadFavoritos = async () => {
    try {
      setLoadingFavoritos(true);
      const data = await favoritosService.obtenerFavoritos();
      setFavoritos(data.favoritos || []);
    } catch (err) {
      console.error('Error cargando favoritos:', err);
    } finally {
      setLoadingFavoritos(false);
    }
  };

  const loadEstadisticas = async () => {
    try {
      setLoadingEstadisticas(true);
      
      if (profileData?.negocio?.id) {
        // Obtener seguidores
        const seguidoresData = await seguimientosService.obtenerSeguidores(profileData.negocio.id);
        
        // Obtener datos del negocio para otras estadísticas
        const negocioData = await negocioService.obtenerNegocio(profileData.negocio.id);
        
        setEstadisticas({
          visualizaciones: negocioData.negocio?.visualizaciones || 0,
          favoritos: negocioData.negocio?.total_favoritos || 0,
          resenas: negocioData.negocio?.total_resenas || 0,
          seguidores: seguidoresData.total || 0
        });
      }
    } catch (err) {
      console.error('Error cargando estadísticas:', err);
    } finally {
      setLoadingEstadisticas(false);
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
      
      if (userType === 'negocio') {
        await profileService.updateBusinessProfile(formData);
      } else {
        await profileService.updateProfile(formData);
      }
      
      setUpdateMessage('Perfil actualizado correctamente');
      await loadProfile();
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

  // Manejar upload de foto de perfil (persona)
  const handleFotoPerfilChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUpdateMessage('La imagen es muy grande. Máximo 5MB.');
      return;
    }

    // Validar formato
    if (!file.type.startsWith('image/')) {
      setUpdateMessage('Solo se permiten archivos de imagen.');
      return;
    }

    // Mostrar preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewFoto(reader.result);
    };
    reader.readAsDataURL(file);

    // Subir foto
    try {
      setUploadingFoto(true);
      setUpdateMessage('');
      await profileService.subirFotoPerfil(file);
      setUpdateMessage('Foto de perfil actualizada correctamente');
      await loadProfile();
      setTimeout(() => {
        setUpdateMessage('');
        setPreviewFoto(null);
      }, 2000);
    } catch (err) {
      setUpdateMessage('Error al subir la foto de perfil');
      console.error('Error subiendo foto:', err);
    } finally {
      setUploadingFoto(false);
    }
  };

  // Manejar upload de logo (negocio)
  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUpdateMessage('La imagen es muy grande. Máximo 5MB.');
      return;
    }

    // Validar formato
    if (!file.type.startsWith('image/')) {
      setUpdateMessage('Solo se permiten archivos de imagen.');
      return;
    }

    // Mostrar preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewLogo(reader.result);
    };
    reader.readAsDataURL(file);

    // Subir logo
    try {
      setUploadingLogo(true);
      setUpdateMessage('');
      await profileService.subirLogo(file);
      setUpdateMessage('Logo actualizado correctamente');
      await loadProfile();
      setTimeout(() => {
        setUpdateMessage('');
        setPreviewLogo(null);
      }, 2000);
    } catch (err) {
      setUpdateMessage('Error al subir el logo');
      console.error('Error subiendo logo:', err);
    } finally {
      setUploadingLogo(false);
    }
  };

  // Manejar upload de fotos adicionales (negocio)
  const handleFotoNegocioChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar que no exceda el límite de 4 fotos
    if (fotosNegocio.length >= 4) {
      setUpdateMessage('Máximo 4 fotos adicionales permitidas.');
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUpdateMessage('La imagen es muy grande. Máximo 5MB.');
      return;
    }

    // Validar formato
    if (!file.type.startsWith('image/')) {
      setUpdateMessage('Solo se permiten archivos de imagen.');
      return;
    }

    // Subir foto
    try {
      setUploadingFotoNegocio(true);
      setUpdateMessage('');
      const orden = fotosNegocio.length + 1;
      await negocioService.subirFotoNegocio(formData.id, file, orden);
      setUpdateMessage('Foto agregada correctamente');
      await loadProfile();
      setTimeout(() => setUpdateMessage(''), 2000);
    } catch (err) {
      setUpdateMessage('Error al subir la foto');
      console.error('Error subiendo foto de negocio:', err);
    } finally {
      setUploadingFotoNegocio(false);
    }
  };

  // Eliminar foto del negocio
  const handleEliminarFotoNegocio = async (idFoto) => {
    if (!window.confirm('¿Estás seguro de eliminar esta foto?')) return;

    try {
      setUpdateMessage('');
      await negocioService.eliminarFotoNegocio(formData.id, idFoto);
      setUpdateMessage('Foto eliminada correctamente');
      await loadProfile();
      setTimeout(() => setUpdateMessage(''), 2000);
    } catch (err) {
      setUpdateMessage('Error al eliminar la foto');
      console.error('Error eliminando foto:', err);
    }
  };

  // Eliminar favorito
  const handleEliminarFavorito = async (idNegocio) => {
    try {
      await favoritosService.eliminarFavorito(idNegocio);
      setUpdateMessage('Favorito eliminado correctamente');
      await loadFavoritos();
      setTimeout(() => setUpdateMessage(''), 2000);
    } catch (err) {
      setUpdateMessage('Error al eliminar favorito');
      console.error('Error eliminando favorito:', err);
    }
  };

  // Ver detalle de negocio
  const handleVerNegocio = (idNegocio) => {
    navigate(`/negocio/${idNegocio}`);
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      logout();
      navigate('/');
    }
  };

  // Obtener iniciales o logo para el avatar
  const getAvatarContent = () => {
    if (userType === 'negocio') {
      // Si hay logo, mostrarlo
      if (profileData?.logo_url) {
        return <img src={profileData.logo_url} alt="Logo" className="profile-avatar-img" />;
      }
      // Si no hay logo, mostrar inicial del nombre del negocio
      const nombre = profileData?.negocio?.nombre || 'N';
      return <span>{nombre.charAt(0).toUpperCase()}</span>;
    } else {
      // Si hay foto, mostrarla
      if (profileData?.foto_url) {
        return <img src={profileData.foto_url} alt="Foto" className="profile-avatar-img" />;
      }
      // Si no hay foto, mostrar iniciales
      const nombres = profileData?.perfil?.nombres || '';
      const apellidos = profileData?.perfil?.apellidos || '';
      return <span>{`${nombres.charAt(0)}${apellidos.charAt(0)}`.toUpperCase() || 'U'}</span>;
    }
  };

  // Obtener nombre completo o nombre del negocio
  const getDisplayName = () => {
    if (userType === 'negocio') {
      return profileData?.negocio?.nombre || 'Negocio';
    } else {
      if (!profileData?.perfil) return 'Usuario';
      return `${profileData.perfil.nombres || ''} ${profileData.perfil.apellidos || ''}`.trim();
    }
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
        <h1>{userType === 'negocio' ? 'Perfil de Negocio' : 'Tu perfil'}</h1>
        <p>
          {userType === 'negocio' 
            ? 'Gestiona la información de tu negocio y revisa tus estadísticas.'
            : 'Gestiona tu cuenta y personaliza tu experiencia en NegocioSV.'}
        </p>
      </div>

      <div className="profile-container">
        {/* SIDEBAR */}
        <aside className="profile-sidebar">
          <div className="profile-user-summary">
            <div className="profile-avatar">
              {getAvatarContent()}
            </div>
            <div className="profile-user-info">
              <h3>{getDisplayName()}</h3>
              <p>{profileData?.usuario?.email || 'Sin email'}</p>
            </div>
          </div>

          <nav className="profile-menu">
            {/* Menú para PERSONA */}
            {userType === 'persona' && (
              <>
                <button
                  type="button"
                  className={
                    "profile-menu-item" +
                    (activeSection === "logros" ? " profile-menu-item--active" : "")
                  }
                  onClick={() => setActiveSection("logros")}
                >
                  <span className="profile-menu-icon">
                    <BadgeIcon />
                  </span>
                  <span>Logros</span>
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
              </>
            )}

            {/* Menú para NEGOCIO */}
            {userType === 'negocio' && (
              <>
                <button
                  type="button"
                  className={
                    "profile-menu-item" +
                    (activeSection === "estadisticas" ? " profile-menu-item--active" : "")
                  }
                  onClick={() => setActiveSection("estadisticas")}
                >
                  <span className="profile-menu-icon">
                    <ChartIcon />
                  </span>
                  <span>Estadísticas</span>
                </button>

                <button
                  type="button"
                  className={
                    "profile-menu-item" +
                    (activeSection === "resenas" ? " profile-menu-item--active" : "")
                  }
                  onClick={() => setActiveSection("resenas")}
                >
                  <span className="profile-menu-icon">
                    <ReviewIcon />
                  </span>
                  <span>Reseñas</span>
                </button>
              </>
            )}

            {/* Configuración (común para ambos) */}
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
          {/* LOGROS (solo para persona) - CON DATOS REALES */}
          {userType === 'persona' && activeSection === "logros" && (
            <div className="profile-card">
              <h2>Tus Logros</h2>
              <p className="profile-card-sub">
                Completa desafíos y gana logros mientras apoyas negocios locales.
              </p>

              {loadingLogros ? (
                <p>Cargando logros...</p>
              ) : logros.length > 0 ? (
                <div className="profile-achievements-grid">
                  {logros.map((item, index) => (
                    item?.logro ? (
                      <Achievement 
                        key={item.logro.id || index} 
                        logro={item.logro} 
                        progreso={item.progreso}
                      />
                    ) : null
                  ))}
                </div>
              ) : (
                <p>No hay logros disponibles.</p>
              )}
            </div>
          )}

          {/* FAVORITOS (solo para persona) - CON DATOS REALES */}
          {userType === 'persona' && activeSection === "favoritos" && (
            <div className="profile-card">
              <h2>Favoritos</h2>
              <p className="profile-card-sub">
                Estos son los negocios que has guardado como favoritos.
              </p>

              {loadingFavoritos ? (
                <p>Cargando favoritos...</p>
              ) : favoritos.length > 0 ? (
                <div className="profile-favorites-list">
                  {favoritos
                    .filter(favorito => favorito && favorito.negocio)
                    .map((favorito) => (
                      <FavoriteItem
                        key={favorito.id}
                        favorito={favorito}
                        onEliminar={handleEliminarFavorito}
                        onVer={handleVerNegocio}
                      />
                    ))}
                </div>
              ) : (
                <p>No tienes favoritos guardados aún.</p>
              )}
            </div>
          )}

          {/* ESTADÍSTICAS (solo para negocio) - CON DATOS REALES */}
          {userType === 'negocio' && activeSection === "estadisticas" && (
            <div className="profile-card">
              <h2>Estadísticas</h2>
              <p className="profile-card-sub">
                Resumen del rendimiento de tu negocio en la plataforma.
              </p>

              {loadingEstadisticas ? (
                <p>Cargando estadísticas...</p>
              ) : (
                <>
                  <div className="profile-stats-grid">
                    <StatCard
                      label="Visualizaciones"
                      value={estadisticas.visualizaciones}
                      icon="👁️"
                    />
                    <StatCard
                      label="Guardados"
                      value={estadisticas.favoritos}
                      icon="❤️"
                    />
                    <StatCard
                      label="Reseñas"
                      value={estadisticas.resenas}
                      icon="⭐"
                    />
                    <StatCard
                      label="Seguidores"
                      value={estadisticas.seguidores}
                      icon="👥"
                    />
                  </div>

                  <div className="profile-stats-chart">
                    <h3>Actividad reciente</h3>
                    <p>Próximamente: Gráfico de visualizaciones y engagement</p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* RESEÑAS (solo para negocio) */}
          {userType === 'negocio' && activeSection === "resenas" && (
            <div className="profile-card">
              <h2>Reseñas</h2>
              <p className="profile-card-sub">
                Lo que tus clientes dicen sobre tu negocio.
              </p>

              <div className="profile-reviews-summary">
                <div className="profile-reviews-rating">
                  <h3>4.5</h3>
                  <div className="profile-reviews-stars">★★★★☆</div>
                  <p>Basado en {estadisticas.resenas} reseñas</p>
                </div>
              </div>

              <div className="profile-reviews-list">
                <ReviewItem
                  author="María González"
                  rating={5}
                  comment="Excelente servicio y productos de calidad. Muy recomendado!"
                  date="Hace 2 días"
                />
                <ReviewItem
                  author="Carlos Martínez"
                  rating={4}
                  comment="Buena atención, aunque el tiempo de espera fue un poco largo."
                  date="Hace 1 semana"
                />
                <ReviewItem
                  author="Ana López"
                  rating={5}
                  comment="Me encanta este lugar! Siempre encuentro lo que busco."
                  date="Hace 2 semanas"
                />
              </div>
            </div>
          )}

          {/* CONFIGURACIÓN (común para ambos) */}
          {activeSection === "config" && (
            <div className="profile-card">
              <h2>Configuración de perfil</h2>
              <p className="profile-card-sub">
                Actualiza tu información {userType === 'negocio' ? 'del negocio' : 'personal'} y preferencias.
              </p>

              {updateMessage && (
                <div className={`profile-message ${updateMessage.includes('Error') ? 'error' : 'success'}`}>
                  {updateMessage}
                </div>
              )}

              {/* UPLOAD DE FOTO/LOGO */}
              <div className="profile-upload-section">
                {userType === 'persona' ? (
                  <>
                    <h3 className="profile-section-title">Foto de perfil</h3>
                    <div className="profile-upload-container">
                      <div className="profile-upload-preview">
                        {previewFoto || profileData?.foto_url ? (
                          <img 
                            src={previewFoto || profileData.foto_url} 
                            alt="Preview" 
                            className="profile-upload-img"
                          />
                        ) : (
                          <div className="profile-upload-placeholder">
                            <UploadIcon />
                            <p>Sin foto</p>
                          </div>
                        )}
                      </div>
                      <div className="profile-upload-actions">
                        <label htmlFor="foto-perfil" className="profile-btn-upload">
                          {uploadingFoto ? 'Subiendo...' : 'Cambiar foto'}
                          <input
                            id="foto-perfil"
                            type="file"
                            accept="image/*"
                            onChange={handleFotoPerfilChange}
                            disabled={uploadingFoto}
                            style={{ display: 'none' }}
                          />
                        </label>
                        <p className="profile-upload-hint">
                          JPG, PNG o GIF. Máximo 5MB.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="profile-section-title">Logo del negocio</h3>
                    <div className="profile-upload-container">
                      <div className="profile-upload-preview">
                        {previewLogo || profileData?.logo_url ? (
                          <img 
                            src={previewLogo || profileData.logo_url} 
                            alt="Logo" 
                            className="profile-upload-img"
                          />
                        ) : (
                          <div className="profile-upload-placeholder">
                            <UploadIcon />
                            <p>Sin logo</p>
                          </div>
                        )}
                      </div>
                      <div className="profile-upload-actions">
                        <label htmlFor="logo-negocio" className="profile-btn-upload">
                          {uploadingLogo ? 'Subiendo...' : 'Cambiar logo'}
                          <input
                            id="logo-negocio"
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            disabled={uploadingLogo}
                            style={{ display: 'none' }}
                          />
                        </label>
                        <p className="profile-upload-hint">
                          JPG, PNG o GIF. Máximo 5MB.
                        </p>
                      </div>
                    </div>

                    <h3 className="profile-section-title">Fotos adicionales (máximo 4)</h3>
                    <div className="profile-photos-grid">
                      {fotosNegocio.map((foto) => (
                        <div key={foto.id} className="profile-photo-item">
                          <img src={foto.url} alt={`Foto ${foto.orden}`} />
                          <button
                            type="button"
                            className="profile-photo-delete"
                            onClick={() => handleEliminarFotoNegocio(foto.id)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      {fotosNegocio.length < 4 && (
                        <label className="profile-photo-add">
                          <UploadIcon />
                          <span>{uploadingFotoNegocio ? 'Subiendo...' : 'Agregar foto'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFotoNegocioChange}
                            disabled={uploadingFotoNegocio}
                            style={{ display: 'none' }}
                          />
                        </label>
                      )}
                    </div>
                  </>
                )}
              </div>

              <hr className="profile-divider" />

              <h3 className="profile-section-title">Información {userType === 'negocio' ? 'del negocio' : 'personal'}</h3>
              <form className="profile-form" onSubmit={handleSubmit}>
                {userType === 'persona' ? (
                  <>
                    {/* Formulario para PERSONA */}
                    <div className="profile-form-row">
                      <div className="profile-form-group">
                        <label htmlFor="nombres">Nombres</label>
                        <input
                          id="nombres"
                          name="nombres"
                          type="text"
                          value={formData.nombres || ''}
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
                          value={formData.apellidos || ''}
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
                          value={formData.telefono || ''}
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
                        value={formData.descripcion || ''}
                        onChange={handleInputChange}
                        placeholder="Cuéntanos sobre ti..."
                        rows="3"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Formulario para NEGOCIO */}
                    <div className="profile-form-group">
                      <label htmlFor="nombre">Nombre del negocio</label>
                      <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        value={formData.nombre || ''}
                        onChange={handleInputChange}
                        placeholder="Nombre de tu negocio"
                      />
                    </div>

                    <div className="profile-form-group">
                      <label htmlFor="descripcion">Descripción</label>
                      <textarea
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion || ''}
                        onChange={handleInputChange}
                        placeholder="Describe tu negocio..."
                        rows="3"
                      />
                    </div>

                    <div className="profile-form-group">
                      <label htmlFor="direccion">Dirección</label>
                      <input
                        id="direccion"
                        name="direccion"
                        type="text"
                        value={formData.direccion || ''}
                        onChange={handleInputChange}
                        placeholder="Dirección completa"
                      />
                    </div>

                    <div className="profile-form-row">
                      <div className="profile-form-group">
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                          id="telefono"
                          name="telefono"
                          type="tel"
                          value={formData.telefono || ''}
                          onChange={handleInputChange}
                          placeholder="0000-0000"
                        />
                      </div>
                      <div className="profile-form-group">
                        <label htmlFor="email_contacto">Email de contacto</label>
                        <input
                          id="email_contacto"
                          name="email_contacto"
                          type="email"
                          value={formData.email_contacto || ''}
                          onChange={handleInputChange}
                          placeholder="contacto@negocio.com"
                        />
                      </div>
                    </div>
                  </>
                )}

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
