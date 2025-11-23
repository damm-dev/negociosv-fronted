import "./HeroSection.css";
import SearchBar from "../SearchBar.jsx";

export default function HeroSection() {
    return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Encuentra el negocio perfecto para ti
        </h1>
        <p className="hero-subtitle">
          Apoya a emprendedores salvadoreños y descubre nuevas opciones.
        </p>

        <SearchBar />
      </div>
    </section>
  );
}