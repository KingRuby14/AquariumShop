// AddToCart.jsx
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

// Hook to use cart anywhere
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // Check if item already exists
    const exists = cartItems.find((item) => item.id === product.id);

    if (!exists) {
      setCartItems((prev) => [...prev, product]);
    } else {
      console.log("Already in cart:", product.title);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
