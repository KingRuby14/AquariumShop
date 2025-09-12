// Constant/WishlistSidebar.jsx
import React from "react";
import { useWishlist } from "./Wishlist.jsx";
import { FiTrash2 } from "react-icons/fi";

export default function WishlistSidebar({ wishlistOpen, toggleWishlist }) {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50
        ${wishlistOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold text-blue-500">My Wishlist</h2>
        <button
          onClick={toggleWishlist}
          className="text-blue-500 font-extrabold hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* Items */}
      <div className="p-4 overflow-y-auto h-[70%]">
        {wishlistItems.length === 0 ? (
          <p className="text-red-500">Your wishlist is empty.</p>
        ) : (
          wishlistItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 mb-3"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-bold text-blue-500">{item.title}</h3>
                <p className="text-sm font-bold text-red-500">${item.price}</p>
              </div>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash2 />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {wishlistItems.length > 0 && (
        <div className="p-4 border-t">
          <button
            onClick={clearWishlist}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            Clear Wishlist
          </button>
        </div>
      )}
    </div>
  );
}
