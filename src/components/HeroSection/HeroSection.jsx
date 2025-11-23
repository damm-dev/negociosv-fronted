
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./HeroSection.css";
import SearchBar from "../SearchBar.jsx";

export default function HeroSection() {
  const subtitleLeftRef = useRef(null);
  const subtitleRightRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animación título
    tl.fromTo(
      ".hero-title",
      { y: 80, opacity: 0, filter: "blur(4px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out" }
    );

    // Animacion subtitulo, partes izquierda y derecha desde direcciones opuestas
    tl.fromTo(
      subtitleLeftRef.current,
      { x: -100, opacity: 0, filter: "blur(4px)" },
      { x: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" },
      "-=0.8"
    );
    tl.fromTo(
      subtitleRightRef.current,
      { x: 100, opacity: 0, filter: "blur(4px)" },
      { x: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" },
      "-=1.0"
    );

    // Animación pulsante sutil al contenedor subtítulo (loop infinito)
    tl.to(
      [subtitleLeftRef.current, subtitleRightRef.current],
      {
        scale: 1.02,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      },
      "+=0.3"
    );

    // Animación searchbar
    tl.fromTo(
      ".search-bar",
      { scale: 0.6, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1, 0.7)",
      },
      "-=1.8"
    );

    // Animacion Fondo - efecto parallax sutil
    const hero = document.querySelector(".hero");
    function onMouseMove(event) {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      gsap.to(hero, {
        backgroundPositionX: 50 + x * 10 + "%",
        backgroundPositionY: 50 + y * 10 + "%",
        ease: "power1.out",
        duration: 0.6,
      });
    }
    hero.addEventListener("mousemove", onMouseMove);

    return () => {
      hero.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Encuentra el negocio perfecto para ti</h1>
        <p className="hero-subtitle">
          <span ref={subtitleLeftRef}>Apoya a los emprendedores salvadoreños </span>
          <span ref={subtitleRightRef}>y descubre nuevas oportunidades.</span>
        </p>
        <SearchBar className="search-bar" />
      </div>
    </section>
  );
}
