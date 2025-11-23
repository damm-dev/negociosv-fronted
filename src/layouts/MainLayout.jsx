// MainLayout.jsx
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import "../styles/layouts.css";

export default function MainLayout({ children }) {
  return (
    <div className="layout">
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENIDO BODY*/}
      <main className="layout-main">
        {children}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

