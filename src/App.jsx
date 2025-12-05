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
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <Routes>
      {/* Rutas sin layout (fullscreen) - Login y Registro */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/account-type" element={<AccountTypePage />} />
      <Route path="/register/persona" element={<RegisterPersonWizard />} />
      <Route path="/register/negocio" element={<RegisterBusinessWizard />} />

      {/* Rutas de Administrador (sin layout) */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* Rutas con MainLayout (navbar + footer) */}
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/cuenta" element={<MainLayout><CuentaPage /></MainLayout>} />
      <Route path="/dashboard" element={<MainLayout><DashboardNegocioPage /></MainLayout>} />
      <Route path="/resenas" element={<MainLayout><ResenasNegocioPage /></MainLayout>} />
      <Route path="/promociones" element={<MainLayout><PromocionesPage /></MainLayout>} />
      <Route path="/negocios" element={<MainLayout><NegociosList /></MainLayout>} />
      <Route path="/negocios/:id" element={<MainLayout><BusinessDetail /></MainLayout>} />
      <Route path="/logros" element={<MainLayout><LogrosPage /></MainLayout>} />
    </Routes>
  );
}

export default App;
