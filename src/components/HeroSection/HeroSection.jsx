
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./HeroSection.css";
import SearchBar from "../SearchBar.jsx";

export default function HeroSection() {
  const subtitleRef = useRef(null);

  // Helper function to split subtitle text into spans
  function splitTextToSpans(text) {
    return text.split("").map((char, index) => {
      // Preserve spaces without adding span to avoid weird spacing
      if (char === " ") {
        return " ";
      }
      return (
        <span key={index} className="letter">
          {char}
        </span>
      );
    });
  }

  useEffect(() => {
    const tl = gsap.timeline();

    // Animación título
    tl.fromTo(
      ".hero-title",
      { y: 80, opacity: 0, filter: "blur(4px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out" }
    );

    // Animación subtítulo letra a letra
    tl.fromTo(
      subtitleRef.current.querySelectorAll(".letter"),
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.05,
      },
      "-=0.6"
    );

    // Animación pulsante sutil al subtítulo (loop infinito)
    tl.to(
      subtitleRef.current,
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
        <p className="hero-subtitle" ref={subtitleRef}>
          {splitTextToSpans(
            "Apoya a los emprendedores salvadoreños y descubre nuevas oportunidades."
          )}
        </p>
        <SearchBar className="search-bar" />
      </div>
    </section>
  );
}
