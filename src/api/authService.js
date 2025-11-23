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
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      
      // Guardar datos en localStorage
      if (response.data.data) {
        localStorage.setItem('user_data', JSON.stringify(response.data.data));
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
      const formData = new FormData();
      
      // Mapear datos del wizard al formato de la API
      formData.append('nombres', userData.nombre || '');
      formData.append('apellidos', userData.apellidos || '');
      formData.append('email', userData.correo || '');
      formData.append('password', userData.password || '');
      
      // Campos opcionales
      if (userData.fotoFile) {
        formData.append('photo', userData.fotoFile);
      }
      if (userData.ciudad) {
        formData.append('ciudad', userData.ciudad);
      }
      if (userData.municipio) {
        formData.append('municipio', userData.municipio);
      }
      if (userData.departamento) {
        formData.append('departamento', userData.departamento);
      }
      if (userData.activarUbicacion !== undefined) {
        formData.append('notificaciones', userData.activarUbicacion);
      }

      const response = await axiosInstance.post('/auth/registro_usuario', formData, {
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

      const response = await axiosInstance.post('/auth/registro_negocios', formData, {
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
  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_type');
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
