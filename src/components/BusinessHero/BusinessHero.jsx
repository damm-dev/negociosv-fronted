import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./BusinessHero.css";

export default function BusinessesHero({ categories, onSelectCategory }) {
  const subtitleRef = useRef(null);

  function splitText(text) {
    return text.split("").map((char, i) =>
      char === " " ? " " : <span key={i} className="letter">{char}</span>
    );
  }

  useEffect(() => {
    const tl = gsap.timeline();

    // Animación del título
    tl.fromTo(
      ".businesses-hero-title",
      { y: 80, opacity: 0, filter: "blur(5px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out" }
    );

    // Animación letra por letra del subtítulo
    tl.fromTo(
      subtitleRef.current.querySelectorAll(".letter"),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.04, ease: "power2.out" },
      "-=0.7"
    );

    // Animación de aparición de categorías
    tl.fromTo(
      ".hero-category-item",
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.1, ease: "elastic.out(1, 0.6)", stagger: 0.08 },
      "-=1.4"
    );

    // 🔥 ANIMACIÓN DE PANTALLA (PARALLAX BACKGROUND)
    const hero = document.querySelector(".businesses-hero");

    function onMouseMove(e) {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      gsap.to(hero, {
        backgroundPositionX: 50 + x * 10 + "%",
        backgroundPositionY: 50 + y * 10 + "%",
        ease: "power1.out",
        duration: 0.6,
      });
    }

    hero.addEventListener("mousemove", onMouseMove);

    return () => hero.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section className="businesses-hero">
      <div className="businesses-hero-content">

        <h1 className="businesses-hero-title">
          Explora negocios cerca de ti
        </h1>

        <p className="businesses-hero-subtitle" ref={subtitleRef}>
          {splitText("Descubre negocios salvadoreños organizados por categorías.")}
        </p>

        <div className="hero-categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="hero-category-item"
              onClick={() => onSelectCategory(cat)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
