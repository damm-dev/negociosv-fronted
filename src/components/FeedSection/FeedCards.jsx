import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FeedCards.css"; // Asegúrate de tener este CSS o usa card-section.css

const SERVER_URL = "http://127.0.0.1:8000";
const API_URL = `${SERVER_URL}/api/negocios`;

export default function FeedCards({ selectedCategory }) {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        
        // Extracción de datos de Laravel
        let raw = [];
        const body = response.data;
        if (body.data && body.data.data && Array.isArray(body.data.data)) raw = body.data.data;
        else if (body.data && Array.isArray(body.data)) raw = body.data;
        else if (Array.isArray(body)) raw = body;

        const mapped = raw.map((negocio) => {
          // Normalizar categorías para el filtro
          let categoriesList = [];
          if (Array.isArray(negocio.categorias)) {
            categoriesList = negocio.categorias.map(c => c.nombre);
          } else if (negocio.categoria) {
            categoriesList = [negocio.categoria];
          } else {
            categoriesList = ["Varios"];
          }

          let image = "https://via.placeholder.com/600x400?text=Sin+Imagen";
          const dbPath = negocio.logo || negocio.logo_path;
          if (dbPath) image = `${SERVER_URL}/storage/${dbPath}`;

          return {
            id: negocio.id_negocio || negocio.id,
            name: negocio.nombre || "Negocio",
            description: negocio.descripcion || "",
            categoriesList, 
            location: negocio.municipio?.nombre || negocio.direccion || "El Salvador",
            image,
            rating: 4.8, 
            reviews: 0,
            installs: "Nuevo"
          };
        });

        setBusinesses(mapped);
      } catch (err) {
        console.error("Error cargando negocios:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  // FILTRADO INTELIGENTE
  const filteredBusinesses = (!selectedCategory || selectedCategory === "Todos")
    ? businesses
    : businesses.filter((b) => {
        // Busca si alguna categoría del negocio incluye el texto del botón
        return b.categoriesList.some(cat => 
            cat.toLowerCase().includes(selectedCategory.toLowerCase())
        );
      });

  if (loading) return <p style={{textAlign:'center', padding:'40px'}}>Cargando negocios...</p>;

  return (
    <section className="cards-section">
      <div style={{ padding: '0 20px', marginBottom: '20px' }}>
        <h2>
          {selectedCategory === "Todos" 
            ? "Todos los negocios" 
            : `Resultados para: ${selectedCategory}`}
        </h2>
        <p style={{color: '#666'}}>
          Mostrando {filteredBusinesses.length} resultados encontrados.
        </p>
      </div>

      {filteredBusinesses.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
           <p>No se encontraron negocios en la categoría <strong>{selectedCategory}</strong>.</p>
           <p>¡Prueba con otra o selecciona "Todos"!</p>
        </div>
      ) : (
        <div className="wp-style-grid">
          {filteredBusinesses.map((b) => (
            <article key={b.id} className="wp-card">
              <div className="wp-card-image" style={{ backgroundImage: `url(${b.image})` }} />
              
              <div className="wp-card-body">
                <h3 className="wp-card-name">{b.name}</h3>
                <p className="wp-card-description">
                  {b.description.length > 60 ? b.description.substring(0, 60) + "..." : b.description}
                </p>
                
                <div className="wp-card-meta">
                  <span className="wp-card-category">{b.categoriesList[0] || "General"}</span>
                  <span className="wp-card-location">{b.location}</span>
                </div>

                <div className="wp-card-stats">
                  <span className="wp-card-rating">⭐ {b.rating}</span>
                  <span className="wp-card-reviews">({b.reviews})</span>
                </div>
              </div>

              <div className="wp-card-actions">
                <button 
                  className="wp-card-btn"
                  onClick={() => navigate(`/negocio/${b.id}`)}
                >
                  Ver detalles
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}