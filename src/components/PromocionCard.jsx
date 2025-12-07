// src/components/PromocionCard.jsx
import '../styles/promocion-card.css';

export default function PromocionCard({ promocion }) {
  const { titulo, descripcion, porcentaje_descuento, codigo_promocional, fecha_inicio, fecha_fin, activa } = promocion;

  // Verificar si la promoción está vigente
  const now = new Date();
  const inicio = new Date(fecha_inicio);
  const fin = new Date(fecha_fin);
  const esVigente = now >= inicio && now <= fin && activa;

  // Formatear fechas
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-SV', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`promocion-card ${esVigente ? 'vigente' : 'expirada'}`}>
      <div className="promocion-header">
        <div className="promocion-discount">
          <span className="discount-number">{porcentaje_descuento}%</span>
          <span className="discount-label">OFF</span>
        </div>
        <div className="promocion-status">
          {esVigente ? (
            <span className="badge badge-active">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Activa
            </span>
          ) : (
            <span className="badge badge-expired">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Expirada
            </span>
          )}
        </div>
      </div>

      <div className="promocion-body">
        <h3 className="promocion-title">{titulo}</h3>
        <p className="promocion-description">{descripcion}</p>

        {codigo_promocional && (
          <div className="promocion-code">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Código: <strong>{codigo_promocional}</strong></span>
          </div>
        )}

        <div className="promocion-dates">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>Válido del {formatDate(fecha_inicio)} al {formatDate(fecha_fin)}</span>
        </div>
      </div>
    </div>
  );
}
