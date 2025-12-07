import axiosInstance from './axiosConfig';

/**
 * Servicio para manejar operaciones de logros
 */
const logrosService = {
  /**
   * Obtener todos los logros del usuario con su progreso
   * @returns {Promise} Logros con progreso y estadísticas
   */
  async obtenerLogros() {
    try {
      const response = await axiosInstance.get('/logros');
      return response.data;
    } catch (error) {
      console.error('Error al obtener logros:', error);
      throw error;
    }
  },

  /**
   * Verificar y actualizar todos los logros del usuario
   * @returns {Promise} Respuesta del servidor
   */
  async verificarLogros() {
    try {
      const response = await axiosInstance.post('/logros/verificar');
      return response.data;
    } catch (error) {
      console.error('Error al verificar logros:', error);
      throw error;
    }
  }
};

export default logrosService;
