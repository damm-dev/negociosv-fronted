import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import OnboardingWizard from "./components/OnbordingWizard.jsx";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<OnboardingWizard />} />
        {/* aquí luego agregaremos más rutas:
            <Route path="/negocios" element={<Negocios />} />
             
            <Route path="/negocios/:id" element={<DetalleNegocio />} />
        */}
      </Routes>
    </MainLayout>
  );
}

export default App;
