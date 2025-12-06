// src/components/Footer.jsx
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="layout-footer">
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} NegocioSV · Proyecto UES ·
          <span className="footer-separator">|</span> Aviso legal
          <span className="footer-separator">|</span> Política de privacidad
        </p>
      </div>
    </footer>
  );
}
