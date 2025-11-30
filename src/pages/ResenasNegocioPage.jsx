import React, { useState } from 'react';
import '../styles/resenas-negocio.css';

export default function ResenasNegocioPage() {
  const [resenas] = useState([
    {
      id: 1,
      usuario: 'María González',
      calificacion: 5,
      comentario: '¡Excelente servicio! Muy recomendado, el personal es muy amable y profesional.',
      fecha: '2024-01-15',
      respondida: false,
    },
    {
      id: 2,
      usuario: 'Carlos Martínez',
      calificacion: 4,
      comentario: 'Buen lugar, aunque el tiempo de espera fue un poco largo.',
      fecha: '2024-01-14',
      respondida: true,
      respuesta: 'Gracias por tu comentario. Estamos trabajando para mejorar nuestros tiempos.',
    },
    {
      id: 3,
      usuario: 'Ana Rodríguez',
      calificacion: 5,
      comentario: 'Me encantó la atención y la calidad. Definitivamente volveré.',
      fecha: '2024-01-13',
      respondida: false,
    },
  ]);

  const [respuestaActiva, setRespuestaActiva] = useState(null);
  const [textoRespuesta, setTextoRespuesta] = useState('');

  const promedioCalificacion = (
    resenas.reduce((sum, r) => sum + r.calificacion, 0) / resenas.length
  ).toFixed(1);

  const renderEstrellas = (calificacion) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`estrella ${i < calificacion ? 'llena' : 'vacia'}`}>
        ★
      </span>
    ));
  };

  const handleResponder = (resenaId) => {
    setRespuestaActiva(resenaId);
    setTextoRespuesta('');
  };

  const handleEnviarRespuesta = (resenaId) => {
    console.log(`Respuesta para reseña ${resenaId}:`, textoRespuesta);
    alert('Respuesta enviada correctamente');
    setRespuestaActiva(null);
    setTextoRespuesta('');
  };

  return (
    <div className="resenas-container">
      <div className="resenas-header">
        <h1>Reseñas de tu Negocio</h1>
        <p className="resenas-subtitle">
          Gestiona y responde a las opiniones de tus clientes
        </p>
      </div>

      {/* Resumen de calificaciones */}
      <div className="calificacion-resumen">
        <div className="calificacion-principal">
          <div className="calificacion-numero">{promedioCalificacion}</div>
          <div className="calificacion-estrellas">
            {renderEstrellas(Math.round(parseFloat(promedioCalificacion)))}
          </div>
          <p className="calificacion-total">{resenas.length} reseñas totales</p>
        </div>

        <div className="calificacion-desglose">
          {[5, 4, 3, 2, 1].map((num) => {
            const count = resenas.filter((r) => r.calificacion === num).length;
            const porcentaje = (count / resenas.length) * 100;
            return (
              <div key={num} className="calificacion-barra-item">
                <span className="calificacion-numero-pequeno">{num} ★</span>
                <div className="calificacion-barra">
                  <div
                    className="calificacion-barra-fill"
                    style={{ width: `${porcentaje}%` }}
                  ></div>
                </div>
                <span className="calificacion-count">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lista de reseñas */}
      <div className="resenas-lista">
        <h2 className="section-title">Todas las Reseñas</h2>
        {resenas.map((resena) => (
          <div key={resena.id} className="resena-card">
            <div className="resena-header">
              <div className="resena-usuario">
                <div className="resena-avatar">
                  {resena.usuario.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="resena-nombre">{resena.usuario}</h3>
                  <p className="resena-fecha">
                    {new Date(resena.fecha).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <div className="resena-calificacion">
                {renderEstrellas(resena.calificacion)}
              </div>
            </div>

            <p className="resena-comentario">{resena.comentario}</p>

            {resena.respondida && resena.respuesta && (
              <div className="resena-respuesta">
                <div className="respuesta-header">
                  <strong>Tu respuesta:</strong>
                </div>
                <p>{resena.respuesta}</p>
              </div>
            )}

            {!resena.respondida && respuestaActiva !== resena.id && (
              <button
                className="btn-responder"
                onClick={() => handleResponder(resena.id)}
              >
                Responder
              </button>
            )}

            {respuestaActiva === resena.id && (
              <div className="respuesta-form">
                <textarea
                  className="respuesta-textarea"
                  placeholder="Escribe tu respuesta..."
                  value={textoRespuesta}
                  onChange={(e) => setTextoRespuesta(e.target.value)}
                  rows={4}
                />
                <div className="respuesta-actions">
                  <button
                    className="btn-cancelar"
                    onClick={() => setRespuestaActiva(null)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn-enviar"
                    onClick={() => handleEnviarRespuesta(resena.id)}
                    disabled={!textoRespuesta.trim()}
                  >
                    Enviar Respuesta
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
