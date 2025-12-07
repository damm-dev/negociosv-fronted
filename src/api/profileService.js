import axiosInstance from './axiosConfig';

/**
 * Servicio para manejar operaciones de perfil de usuario
 */
const profileService = {
  /**
   * Obtener perfil del usuario autenticado (persona)
   * @returns {Promise} Datos del perfil
   */
  async getProfile() {
    try {
      const response = await axiosInstance.get('/perfil');
      return response.data;
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      throw error;
    }
  },

  /**
   * Obtener perfil del negocio autenticado
   * @returns {Promise} Datos del negocio
   */
  async getBusinessProfile() {
    try {
      const response = await axiosInstance.get('/perfil/negocio');
      return response.data;
    } catch (error) {
      console.error('Error al obtener perfil de negocio:', error);
      throw error;
    }
  },

  /**
   * Actualizar perfil del usuario (persona)
   * @param {Object} profileData - Datos del perfil a actualizar
   * @returns {Promise} Respuesta del servidor
   */
  async updateProfile(profileData) {
    try {
      const payload = {
        nombres: profileData.nombres,
        apellidos: profileData.apellidos,
        telefono: profileData.telefono,
        foto: profileData.foto,
        descripcion: profileData.descripcion,
        id_municipio: profileData.id_municipio,
        intereses: profileData.intereses
      };

      // Remover campos undefined o null
      Object.keys(payload).forEach(key => {
        if (payload[key] === undefined || payload[key] === null) {
          delete payload[key];
        }
      });

      const response = await axiosInstance.put('/perfil', payload);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }
  },

  /**
   * Actualizar perfil del negocio
   * @param {Object} businessData - Datos del negocio a actualizar
   * @returns {Promise} Respuesta del servidor
   */
  async updateBusinessProfile(businessData) {
    try {
      const payload = {
        nombre: businessData.nombre,
        descripcion: businessData.descripcion,
        direccion: businessData.direccion,
        telefono: businessData.telefono,
        email_contacto: businessData.email_contacto,
        logo: businessData.logo,
        id_municipio: businessData.id_municipio
      };

      // Remover campos undefined o null
      Object.keys(payload).forEach(key => {
        if (payload[key] === undefined || payload[key] === null) {
          delete payload[key];
        }
      });

      const response = await axiosInstance.put(`/negocio/${businessData.id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar perfil de negocio:', error);
      throw error;
    }
  },

  /**
   * Cambiar contraseña del usuario
   * @param {string} currentPassword - Contraseña actual
   * @param {string} newPassword - Nueva contraseña
   * @returns {Promise} Respuesta del servidor
   */
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await axiosInstance.put('/perfil/password', {
        current_password: currentPassword,
        new_password: newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      throw error;
    }
  },

  /**
   * Subir foto de perfil (persona)
   * @param {File} file - Archivo de imagen
   * @returns {Promise} Respuesta del servidor con URL de la foto
   */
  async subirFotoPerfil(file) {
    try {
      const formData = new FormData();
      formData.append('foto', file);

      const response = await axiosInstance.post('/perfil/foto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al subir foto de perfil:', error);
      throw error;
    }
  },

  /**
   * Subir logo del negocio
   * @param {File} file - Archivo de imagen
   * @returns {Promise} Respuesta del servidor con URL del logo
   */
  async subirLogo(file) {
    try {
      const formData = new FormData();
      formData.append('logo', file);

      const response = await axiosInstance.post('/perfil/logo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al subir logo:', error);
      throw error;
    }
  }
};

export default profileService;
