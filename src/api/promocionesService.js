import axiosInstance from './axiosConfig';

/**
 * Servicio para manejar operaciones de promociones
 */
const promocionesService = {
  /**
   * Obtener promociones del negocio del usuario autenticado
   * @returns {Promise} Lista de promociones
   */
  async obtenerMisPromociones() {
    try {
      const response = await axiosInstance.get('/promociones');
      return response.data;
    } catch (error) {
      console.error('Error al obtener promociones:', error);
      throw error;
    }
  },

  /**
   * Obtener promociones vigentes de un negocio (público)
   * @param {number} idNegocio - ID del negocio
   * @returns {Promise} Lista de promociones vigentes
   */
  async obtenerPromocionesVigentes(idNegocio) {
    try {
      const response = await axiosInstance.get(`/negocio/${idNegocio}/promociones`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener promociones vigentes:', error);
      throw error;
    }
  },

  /**
   * Obtener todas las promociones de un negocio (público)
   * @param {number} idNegocio - ID del negocio
   * @returns {Promise} Lista de todas las promociones
   */
  async obtenerTodasPromociones(idNegocio) {
    try {
      const response = await axiosInstance.get(`/negocio/${idNegocio}/promociones/todas`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener todas las promociones:', error);
      throw error;
    }
  },

  /**
   * Crear una nueva promoción
   * @param {Object} promocionData - Datos de la promoción
   * @returns {Promise} Promoción creada
   */
  async crearPromocion(promocionData) {
    try {
      const response = await axiosInstance.post('/promociones', promocionData);
      return response.data;
    } catch (error) {
      console.error('Error al crear promoción:', error);
      throw error;
    }
  },

  /**
   * Actualizar una promoción
   * @param {number} id - ID de la promoción
   * @param {Object} promocionData - Datos actualizados
   * @returns {Promise} Promoción actualizada
   */
  async actualizarPromocion(id, promocionData) {
    try {
      const response = await axiosInstance.put(`/promociones/${id}`, promocionData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar promoción:', error);
      throw error;
    }
  },

  /**
   * Eliminar una promoción
   * @param {number} id - ID de la promoción
   * @returns {Promise} Respuesta del servidor
   */
  async eliminarPromocion(id) {
    try {
      const response = await axiosInstance.delete(`/promociones/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar promoción:', error);
      throw error;
    }
  },

  /**
   * Activar/Desactivar una promoción
   * @param {number} id - ID de la promoción
   * @returns {Promise} Promoción actualizada
   */
  async toggleActiva(id) {
    try {
      const response = await axiosInstance.patch(`/promociones/${id}/toggle`);
      return response.data;
    } catch (error) {
      console.error('Error al toggle promoción:', error);
      throw error;
    }
  }
};

export default promocionesService;
