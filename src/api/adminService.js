import axios from './axiosConfig';

const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

// ==================== AUTENTICACIÓN ====================

export const loginAdmin = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('adminToken', response.data.token);
    localStorage.setItem('adminData', JSON.stringify(response.data.admin));
  }
  return response.data;
};

export const logoutAdmin = async () => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    await axios.post(`${API_URL}/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminData');
};

export const getAdminToken = () => localStorage.getItem('adminToken');
export const getAdminData = () => JSON.parse(localStorage.getItem('adminData') || 'null');

// Helper para headers con token de admin
const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${getAdminToken()}` }
});

// ==================== USUARIOS ====================

export const getUsuarios = async () => {
  const response = await axios.get(`${API_URL}/usuarios`, getAuthHeaders());
  return response.data;
};

export const getUsuario = async (id) => {
  const response = await axios.get(`${API_URL}/usuarios/${id}`, getAuthHeaders());
  return response.data;
};

export const updateUsuario = async (id, data) => {
  const response = await axios.put(`${API_URL}/usuarios/${id}`, data, getAuthHeaders());
  return response.data;
};

export const deleteUsuario = async (id) => {
  const response = await axios.delete(`${API_URL}/usuarios/${id}`, getAuthHeaders());
  return response.data;
};

// ==================== PERFILES ====================

export const getPerfiles = async () => {
  const response = await axios.get(`${API_URL}/perfiles`, getAuthHeaders());
  return response.data;
};

export const getPerfil = async (id) => {
  const response = await axios.get(`${API_URL}/perfiles/${id}`, getAuthHeaders());
  return response.data;
};

export const updatePerfil = async (id, data) => {
  const response = await axios.put(`${API_URL}/perfiles/${id}`, data, getAuthHeaders());
  return response.data;
};

export const deletePerfil = async (id) => {
  const response = await axios.delete(`${API_URL}/perfiles/${id}`, getAuthHeaders());
  return response.data;
};

// ==================== NEGOCIOS ====================

export const getNegocios = async () => {
  const response = await axios.get(`${API_URL}/negocios`, getAuthHeaders());
  return response.data;
};

export const getNegocio = async (id) => {
  const response = await axios.get(`${API_URL}/negocios/${id}`, getAuthHeaders());
  return response.data;
};

export const createNegocio = async (data) => {
  const response = await axios.post(`${API_URL}/negocios`, data, getAuthHeaders());
  return response.data;
};

export const updateNegocio = async (id, data) => {
  const response = await axios.put(`${API_URL}/negocios/${id}`, data, getAuthHeaders());
  return response.data;
};

export const deleteNegocio = async (id) => {
  const response = await axios.delete(`${API_URL}/negocios/${id}`, getAuthHeaders());
  return response.data;
};

// ==================== CATEGORÍAS ====================

export const getCategorias = async () => {
  const response = await axios.get(`${API_URL}/categorias`, getAuthHeaders());
  return response.data;
};

export const getCategoria = async (id) => {
  const response = await axios.get(`${API_URL}/categorias/${id}`, getAuthHeaders());
  return response.data;
};

export const createCategoria = async (data) => {
  const response = await axios.post(`${API_URL}/categorias`, data, getAuthHeaders());
  return response.data;
};

export const updateCategoria = async (id, data) => {
  const response = await axios.put(`${API_URL}/categorias/${id}`, data, getAuthHeaders());
  return response.data;
};

export const deleteCategoria = async (id) => {
  const response = await axios.delete(`${API_URL}/categorias/${id}`, getAuthHeaders());
  return response.data;
};

// ==================== MÉTODOS DE PAGO ====================

export const getMetodosPago = async () => {
  const response = await axios.get(`${API_URL}/metodos-pago`, getAuthHeaders());
  return response.data;
};

export const getMetodoPago = async (id) => {
  const response = await axios.get(`${API_URL}/metodos-pago/${id}`, getAuthHeaders());
  return response.data;
};

export const createMetodoPago = async (data) => {
  const response = await axios.post(`${API_URL}/metodos-pago`, data, getAuthHeaders());
  return response.data;
};

export const updateMetodoPago = async (id, data) => {
  const response = await axios.put(`${API_URL}/metodos-pago/${id}`, data, getAuthHeaders());
  return response.data;
};

export const deleteMetodoPago = async (id) => {
  const response = await axios.delete(`${API_URL}/metodos-pago/${id}`, getAuthHeaders());
  return response.data;
};

// ==================== DEPARTAMENTOS ====================

export const getDepartamentos = async () => {
  const response = await axios.get(`${API_URL}/departamentos`, getAuthHeaders());
  return response.data;
};

export const getDepartamento = async (id) => {
  const response = await axios.get(`${API_URL}/departamentos/${id}`, getAuthHeaders());
  return response.data;
};

export const createDepartamento = async (data) => {
  const response = await axios.post(`${API_URL}/departamentos`, data, getAuthHeaders());
  return response.data;
};

export const updateDepartamento = async (id, data) => {
  const response = await axios.put(`${API_URL}/departamentos/${id}`, data, getAuthHeaders());
  return response.data;
};

export const deleteDepartamento = async (id) => {
  const response = await axios.delete(`${API_URL}/departamentos/${id}`, getAuthHeaders());
  return response.data;
};

// ==================== MUNICIPIOS ====================

export const getMunicipios = async () => {
  const response = await axios.get(`${API_URL}/municipios`, getAuthHeaders());
  return response.data;
};

export const getMunicipio = async (id) => {
  const response = await axios.get(`${API_URL}/municipios/${id}`, getAuthHeaders());
  return response.data;
};

export const createMunicipio = async (data) => {
  const response = await axios.post(`${API_URL}/municipios`, data, getAuthHeaders());
  return response.data;
};

export const updateMunicipio = async (id, data) => {
  const response = await axios.put(`${API_URL}/municipios/${id}`, data, getAuthHeaders());
  return response.data;
};

export const deleteMunicipio = async (id) => {
  const response = await axios.delete(`${API_URL}/municipios/${id}`, getAuthHeaders());
  return response.data;
};

// ==================== ESTADOS DE USUARIO ====================

export const getEstadosUsuario = async () => {
  const response = await axios.get(`${API_URL}/estados-usuario`, getAuthHeaders());
  return response.data;
};

export const getEstadoUsuario = async (id) => {
  const response = await axios.get(`${API_URL}/estados-usuario/${id}`, getAuthHeaders());
  return response.data;
};

export const createEstadoUsuario = async (data) => {
  const response = await axios.post(`${API_URL}/estados-usuario`, data, getAuthHeaders());
  return response.data;
};

export const updateEstadoUsuario = async (id, data) => {
  const response = await axios.put(`${API_URL}/estados-usuario/${id}`, data, getAuthHeaders());
  return response.data;
};

export const deleteEstadoUsuario = async (id) => {
  const response = await axios.delete(`${API_URL}/estados-usuario/${id}`, getAuthHeaders());
  return response.data;
};

// ==================== INTERESES ====================

export const getIntereses = async () => {
  const response = await axios.get(`${API_URL}/intereses`, getAuthHeaders());
  return response.data;
};

export const deleteInteres = async (id) => {
  const response = await axios.delete(`${API_URL}/intereses/${id}`, getAuthHeaders());
  return response.data;
};

// ==================== TÉRMINOS ====================

export const getTerminos = async () => {
  const response = await axios.get(`${API_URL}/terminos`, getAuthHeaders());
  return response.data;
};

export const getTermino = async (id) => {
  const response = await axios.get(`${API_URL}/terminos/${id}`, getAuthHeaders());
  return response.data;
};

export const createTermino = async (data) => {
  const response = await axios.post(`${API_URL}/terminos`, data, getAuthHeaders());
  return response.data;
};

export const updateTermino = async (id, data) => {
  const response = await axios.put(`${API_URL}/terminos/${id}`, data, getAuthHeaders());
  return response.data;
};

export const deleteTermino = async (id) => {
  const response = await axios.delete(`${API_URL}/terminos/${id}`, getAuthHeaders());
  return response.data;
};
