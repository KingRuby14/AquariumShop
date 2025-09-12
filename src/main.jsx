import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./Constant/AddToCart.jsx";
import { WishlistProvider } from "./Constant/Wishlist.jsx";
createRoot(document.getElementById("root")).render(
  <CartProvider>
    <WishlistProvider>
      <App />
    </WishlistProvider>
  </CartProvider>
);
