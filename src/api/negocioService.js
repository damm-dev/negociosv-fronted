import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

/**
 * Servicio para manejar operaciones relacionadas con negocios
 */
const negocioService = {
  /**
   * Buscar negocios con filtros
   * @param {Object} params - Parámetros de búsqueda
   * @param {string} params.query - Texto de búsqueda
   * @param {number} params.municipio - ID del municipio
   * @param {number} params.lat - Latitud del usuario
   * @param {number} params.lng - Longitud del usuario
   * @param {number} params.radius - Radio de búsqueda en km
   * @param {number} params.page - Número de página
   * @returns {Promise} Respuesta con los negocios encontrados
   */
  buscarNegocios: async (params = {}) => {
    try {
      const response = await axios.get(`${API_URL}/negocios`, {
        params: {
          query: params.query || null,
          municipio: params.municipio || null,
          lat: params.lat || null,
          lng: params.lng || null,
          radius: params.radius || 50,
          page: params.page || 1
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al buscar negocios:', error);
      throw error;
    }
  },

  /**
   * Obtener todos los negocios (sin filtros)
   * @param {number} page - Número de página
   * @returns {Promise} Respuesta con los negocios
   */
  listarNegocios: async (page = 1) => {
    try {
      const response = await axios.get(`${API_URL}/negocios`, {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error al listar negocios:', error);
      throw error;
    }
  },

  /**
   * Obtener detalle de un negocio específico
   * @param {number} id - ID del negocio
   * @returns {Promise} Respuesta con el detalle del negocio
   */
  obtenerNegocio: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/negocio/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener negocio:', error);
      throw error;
    }
  },

  /**
   * Obtener la ubicación del usuario usando la API de Geolocalización del navegador
   * @returns {Promise<{lat: number, lng: number}>} Coordenadas del usuario
   */
  obtenerUbicacionUsuario: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('La geolocalización no está soportada por tu navegador'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          let errorMessage = 'Error al obtener ubicación';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Permiso de ubicación denegado. Por favor, habilita el acceso a tu ubicación.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Información de ubicación no disponible.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Tiempo de espera agotado al obtener ubicación.';
              break;
            default:
              errorMessage = 'Error desconocido al obtener ubicación.';
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  },

  /**
   * Calcular distancia entre dos puntos geográficos (fórmula de Haversine)
   * @param {number} lat1 - Latitud punto 1
   * @param {number} lng1 - Longitud punto 1
   * @param {number} lat2 - Latitud punto 2
   * @param {number} lng2 - Longitud punto 2
   * @returns {number} Distancia en kilómetros
   */
  calcularDistancia: (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  },

  /**
   * Formatear distancia para mostrar
   * @param {number} distancia - Distancia en kilómetros
   * @returns {string} Distancia formateada
   */
  formatearDistancia: (distancia) => {
    if (distancia < 1) {
      return `${Math.round(distancia * 1000)} m`;
    }
    return `${distancia.toFixed(1)} km`;
  },

  /**
   * Subir foto adicional del negocio (máximo 4)
   * @param {number} idNegocio - ID del negocio
   * @param {File} file - Archivo de imagen
   * @param {number} orden - Orden de la foto (1-4)
   * @param {string} descripcion - Descripción opcional
   * @returns {Promise} Respuesta del servidor con URL de la foto
   */
  subirFotoNegocio: async (idNegocio, file, orden = 1, descripcion = '') => {
    try {
      const formData = new FormData();
      formData.append('foto', file);
      formData.append('orden', orden);
      if (descripcion) {
        formData.append('descripcion', descripcion);
      }

      const response = await axios.post(`${API_URL}/negocio/${idNegocio}/foto`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al subir foto de negocio:', error);
      throw error;
    }
  },

  /**
   * Eliminar foto del negocio
   * @param {number} idNegocio - ID del negocio
   * @param {number} idFoto - ID de la foto
   * @returns {Promise} Respuesta del servidor
   */
  eliminarFotoNegocio: async (idNegocio, idFoto) => {
    try {
      const response = await axios.delete(`${API_URL}/negocio/${idNegocio}/foto/${idFoto}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al eliminar foto de negocio:', error);
      throw error;
    }
  }
};

export default negocioService;
