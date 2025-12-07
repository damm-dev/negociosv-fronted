import { useState, useEffect } from "react";
import axios from "axios";
import "./SearchBar.css";
import negocioService from "../api/negocioService";

export default function SearchBar({ onSearch, onLoading }) {
  const [query, setQuery] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [municipios, setMunicipios] = useState([]);
  const [ubicacionUsuario, setUbicacionUsuario] = useState(null);
  const [obteniendoUbicacion, setObteniendoUbicacion] = useState(false);
  const [errorUbicacion, setErrorUbicacion] = useState("");
  const [modoUbicacion, setModoUbicacion] = useState("municipio"); // "municipio" o "gps"

  // Cargar lista de municipios al montar el componente
  useEffect(() => {
    const cargarMunicipios = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/municipios`);
        
        if (response.data.success && response.data.data) {
          setMunicipios(response.data.data);
        } else if (Array.isArray(response.data)) {
          setMunicipios(response.data);
        }
      } catch (error) {
        console.error("Error al cargar municipios:", error);
      }
    };
    cargarMunicipios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (onLoading) onLoading(true);

    try {
      const params = {
        query: query.trim() || null,
        municipio: modoUbicacion === 'municipio' ? (municipio || null) : null,
        lat: modoUbicacion === 'gps' ? (ubicacionUsuario?.lat || null) : null,
        lng: modoUbicacion === 'gps' ? (ubicacionUsuario?.lng || null) : null,
      };

      const resultados = await negocioService.buscarNegocios(params);
      
      if (onSearch) {
        onSearch(resultados, params);
      }
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      if (onSearch) {
        onSearch({ status: false, data: { data: [] }, error: error.message }, {});
      }
    } finally {
      if (onLoading) onLoading(false);
    }
  };

  const obtenerUbicacion = async () => {
    setObteniendoUbicacion(true);
    setErrorUbicacion("");

    try {
      const ubicacion = await negocioService.obtenerUbicacionUsuario();
      setUbicacionUsuario(ubicacion);
    } catch (error) {
      setErrorUbicacion(error.message);
      setModoUbicacion("municipio");
    } finally {
      setObteniendoUbicacion(false);
    }
  };

  const handleModoChange = (nuevoModo) => {
    setModoUbicacion(nuevoModo);
    
    if (nuevoModo === "gps") {
      setMunicipio("");
      if (!ubicacionUsuario) {
        obtenerUbicacion();
      }
    } else {
      setUbicacionUsuario(null);
      setErrorUbicacion("");
    }
  };

  return (
    <div className="searchbar-container">
      <form className="searchbar-form" onSubmit={handleSubmit}>
        {/* Input de búsqueda principal */}
        <div className="searchbar-main-row">
          <input
            type="search"
            placeholder="¿Qué negocio estás buscando?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar negocios"
            className="searchbar-input"
          />
          <button type="submit" className="searchbar-button">
            Buscar
          </button>
        </div>

        {/* Filtros con Switch */}
        <div className="searchbar-filters-row">
          <span className="filter-label">Filtrar por:</span>
          
          {/* Switch Toggle */}
          <div className="location-switch">
            <button
              type="button"
              className={`switch-option ${modoUbicacion === 'municipio' ? 'active' : ''}`}
              onClick={() => handleModoChange('municipio')}
              disabled={obteniendoUbicacion}
            >
              📍 Municipio
            </button>
            <button
              type="button"
              className={`switch-option ${modoUbicacion === 'gps' ? 'active' : ''}`}
              onClick={() => handleModoChange('gps')}
              disabled={obteniendoUbicacion}
            >
              🌍 Mi ubicación
            </button>
          </div>

          {/* Selector de municipio (solo visible si modoUbicacion === 'municipio') */}
          {modoUbicacion === 'municipio' && (
            <select
              value={municipio}
              onChange={(e) => setMunicipio(e.target.value)}
              className="searchbar-select"
              aria-label="Filtrar por municipio"
            >
              <option value="">Todos los municipios</option>
              {municipios.map((muni) => (
                <option key={muni.id} value={muni.id}>
                  {muni.nombre}
                </option>
              ))}
            </select>
          )}

          {/* Indicador de ubicación (solo visible si modoUbicacion === 'gps') */}
          {modoUbicacion === 'gps' && (
            <div className="location-status">
              {obteniendoUbicacion ? (
                <span className="location-loading">
                  <span className="location-spinner">⟳</span> Obteniendo ubicación...
                </span>
              ) : ubicacionUsuario ? (
                <span className="location-success">
                  ✓ Ubicación activa (±{Math.round(ubicacionUsuario.accuracy)}m)
                </span>
              ) : errorUbicacion ? (
                <span className="location-error">
                  ⚠️ {errorUbicacion}
                </span>
              ) : null}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
