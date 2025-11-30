import React, { useState } from 'react';
import '../styles/promociones.css';

export default function PromocionesPage() {
  const [promociones, setPromociones] = useState([
    {
      id: 1,
      titulo: '2x1 en Cafés',
      descripcion: 'Compra un café y lleva otro gratis todos los lunes',
      fechaInicio: '2024-01-01',
      fechaFin: '2024-01-31',
      activa: true,
    },
    {
      id: 2,
      titulo: '20% de Descuento',
      descripcion: 'Descuento especial en todos nuestros productos',
      fechaInicio: '2024-01-15',
      fechaFin: '2024-02-15',
      activa: true,
    },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevaPromocion, setNuevaPromocion] = useState({
    titulo: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
  });

  const handleCrearPromocion = (e) => {
    e.preventDefault();
    const promo = {
      id: Date.now(),
      ...nuevaPromocion,
      activa: true,
    };
    setPromociones([promo, ...promociones]);
    setNuevaPromocion({
      titulo: '',
      descripcion: '',
      fechaInicio: '',
      fechaFin: '',
    });
    setMostrarFormulario(false);
    alert('¡Promoción creada exitosamente!');
  };

  const handleEliminarPromocion = (id) => {
    if (confirm('¿Estás seguro de eliminar esta promoción?')) {
      setPromociones(promociones.filter((p) => p.id !== id));
    }
  };

  const toggleEstadoPromocion = (id) => {
    setPromociones(
      promociones.map((p) =>
        p.id === id ? { ...p, activa: !p.activa } : p
      )
    );
  };

  return (
    <div className="promociones-container">
      <div className="promociones-header">
        <div>
          <h1>Promociones y Descuentos</h1>
          <p className="promociones-subtitle">
            Crea y gestiona ofertas especiales para atraer más clientes
          </p>
        </div>
        <button
          className="btn-nueva-promocion"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? '✕ Cancelar' : '+ Nueva Promoción'}
        </button>
      </div>

      {/* Formulario de nueva promoción */}
      {mostrarFormulario && (
        <div className="formulario-promocion">
          <h2>Crear Nueva Promoción</h2>
          <form onSubmit={handleCrearPromocion}>
            <div className="form-group">
              <label htmlFor="titulo">Título de la Promoción *</label>
              <input
                type="text"
                id="titulo"
                className="form-input"
                placeholder="Ej: 2x1 en todos los productos"
                value={nuevaPromocion.titulo}
                onChange={(e) =>
                  setNuevaPromocion({ ...nuevaPromocion, titulo: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="descripcion">Descripción *</label>
              <textarea
                id="descripcion"
                className="form-textarea"
                placeholder="Describe los detalles de tu promoción..."
                value={nuevaPromocion.descripcion}
                onChange={(e) =>
                  setNuevaPromocion({
                    ...nuevaPromocion,
                    descripcion: e.target.value,
                  })
                }
                rows={4}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fechaInicio">Fecha de Inicio *</label>
                <input
                  type="date"
                  id="fechaInicio"
                  className="form-input"
                  value={nuevaPromocion.fechaInicio}
                  onChange={(e) =>
                    setNuevaPromocion({
                      ...nuevaPromocion,
                      fechaInicio: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="fechaFin">Fecha de Fin *</label>
                <input
                  type="date"
                  id="fechaFin"
                  className="form-input"
                  value={nuevaPromocion.fechaFin}
                  onChange={(e) =>
                    setNuevaPromocion({
                      ...nuevaPromocion,
                      fechaFin: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-cancelar-form"
                onClick={() => setMostrarFormulario(false)}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-crear-form">
                Crear Promoción
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de promociones */}
      <div className="promociones-lista">
        <h2 className="section-title">
          Promociones Activas ({promociones.filter((p) => p.activa).length})
        </h2>

        {promociones.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎁</div>
            <h3>No tienes promociones aún</h3>
            <p>Crea tu primera promoción para atraer más clientes</p>
            <button
              className="btn-crear-primera"
              onClick={() => setMostrarFormulario(true)}
            >
              Crear Promoción
            </button>
          </div>
        ) : (
          <div className="promociones-grid">
            {promociones.map((promo) => (
              <div
                key={promo.id}
                className={`promocion-card ${!promo.activa ? 'inactiva' : ''}`}
              >
                <div className="promocion-badge">
                  {promo.activa ? (
                    <span className="badge-activa">✓ Activa</span>
                  ) : (
                    <span className="badge-inactiva">Pausada</span>
                  )}
                </div>

                <h3 className="promocion-titulo">{promo.titulo}</h3>
                <p className="promocion-descripcion">{promo.descripcion}</p>

                <div className="promocion-fechas">
                  <div className="fecha-item">
                    <span className="fecha-label">Inicio:</span>
                    <span className="fecha-valor">
                      {new Date(promo.fechaInicio).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <div className="fecha-item">
                    <span className="fecha-label">Fin:</span>
                    <span className="fecha-valor">
                      {new Date(promo.fechaFin).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                </div>

                <div className="promocion-actions">
                  <button
                    className="btn-toggle"
                    onClick={() => toggleEstadoPromocion(promo.id)}
                  >
                    {promo.activa ? 'Pausar' : 'Activar'}
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminarPromocion(promo.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Consejos */}
      <div className="consejos-section">
        <h2 className="section-title">💡 Consejos para Promociones Efectivas</h2>
        <div className="consejos-grid">
          <div className="consejo-card">
            <div className="consejo-icon">🎯</div>
            <h3>Sé Específico</h3>
            <p>Define claramente qué incluye la promoción y sus condiciones</p>
          </div>
          <div className="consejo-card">
            <div className="consejo-icon">⏰</div>
            <h3>Urgencia</h3>
            <p>Las promociones por tiempo limitado generan más conversiones</p>
          </div>
          <div className="consejo-card">
            <div className="consejo-icon">📱</div>
            <h3>Comparte</h3>
            <p>Promociona tus ofertas en redes sociales para mayor alcance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
