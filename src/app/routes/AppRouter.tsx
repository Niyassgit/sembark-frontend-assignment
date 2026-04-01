import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/pages/HomePage";
import CartPage from "../../features/cart/components/CartPage";
import ProductDetail from "../../features/products/pages/ProductDetail";
import MainLayout from "../../shared/layouts/MainLayout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
