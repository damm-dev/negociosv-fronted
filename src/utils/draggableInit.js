import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

// Registrar el plugin
gsap.registerPlugin(Draggable);

/**
 * Inicializa la funcionalidad de arrastrar para cerrar en elementos con data-draggable-closing
 * Funciona en todas las resoluciones (móvil y escritorio)
 */
export const initDraggableClosing = () => {

  // Buscar todos los elementos con data-draggable-closing
  const containers = document.querySelectorAll('[data-draggable-closing="true"]');

  containers.forEach(container => {
    // Buscar el handle dentro del contenedor
    const handle = container.querySelector('[data-draggable-handle]');

    if (!handle) {
      console.warn('No se encontró data-draggable-handle en:', container);
      return;
    }

    // Limpiar animación CSS para evitar conflictos con GSAP
    // La propiedad 'animation: forwards' mantiene el transform y bloquea a GSAP
    container.style.animation = 'none';
    container.style.transform = 'translateY(0)';
    container.style.opacity = '1';

    // Obtener la función de cierre (navegar hacia atrás)
    const closeAction = () => {
      window.history.back();
    };

    // Configurar Draggable
    Draggable.create(container, {
      type: 'y',
      trigger: handle,
      bounds: { minY: 0, maxY: window.innerHeight },
      inertia: true,
      dragResistance: 0.3,
      edgeResistance: 0.65,

      onDrag: function () {
        // Aplicar opacidad basada en la posición
        const threshold = 150;
        const progress = Math.min(this.y / threshold, 1);
        gsap.set(container, {
          opacity: 1 - (progress * 0.5)
        });
      },

      onDragEnd: function () {
        const threshold = 150;

        // Si se arrastró más allá del threshold, cerrar
        if (this.y > threshold) {
          gsap.to(container, {
            y: window.innerHeight,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: closeAction
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
    });
  });
};

/**
 * Hook para inicializar draggable cuando el componente se monta
 */
export const useDraggableInit = () => {
  if (typeof window !== 'undefined') {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initDraggableClosing);
    } else {
      // DOM ya está listo
      setTimeout(initDraggableClosing, 100);
    }
  }
};
