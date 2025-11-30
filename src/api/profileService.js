import axiosInstance from './axiosConfig';

/**
 * Servicio para manejar operaciones de perfil de usuario
 */
const profileService = {
  /**
   * Obtener perfil del usuario autenticado
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
   * Actualizar perfil del usuario
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
  }
};

export default profileService;
