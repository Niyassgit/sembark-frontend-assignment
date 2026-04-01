import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 bg-cover bg-center bg-fixed">
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
