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
        email: userData.correo || userData.email,
        password: userData.password,
        nombres: userData.nombre || userData.nombres,
        apellidos: userData.apellidos,
        fecha_nacimiento: userData.fechaNacimiento || userData.fecha_nacimiento,
        genero: userData.genero || 'O',
        telefono: userData.telefono || '',
        id_municipio: userData.id_municipio || 1,
        descripcion: userData.descripcion || '',
        foto: userData.foto || '',
        intereses: userData.intereses || [1]
      };

      const response = await axiosInstance.post('/registrar', payload);
      
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
      const formData = new FormData();
      
      // Mapear datos del wizard al formato de la API
      formData.append('nombreNegocio', businessData.nombreNegocio || '');
      formData.append('email', businessData.email || '');
      formData.append('password', businessData.password || '');
      formData.append('descripcion', businessData.descripcionCorta || '');
      formData.append('direccion', businessData.direccionEscrita || '');
      formData.append('telefono', businessData.telefonoWhatsApp || '');
      
      // Productos/Servicios (oferta)
      if (businessData.oferta && businessData.oferta.length > 0) {
        formData.append('productos', businessData.oferta.join(', '));
      }
      
      // Métodos de pago (debe ser array)
      if (businessData.metodosPago && businessData.metodosPago.length > 0) {
        businessData.metodosPago.forEach((metodo, index) => {
          formData.append(`metodosPago[${index}]`, metodo);
        });
      } else {
        formData.append('metodosPago[]', 'Efectivo'); // Default
      }
      
      // Email de contacto (usar el mismo email si no hay otro)
      formData.append('contactoEmail', businessData.contactoEmail || businessData.email);
      
      // Logo/Foto
      if (businessData.logoFile) {
        formData.append('foto', businessData.logoFile);
      }
      
      // Categoría (opcional por ahora)
      if (businessData.categoria) {
        formData.append('categoria', businessData.categoria);
      }

      const response = await axiosInstance.post('/registrar_negocio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
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
