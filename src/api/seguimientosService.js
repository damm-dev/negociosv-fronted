import axiosInstance from './axiosConfig';

/**
 * Servicio para manejar operaciones de seguimientos
 */
const seguimientosService = {
  /**
   * Obtener todos los negocios que sigue el usuario
   * @returns {Promise} Lista de negocios seguidos
   */
  async obtenerSeguimientos() {
    try {
      const response = await axiosInstance.get('/seguimientos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener seguimientos:', error);
      throw error;
    }
  },

  /**
   * Seguir un negocio
   * @param {number} idNegocio - ID del negocio
   * @returns {Promise} Respuesta del servidor
   */
  async seguirNegocio(idNegocio) {
    try {
      const response = await axiosInstance.post('/seguimientos', {
        id_negocio: idNegocio
      });
      return response.data;
    } catch (error) {
      console.error('Error al seguir negocio:', error);
      throw error;
    }
  },

  /**
   * Dejar de seguir un negocio
   * @param {number} idNegocio - ID del negocio
   * @returns {Promise} Respuesta del servidor
   */
  async dejarDeSeguir(idNegocio) {
    try {
      const response = await axiosInstance.delete(`/seguimientos/${idNegocio}`);
      return response.data;
    } catch (error) {
      console.error('Error al dejar de seguir:', error);
      throw error;
    }
  },

  /**
   * Verificar si el usuario sigue un negocio
   * @param {number} idNegocio - ID del negocio
   * @returns {Promise} {siguiendo: boolean}
   */
  async verificarSeguimiento(idNegocio) {
    try {
      const response = await axiosInstance.get(`/seguimientos/verificar/${idNegocio}`);
      return response.data;
    } catch (error) {
      console.error('Error al verificar seguimiento:', error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas de seguidores de un negocio
   * @param {number} idNegocio - ID del negocio
   * @returns {Promise} {total_seguidores: number}
   */
  async obtenerEstadisticas(idNegocio) {
    try {
      const response = await axiosInstance.get(`/negocio/${idNegocio}/seguidores`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw error;
    }
  },

  /**
   * Toggle seguimiento (seguir si no sigue, dejar de seguir si sigue)
   * @param {number} idNegocio - ID del negocio
   * @param {boolean} siguiendo - Estado actual
   * @returns {Promise} Respuesta del servidor
   */
  async toggleSeguimiento(idNegocio, siguiendo) {
    try {
      if (siguiendo) {
        return await this.dejarDeSeguir(idNegocio);
      } else {
        return await this.seguirNegocio(idNegocio);
      }
    } catch (error) {
      console.error('Error al toggle seguimiento:', error);
      throw error;
    }
  }
};

export default seguimientosService;
