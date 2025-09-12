import React from "react";
import { IoClose } from "react-icons/io5";
import { FaTrash, FaHeart } from "react-icons/fa"; // heart icon for wishlist
import { useCart } from "./AddToCart.jsx";
import { useWishlist } from "./Wishlist.jsx";
import { Link } from "react-router-dom";

export default function AddToCartSidebar({ cartOpen, toggleCart }) {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const { addToWishlist } = useWishlist();

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50
        ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-2xl text-blue-600"
        onClick={toggleCart}
        aria-label="Close cart"
      >
        <IoClose />
      </button>

      {/* Header */}
      <h2 className="text-xl font-bold p-6 border-b text-blue-500">My Cart</h2>

      {/* Items */}
      <div className="p-4 overflow-y-auto h-[calc(100%-180px)]">
        {cartItems.length === 0 ? (
          <p className="text-red-600">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 border-b py-3"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-14 h-14 rounded-lg object-cover"
              />

              {/* Content */}
              <div className="flex-1">
                <p className="font-semibold text-blue-500 line-clamp-1">
                  {item.title}
                </p>
                <p className="text-sm font-bold text-red-500">
                  ₹ {item.price}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 py-1 bg-blue-600 rounded-md text-sm font-bold hover:bg-orange-500"
                  >
                    -
                  </button>
                  <span className="font-semibold text-blue-500">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 py-1 bg-blue-500 rounded-md text-sm font-bold hover:bg-orange-500"
                  >
                    +
                  </button>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => addToWishlist(item)}
                  className="flex items-center gap-1 text-sm mt-2 text-pink-600 hover:text-pink-800"
                >
                  <FaHeart /> Add to Wishlist
                </button>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800 ml-2"
                aria-label="Remove item"
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer - Total & Checkout */}
      {cartItems.length > 0 && (
        <div className="p-4 border-t">
          {/* Total Price */}
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-blue-600">Total:</span>
            <span className="font-bold text-red-600 text-lg">₹ {totalPrice}</span>
          </div>

          {/* Checkout Button */}
          <Link
            to="/checkout"
            onClick={toggleCart}
            className="w-full block text-center bg-blue-600 hover:bg-orange-500 text-white font-bold py-2 rounded-lg transition"
          >
            Purchase Now
          </Link>
        </div>
      )}
    </div>
  );
}
