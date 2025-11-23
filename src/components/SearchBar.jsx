import {useState} from "react";//Para guardar lo que el usuario escribe
import "./SearchBar.css";//Importa estilos

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {//Evento al dar click en buscar
    e.preventDefault();//pa que no se recargue y lo manejemos con JScript
    console.log("Buscar:", query);//Muestra en consola lo que el usuario escribió
  };

  return (
    <form className= "searchbar-form" onSubmit={handleSubmit}>
      <input
       type="search"
       placeholder="Encuentra el negocio que buscas"
       value={query}
       onChange={(e)=> setQuery(e.target.value)}
       aria-label="Buscar negocios"
       className="searchbar-input"
      ></input>

      <button type="submit" className="searchbar-button">
        Buscar
      </button>

    </form>
  );
}
