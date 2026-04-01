import AppRouter from "./app/routes/AppRouter";
import { CartProvider } from "./features/cart/context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  );
};

export default App;
