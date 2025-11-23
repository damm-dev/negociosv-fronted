import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import OnboardingWizard from "./components/OnbordingWizard.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AccountTypePage from "./pages/AccountTypePage.jsx";
import RegisterPersonWizard from "./pages/RegisterPersonWizard.jsx";
import RegisterBusinessWizard from "./pages/RegisterBusinessWizard.jsx";
import CuentaPage from "./pages/CuentaPage.jsx";

function App() {
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
        {/* aquí luego agregaremos más rutas:
            <Route path="/negocios" element={<Negocios />} />
             
            <Route path="/negocios/:id" element={<DetalleNegocio />} />
        */}
      </Routes>
    </MainLayout>
  );
}

export default App;
