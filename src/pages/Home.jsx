import "../styles/home.css";
import SearchBar from "../components/SearchBar";
import HeroSection from "../components/HeroSection/HeroSection";

export default function Home() {
  return (
    <div className="home">
      <h1 className="home-title"></h1>
      <HeroSection />
       <section style={{ padding: "80px 20px", background: "#ffffffff", color: "#020617" }}>
        <h2>Sección 2</h2>
        <p>Contenido de prueba debajo del Hero.</p>
      </section>
    </div>
  );
}
