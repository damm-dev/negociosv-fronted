import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import OnboardingWizard from "./components/OnbordingWizard.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AccountTypePage from "./pages/AccountTypePage.jsx";
import RegisterPersonWizard from "./pages/RegisterPersonWizard.jsx";
import RegisterBusinessWizard from "./pages/RegisterBusinessWizard.jsx";
import CuentaPage from "./pages/CuentaPage.jsx";
import DashboardNegocioPage from "./pages/DashboardNegocioPage.jsx";
import ResenasNegocioPage from "./pages/ResenasNegocioPage.jsx";
import PromocionesPage from "./pages/PromocionesPage.jsx";
import NegociosList from "./pages/NegociosList.jsx";
import BusinessDetail from "./pages/BusinessDetail.jsx";
import LogrosPage from "./pages/LogrosPage.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account-type" element={<AccountTypePage />} />
        <Route path="/register/persona" element={<RegisterPersonWizard />} />
        <Route path="/register/negocio" element={<RegisterBusinessWizard />} />
        <Route path="/cuenta" element={<CuentaPage />} />
        
        {/* Rutas para Negocios */}
        <Route path="/dashboard" element={<DashboardNegocioPage />} />
        <Route path="/resenas" element={<ResenasNegocioPage />} />
        <Route path="/promociones" element={<PromocionesPage />} />
        <Route path="/negocios" element={<NegociosList />} />
        <Route path="/negocios/:id" element={<BusinessDetail />} />
        <Route path="/logros" element={<LogrosPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
