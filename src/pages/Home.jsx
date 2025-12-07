import { useEffect, useState, useRef } from "react";
import "../styles/home.css";
import SearchBar from "../components/SearchBar";
import HeroSection from "../components/HeroSection/HeroSection";
import CardSection from "../components/CardSection/CardSection";
import SearchResults from "../components/SearchResults";

export default function Home() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchFilters, setSearchFilters] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const resultsRef = useRef(null);

  const handleSearch = (resultados, filtros) => {
    setSearchResults(resultados);
    setSearchFilters(filtros);
    
    // Scroll automático a los resultados después de un pequeño delay
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  const handleLoading = (loading) => {
    setIsSearching(loading);
  };

  return (
    <div className="home">
      <HeroSection onSearch={handleSearch} onLoading={handleLoading} />
      
      {/* Mostrar resultados de búsqueda si existen */}
      {searchResults && (
        <div ref={resultsRef}>
          <SearchResults 
            resultados={searchResults} 
            filtros={searchFilters} 
            loading={isSearching}
          />
        </div>
      )}
      
      {/* Mostrar CardSection solo si no hay búsqueda activa */}
      {!searchResults && <CardSection />}
    </div>
  );
}
