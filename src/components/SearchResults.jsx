import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./SearchResults.css";

const SERVER_URL = "http://127.0.0.1:8000";

export default function SearchResults({ resultados, filtros, loading }) {
  const navigate = useNavigate();

  // Si está cargando
  if (loading) {
    return (
      <div className="search-results-loading">
        <div className="loading-spinner"></div>
        <p>Buscando negocios...</p>
      </div>
    );
  }

  // Si no hay resultados
  if (!resultados || !resultados.data || !resultados.data.data) {
    return null;
  }

  const negocios = resultados.data.data;
  const total = resultados.data.total || 0;
  const structuredData = resultados.structuredData;

  // Si la búsqueda no devolvió resultados
  if (negocios.length === 0) {
    return (
      <div className="search-results-empty">
        <div className="empty-icon">🔍</div>
        <h3>No se encontraron resultados</h3>
        <p>
          {filtros.query && `No hay negocios que coincidan con "${filtros.query}"`}
          {!filtros.query && filtros.municipio && "No hay negocios en el municipio seleccionado"}
          {!filtros.query && !filtros.municipio && "Intenta con otros términos de búsqueda"}
        </p>
        <button 
          className="empty-btn"
          onClick={() => window.location.reload()}
        >
          Ver todos los negocios
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Fragmentos enriquecidos para SEO */}
      {structuredData && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        </Helmet>
      )}

      <section className="search-results">
        {/* Header de resultados */}
        <div className="search-results-header">
          <h2 className="results-title">
            {filtros.query ? (
              <>Resultados para: <span className="highlight">"{filtros.query}"</span></>
            ) : filtros.municipio ? (
              <>Negocios en el municipio seleccionado</>
            ) : filtros.hasLocation ? (
              <>Negocios cerca de tu ubicación</>
            ) : (
              <>Todos los negocios</>
            )}
          </h2>
          <p className="results-count">
            {total} {total === 1 ? 'negocio encontrado' : 'negocios encontrados'}
          </p>
        </div>

        {/* Grid de resultados */}
        <div className="search-results-grid">
          {negocios.map((negocio) => {
            // Preparar imagen
            let imagen = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect fill='%23f0f0f0' width='600' height='400'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='24' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3ESin Imagen%3C/text%3E%3C/svg%3E";
            if (negocio.logo) {
              imagen = `${SERVER_URL}/storage/${negocio.logo}`;
            }

            // Preparar categorías
            const categorias = negocio.categorias || [];
            const categoriaNombre = categorias.length > 0 ? categorias[0].nombre : "General";

            // Preparar ubicación
            const ubicacion = negocio.municipio?.nombre || negocio.direccion || "El Salvador";

            // Preparar calificación
            const calificacion = negocio.resenas_avg_calificacion 
              ? parseFloat(negocio.resenas_avg_calificacion).toFixed(1)
              : null;
            const totalResenas = negocio.resenas_count || 0;

            // Preparar distancia (si existe)
            const distancia = negocio.distancia 
              ? negocio.distancia < 1 
                ? `${Math.round(negocio.distancia * 1000)} m`
                : `${negocio.distancia.toFixed(1)} km`
              : null;

            return (
              <article 
                key={negocio.id_negocio} 
                className="result-card"
                itemScope 
                itemType="https://schema.org/LocalBusiness"
              >
                {/* Imagen */}
                <div 
                  className="result-card-image"
                  style={{ backgroundImage: `url(${imagen})` }}
                  onClick={() => navigate(`/negocios/${negocio.id_negocio}`)}
                  role="button"
                  tabIndex={0}
                >
                  {distancia && (
                    <div className="distance-badge">
                      📍 {distancia}
                    </div>
                  )}
                  {negocio.estado_verificacion && (
                    <div className="verified-badge" title="Negocio verificado">
                      ✓
                    </div>
                  )}
                </div>

                {/* Contenido */}
                <div className="result-card-content">
                  <div className="result-card-header">
                    <h3 
                      className="result-card-title"
                      itemProp="name"
                      onClick={() => navigate(`/negocios/${negocio.id_negocio}`)}
                    >
                      {negocio.nombre}
                    </h3>
                    
                    {calificacion && (
                      <div className="result-card-rating" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                        <span className="rating-stars">⭐</span>
                        <span className="rating-value" itemProp="ratingValue">{calificacion}</span>
                        <span className="rating-count" itemProp="reviewCount">({totalResenas})</span>
                        <meta itemProp="bestRating" content="5" />
                        <meta itemProp="worstRating" content="1" />
                      </div>
                    )}
                  </div>

                  <p className="result-card-description" itemProp="description">
                    {negocio.descripcion && negocio.descripcion.length > 100
                      ? negocio.descripcion.substring(0, 100) + "..."
                      : negocio.descripcion || "Sin descripción"}
                  </p>

                  <div className="result-card-meta">
                    <span className="meta-category">
                      🏷️ {categoriaNombre}
                    </span>
                    <span className="meta-location" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                      📍 <span itemProp="addressLocality">{ubicacion}</span>
                    </span>
                  </div>

                  {/* Métodos de pago */}
                  {negocio.metodos_pago && negocio.metodos_pago.length > 0 && (
                    <div className="result-card-payments">
                      {negocio.metodos_pago.slice(0, 3).map((metodo) => (
                        <span key={metodo.id_metodo_pago} className="payment-badge">
                          {metodo.nombre}
                        </span>
                      ))}
                      {negocio.metodos_pago.length > 3 && (
                        <span className="payment-badge more">
                          +{negocio.metodos_pago.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Botón de acción */}
                  <button
                    className="result-card-btn"
                    onClick={() => navigate(`/negocios/${negocio.id_negocio}`)}
                  >
                    Ver detalles
                  </button>
                </div>

                {/* Datos estructurados ocultos */}
                <meta itemProp="telephone" content={negocio.telefono || ""} />
                <meta itemProp="email" content={negocio.email_contacto || ""} />
                {negocio.latitud && negocio.longitud && (
                  <div itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates" style={{ display: 'none' }}>
                    <meta itemProp="latitude" content={negocio.latitud} />
                    <meta itemProp="longitude" content={negocio.longitud} />
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Paginación (si hay más resultados) */}
        {resultados.data.last_page > 1 && (
          <div className="search-results-pagination">
            <p className="pagination-info">
              Página {resultados.data.current_page} de {resultados.data.last_page}
            </p>
            {/* Aquí se puede añadir botones de paginación si se necesita */}
          </div>
        )}
      </section>
    </>
  );
}
