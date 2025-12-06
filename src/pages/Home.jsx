import { useEffect } from "react";
import "../styles/home.css";
import SearchBar from "../components/SearchBar";
import HeroSection from "../components/HeroSection/HeroSection";
import CardSection from "../components/CardSection/CardSection";

export default function Home() {

  useEffect(() => {
    // 1. Definir los datos de tu página
    const metaData = {
      title: "Negocios SV | Descubre negocios en El Salvador",
      description: "Encuentra y promociona negocios en El Salvador. Descubre servicios, productos y más en la plataforma exclusiva para emprendedores salvadoreños.",
      keywords: "negocios el salvador, directorio empresas, emprendedores salvadoreños, servicios el salvador, productos sv, compras locales",
      author: "NegocioSv Team",
      url: "https://negociosv.com/",
      image: "https://negociosv.com/Banner.svg",
    };

    // 2. Cambiar el título de la pestaña
    document.title = metaData.title;

    // --- FUNCIONES DE AYUDA (Para inyectar las etiquetas sin ensuciar todo) ---

    // Función para actualizar o crear etiquetas <meta>
    const setMeta = (attr, key, content) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Función para actualizar o crear etiquetas <link> (para canonical)
    const setLink = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // --- INYECCIÓN DE ETIQUETAS (Igual que en tu imagen de ejemplo) ---

    // Básicos
    setMeta("name", "description", metaData.description);
    setMeta("name", "author", metaData.author);
    setMeta("name", "keywords", metaData.keywords);
    setMeta("name", "creator", "NegocioSv");
    
    // Robots (Instrucciones para Google)
    setMeta("name", "robots", "index, follow");
    setMeta("name", "googlebot", "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1");

    // Canonical (Evita contenido duplicado)
    setLink("canonical", metaData.url);

    // Open Graph (Facebook, WhatsApp, LinkedIn)
    setMeta("property", "og:title", metaData.title);
    setMeta("property", "og:description", "Apoya lo local. Encuentra tu próximo negocio favorito aquí.");
    setMeta("property", "og:url", metaData.url);
    setMeta("property", "og:site_name", "NegocioSv");
    setMeta("property", "og:locale", "es_SV");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:image", metaData.image);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:alt", "NegocioSv - Directorio de Negocios en El Salvador");

    // Twitter Card (X)
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", metaData.title);
    setMeta("name", "twitter:description", "Apoya lo local. Encuentra tu próximo negocio favorito aquí.");
    setMeta("name", "twitter:image", metaData.image);
    setMeta("name", "twitter:image:width", "1200");
    setMeta("name", "twitter:image:height", "630");
    setMeta("name", "twitter:image:alt", "NegocioSv - Directorio de Negocios en El Salvador");

  }, []); // Se ejecuta solo una vez al cargar el Home

  return (
    <div className="home">
      <HeroSection />
      <CardSection />
    </div>
  );
}