import "../styles/home.css";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <div className="home">
      <h1 className="home-title">Buscar negocios</h1>
      <SearchBar />
    </div>
  );
}
