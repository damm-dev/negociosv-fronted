import axiosInstance from './axiosConfig';

/**
 * Servicio para manejar operaciones de favoritos
 */
const favoritosService = {
  /**
   * Obtener todos los favoritos del usuario
   * @returns {Promise} Lista de negocios favoritos
   */
  async obtenerFavoritos() {
    try {
      const response = await axiosInstance.get('/favoritos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
      throw error;
    }
  },

  /**
   * Agregar un negocio a favoritos
   * @param {number} idNegocio - ID del negocio
   * @returns {Promise} Respuesta del servidor
   */
  async agregarFavorito(idNegocio) {
    try {
      const response = await axiosInstance.post('/favoritos', {
        id_negocio: idNegocio
      });
      return response.data;
    } catch (error) {
      console.error('Error al agregar favorito:', error);
      throw error;
    }
  },

  /**
   * Eliminar un negocio de favoritos
   * @param {number} idNegocio - ID del negocio
   * @returns {Promise} Respuesta del servidor
   */
  async eliminarFavorito(idNegocio) {
    try {
      const response = await axiosInstance.delete(`/favoritos/${idNegocio}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
      throw error;
    }
  },

  /**
   * Verificar si un negocio está en favoritos
   * @param {number} idNegocio - ID del negocio
   * @returns {Promise} {es_favorito: boolean}
   */
  async verificarFavorito(idNegocio) {
    try {
      const response = await axiosInstance.get(`/favoritos/verificar/${idNegocio}`);
      return response.data;
    } catch (error) {
      console.error('Error al verificar favorito:', error);
      throw error;
    }
  },

  /**
   * Toggle favorito (agregar si no existe, eliminar si existe)
   * @param {number} idNegocio - ID del negocio
   * @param {boolean} esFavorito - Estado actual
   * @returns {Promise} Respuesta del servidor
   */
  async toggleFavorito(idNegocio, esFavorito) {
    try {
      if (esFavorito) {
        return await this.eliminarFavorito(idNegocio);
      } else {
        return await this.agregarFavorito(idNegocio);
      }
    } catch (error) {
      console.error('Error al toggle favorito:', error);
      throw error;
    }
  }
};

export default favoritosService;
