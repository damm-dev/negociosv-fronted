import { useState } from 'react';

// Importamos TODOS tus componentes
import DatosNegocio from './components/formNegocio/DatosNegocio';
import Ubicacion from './components/formNegocio/Ubicacion';
import Fotos from './components/formNegocio/Fotos';
import ContactoPago from './components/formNegocio/ContactoPago';
import Resumen from './components/formNegocio/Resumen';

function App() {
  // 1. Estado para controlar en qué paso estamos (1, 2, 3, 4, 5)
  const [currentStep, setCurrentStep] = useState(1);

  // 2. Estado para guardar TODA la información acumulada
  const [formData, setFormData] = useState({
    oferta: [],        // Inicializamos arrays para evitar errores
    metodosPago: []
  });

  // Función para actualizar datos (se la pasamos a todos los hijos)
  const updateForm = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  // Funciones para navegar (se las pasamos a los botones)
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // Función final (solo para probar el Resumen)
  const submitForm = () => {
    alert("¡Flujo completado! Datos listos para enviar al backend.");
    console.log("DATA FINAL:", formData);
  };

  // 3. Renderizado condicional: Mostramos el componente según el número de paso
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DatosNegocio 
            formData={formData} 
            updateForm={updateForm} 
            nextStep={nextStep} 
          />
        );
      case 2:
        return (
          <Ubicacion 
            formData={formData} 
            updateForm={updateForm} 
            nextStep={nextStep} 
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Fotos 
            formData={formData} 
            updateForm={updateForm} 
            nextStep={nextStep} 
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <ContactoPago 
            formData={formData} 
            updateForm={updateForm} 
            nextStep={nextStep} 
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <Resumen 
            formData={formData} 
            prevStep={prevStep} 
            submitForm={submitForm}
          />
        );
      default:
        return <div>Paso no encontrado</div>;
    }
  };

// En src/App.jsx, busca el return:

return (
  <div style={{ width: '100%', height: '100vh', margin: 0, padding: 0 }}>
    
    {/* Barra de aviso pequeña (opcional) */}
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center', fontSize: '12px', color: '#aaa', zIndex: 999 }}>
      Modo de Prueba - Paso {currentStep} de 5
    </div>

    {/* Aquí se carga el formulario */}
    {renderStep()}

  </div>
);
}

export default App;