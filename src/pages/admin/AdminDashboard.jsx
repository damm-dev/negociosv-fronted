import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin, getAdminData } from '../../api/adminService';
import CategoriasManager from '../../components/admin/CategoriasManager';
import MetodosPagoManager from '../../components/admin/MetodosPagoManager';
import '../../styles/admin/adminDashboard.css';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [activeSection, setActiveSection] = useState('categorias');
  const navigate = useNavigate();

  useEffect(() => {
    const data = getAdminData();
    if (!data) {
      navigate('/admin/login');
    } else {
      setAdminData(data);
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const sections = [
    { id: 'usuarios', name: 'Usuarios', icon: '👥' },
    { id: 'perfiles', name: 'Perfiles', icon: '👤' },
    { id: 'negocios', name: 'Negocios', icon: '🏢' },
    { id: 'categorias', name: 'Categorías', icon: '📁' },
    { id: 'metodos-pago', name: 'Métodos de Pago', icon: '💳' },
    { id: 'departamentos', name: 'Departamentos', icon: '🗺️' },
    { id: 'municipios', name: 'Municipios', icon: '📍' },
    { id: 'estados-usuario', name: 'Estados Usuario', icon: '🔄' },
    { id: 'intereses', name: 'Intereses', icon: '⭐' },
    { id: 'terminos', name: 'Términos', icon: '📄' },
  ];

  if (!adminData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>🔐 Admin Panel</h2>
          <p className="admin-name">{adminData.nombre}</p>
        </div>

        <nav className="admin-nav">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`admin-nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="admin-nav-icon">{section.icon}</span>
              <span className="admin-nav-text">{section.name}</span>
            </button>
          ))}
        </nav>

        <button className="admin-logout-btn" onClick={handleLogout}>
          🚪 Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>{sections.find(s => s.id === activeSection)?.name}</h1>
        </header>

        <div className="admin-content">
          {activeSection === 'usuarios' && <PlaceholderSection title="Usuarios" />}
          {activeSection === 'perfiles' && <PlaceholderSection title="Perfiles" />}
          {activeSection === 'negocios' && <PlaceholderSection title="Negocios" />}
          {activeSection === 'categorias' && <CategoriasManager />}
          {activeSection === 'metodos-pago' && <MetodosPagoManager />}
          {activeSection === 'departamentos' && <PlaceholderSection title="Departamentos" />}
          {activeSection === 'municipios' && <PlaceholderSection title="Municipios" />}
          {activeSection === 'estados-usuario' && <PlaceholderSection title="Estados de Usuario" />}
          {activeSection === 'intereses' && <PlaceholderSection title="Intereses" />}
          {activeSection === 'terminos' && <PlaceholderSection title="Términos" />}
        </div>
      </main>
    </div>
  );
};

// Componente placeholder para secciones no implementadas
const PlaceholderSection = ({ title }) => (
  <div className="section-placeholder">
    <p>Gestión de {title}</p>
    <p>Esta sección está disponible y funcional en el backend.</p>
    <p>Puedes implementar el manager siguiendo el patrón de CategoriasManager o MetodosPagoManager.</p>
  </div>
);

export default AdminDashboard;
