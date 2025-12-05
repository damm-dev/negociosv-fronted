import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

// Registrar el plugin Draggable
gsap.registerPlugin(Draggable);

/**
 * Hook personalizado para implementar funcionalidad de arrastrar hacia abajo para cerrar
 * en pantallas móviles usando GSAP Draggable
 * 
 * @param {Function} onClose - Función callback que se ejecuta cuando se cierra
 * @param {Object} options - Opciones de configuración
 * @param {number} options.threshold - Distancia mínima para cerrar (default: 150px)
 * @param {boolean} options.enabled - Si el draggable está habilitado (default: true)
 * @returns {Object} - Ref para el contenedor draggable
 */
export const useDraggableClose = (onClose, options = {}) => {
  const containerRef = useRef(null);
  const draggableInstance = useRef(null);
  
  const {
    threshold = 150,
    enabled = true
  } = options;

  useEffect(() => {
    if (!containerRef.current || !enabled) return;

    const container = containerRef.current;
    const isMobile = window.innerWidth <= 768;

    // Solo habilitar en móvil
    if (!isMobile) return;

    // Crear instancia de Draggable
    draggableInstance.current = Draggable.create(container, {
      type: 'y',
      bounds: { minY: 0, maxY: window.innerHeight },
      inertia: true,
      dragResistance: 0.3,
      edgeResistance: 0.65,
      
      onDrag: function() {
        // Aplicar opacidad basada en la posición
        const progress = Math.min(this.y / threshold, 1);
        gsap.set(container, { 
          opacity: 1 - (progress * 0.5)
        });
      },
      
      onDragEnd: function() {
        // Si se arrastró más allá del threshold, cerrar
        if (this.y > threshold) {
          gsap.to(container, {
            y: window.innerHeight,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              if (onClose) onClose();
            }
          });
        } else {
          // Volver a la posición original
          gsap.to(container, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
      }
    })[0];

    // Cleanup
    return () => {
      if (draggableInstance.current) {
        draggableInstance.current.kill();
      }
    };
  }, [onClose, threshold, enabled]);

  return containerRef;
};

/**
 * Hook para crear un indicador visual de "arrastrar para cerrar"
 * @returns {Object} - Ref para el indicador
 */
export const useDragIndicator = () => {
  const indicatorRef = useRef(null);

  useEffect(() => {
    if (!indicatorRef.current) return;

    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    // Animación sutil del indicador
    gsap.to(indicatorRef.current, {
      scaleX: 1.2,
      duration: 1,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true
    });
  }, []);

  return indicatorRef;
};
