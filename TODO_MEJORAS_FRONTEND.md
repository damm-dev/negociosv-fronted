# TODO - Mejoras Frontend NegocioSV

## Objetivo
Mejorar el frontend para que sea más cómodo visualmente, minimalista y con mejor responsividad.

### Paleta de Colores
- Principal: `#020617` (azul oscuro elegante)
- Secundario: `#ffffff` (blanco)

## Tareas

### 1. App.jsx - Separar rutas ✅
- [x] Crear rutas sin MainLayout para formularios
- [x] Evitar que aparezca footer en login/registro

### 2. layouts.css - Variables CSS ✅
- [x] Actualizar `--primary` a `#020617`
- [x] Actualizar `--on-primary` a `#ffffff`
- [x] Ajustar todas las variables de color

### 3. login.css - Rediseño completo ✅
- [x] Diseño minimalista centrado
- [x] Eliminar ilustración compleja
- [x] Usar solo colores de la paleta
- [x] Mejorar responsividad

### 4. account-type.css - Actualizar colores ✅
- [x] Cambiar gradientes a `#020617`
- [x] Mantener diseño, actualizar paleta

### 5. navbar.css - Botones y responsividad ✅
- [x] Actualizar colores de botones
- [x] Mejorar adaptación a diferentes anchos
- [x] Evitar que desaparezcan botones en pantallas medianas
- [x] Mejor breakpoint para móvil

### 6. footer.css - Corregir colores ✅
- [x] Cambiar color de fondo a `#020617`
- [x] Ajustar contraste de textos

### 7. formNegocio.css - Actualizar paleta ✅
- [x] Cambiar `--primary-color` a `#020617`
- [x] Mantener funcionalidad

## Progreso: 7/7 completadas ✅

## Cambios Implementados

### Estructura
- **App.jsx**: Rutas de login y registro ahora son fullscreen sin navbar/footer
- **LoginPage.jsx**: Simplificado a diseño centrado minimalista

### Estilos Globales
- **layouts.css**: Variables CSS actualizadas con paleta `#020617` y `#ffffff`
- **index.css**: Sin cambios necesarios

### Páginas de Autenticación
- **login.css**: Rediseño completo minimalista con nueva paleta
- **account-type.css**: Actualizado con `#020617` como color principal

### Navegación y Footer
- **navbar.css**: 
  - Botones con nueva paleta
  - Mejor responsividad en pantallas medianas (900px-1024px)
  - Labels ocultos en tablets para mejor adaptación
  - Breakpoints mejorados
- **footer.css**: Fondo `#020617` con texto blanco

### Formularios
- **formNegocio.css**: Variables actualizadas con nueva paleta

## Resultado
✅ Paleta de colores consistente en toda la aplicación
✅ Sin scroll innecesario en formularios de login/registro
✅ Diseño minimalista y elegante
✅ Mejor responsividad en todos los tamaños de pantalla
✅ Navbar se adapta correctamente sin perder botones
