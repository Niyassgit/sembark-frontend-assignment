import Products from "../../products/pages/Products";
import HeroSection from "../components/HeroSection";

const HomePage = () => {
  return (
    <div className="min-h-screen text-gray-900">
      <HeroSection />
      <div className="m-5 mb-10">
        <Products />
      </div>
    </div>
  );
};

export default HomePage;
