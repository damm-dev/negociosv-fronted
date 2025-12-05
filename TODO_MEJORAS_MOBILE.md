# TODO - Mejoras Móviles NegocioSV

## Progreso de Implementación

### 1. Eliminar email del Footer ✅
- [x] Modificar Footer.jsx
- [x] Actualizar footer.css

### 2. Mejorar navegación móvil ✅
- [x] Modificar Navbar.jsx para redirigir a registro si no está logueado

### 3. Implementar Draggable GSAP ✅
- [x] Crear hook useDraggableClose.js
- [x] Aplicar a LoginPage.jsx
- [x] Aplicar a AccountTypePage.jsx
- [x] Aplicar a RegisterPersonWizard.jsx
- [x] Aplicar a RegisterBusinessWizard.jsx
- [x] Actualizar estilos CSS correspondientes

### 4. Verificación Final ⏳
- [ ] Probar en móvil
- [ ] Verificar animaciones
- [ ] Confirmar funcionalidad completa

---
**Última actualización:** ¡Implementación completada! Lista para pruebas.

## Resumen de Cambios Realizados

### Archivos Modificados:
1. **negociosv-fronted/src/layouts/Footer.jsx** - Eliminado email de contacto
2. **negociosv-fronted/src/styles/footer.css** - Limpieza de estilos
3. **negociosv-fronted/src/layouts/Navbar.jsx** - Redirección a registro si no está logueado
4. **negociosv-fronted/src/hooks/useDraggableClose.js** - Hook personalizado GSAP (NUEVO)
5. **negociosv-fronted/src/pages/LoginPage.jsx** - Implementado draggable
6. **negociosv-fronted/src/styles/login.css** - Estilos para draggable
7. **negociosv-fronted/src/pages/AccountTypePage.jsx** - Implementado draggable
8. **negociosv-fronted/src/styles/account-type.css** - Estilos para draggable
9. **negociosv-fronted/src/pages/RegisterPersonWizard.jsx** - Implementado draggable
10. **negociosv-fronted/src/pages/RegisterBusinessWizard.jsx** - Implementado draggable
11. **negociosv-fronted/src/styles/formNegocio.css** - Estilos para draggable

### Funcionalidades Implementadas:
- ✅ Footer limpio sin email
- ✅ Navegación móvil mejorada (botón cuenta redirige a registro)
- ✅ Funcionalidad drag-to-close en todos los formularios fullscreen
- ✅ Indicador visual de "arrastrar para cerrar"
- ✅ Animaciones suaves con GSAP
- ✅ Solo activo en dispositivos móviles (max-width: 768px)
