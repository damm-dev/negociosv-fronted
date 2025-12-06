import axiosInstance from './axiosConfig';

/**
 * Servicio de autenticación para comunicarse con la API de Laravel
 */
const authService = {
  /**
   * Test de conexión con la API
   */
  async testConnection() {
    try {
      const response = await axiosInstance.get('/ping');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Login de usuario o negocio
   * @param {string} email - Correo electrónico
   * @param {string} password - Contraseña
   * @returns {Promise} Datos del usuario/negocio autenticado
   */
  async login(email, password) {
    try {
      const response = await axiosInstance.post('/login', {
        email,
        password,
      });
      
      // Guardar token y datos en localStorage
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
      }
      if (response.data.usuario) {
        localStorage.setItem('user_data', JSON.stringify(response.data.usuario));
      }
      // Guardar el tipo de usuario que viene del backend
      if (response.data.type) {
        localStorage.setItem('user_type', response.data.type);
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Registro de usuario persona
   * @param {Object} userData - Datos del usuario
   * @returns {Promise} Respuesta del servidor
   */
  async registerUser(userData) {
    try {
      const payload = {
        email: userData.email,
        password: userData.password,
        nombres: userData.nombres,
        apellidos: userData.apellidos,
        fecha_nacimiento: userData.fecha_nacimiento,
        genero: userData.genero,
        telefono: userData.telefono,
        id_municipio: userData.id_municipio,
        descripcion: userData.descripcion || '',
        foto: userData.foto || '',
        intereses: userData.intereses
      };

      const response = await axiosInstance.post('/registrar', payload);
      
      // Guardar tipo de usuario
      if (response.data) {
        localStorage.setItem('user_type', 'persona');
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Registro de negocio
   * @param {Object} businessData - Datos del negocio
   * @returns {Promise} Respuesta del servidor
   */
  async registerBusiness(businessData) {
    try {
      const payload = {
        email: businessData.email,
        password: businessData.password,
        nombre_negocio: businessData.nombre_negocio,
        descripcion: businessData.descripcion,
        direccion: businessData.direccion,
        id_municipio: businessData.id_municipio,
        telefono: businessData.telefono,
        email_contacto: businessData.email_contacto,
        id_categoria: businessData.id_categoria || [],
        metodos_pago: businessData.metodos_pago || [],
        logo: businessData.logoBase64 || '', // Enviar base64 si existe
      };

      const response = await axiosInstance.post('/registrar_negocio', payload);
      
      // Guardar tipo de usuario
      if (response.data) {
        localStorage.setItem('user_type', 'negocio');
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cerrar sesión
   */
  async logout() {
    try {
      await axiosInstance.post('/logout');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      localStorage.removeItem('user_type');
    }
  },

  /**
   * Obtener usuario actual del localStorage
   */
  getCurrentUser() {
    const userData = localStorage.getItem('user_data');
    const userType = localStorage.getItem('user_type');
    
    if (userData) {
      return {
        data: JSON.parse(userData),
        type: userType,
      };
    }
    return null;
  },

  /**
   * Verificar si hay sesión activa
   */
  isAuthenticated() {
    return !!localStorage.getItem('user_data');
  },
};

export default authService;
