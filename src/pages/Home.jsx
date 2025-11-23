import "../styles/home.css";
import SearchBar from "../components/SearchBar";
import HeroSection from "../components/HeroSection/HeroSection";
import CardSection from "../components/CardSection/CardSection";

export default function Home() {
  return (
    <div className="home">

      <HeroSection />
      <CardSection />
    </div>
  );
}
