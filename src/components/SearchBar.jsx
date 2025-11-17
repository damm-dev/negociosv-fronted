import {useState} from "react";//Para guardar lo que el usuario escribe

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {//Evento al dar click en buscar
    e.preventDefault();//pa que no se recargue y lo manejemos con JScript
    console.log("Buscar:", query);//Muestra en consola lo que el usuario escribió
  };

  return (
    <form>
      <input
       type="search"
       placeholder="Buscar negocios..."
       value={query}
       onChange={(e)=> setQuery(e.target.value)}
       aria-label="Buscar negocios"
       onSubmit={handleSubmit}
      ></input>

      <button type="submit">
        Buscar
      </button>

    </form>
  );
}
