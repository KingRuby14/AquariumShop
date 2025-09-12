import React, { useState } from "react";
import data from "../../Data/ProductsData.jsx";
import StarRate from "../../Constant/Stars.jsx";
import { useCart } from "../../Constant/AddToCart.jsx";
import { FaHeart } from "react-icons/fa";

export default function Products() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("All Items");
  const categories = ["All Items", "Sales", "Featured", "Best Seller"];

  // Filter by category
  const categoryFiltered =
    activeCategory === "All Items"
      ? data
      : data.filter((item) => item.category === activeCategory);

  function formatCount(count) {
    if (count >= 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return count;
  }

  return (
    <section className="w-full min-h-screen bg-gradient-to-r from-cyan-400 to-blue-600 py-12 px-4 md:px-10">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-white underline uppercase mb-4 md:mb-0">
          Trending This Week:
        </h3>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full font-bold text-sm md:text-base transition 
                ${
                  activeCategory === category
                    ? "bg-orange-500 text-white"
                    : "bg-transparent text-white hover:bg-cyan-100 hover:text-blue-700"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {categoryFiltered.length === 0 ? (
          <p className="text-center text-lg text-white">No items found.</p>
        ) : (
          categoryFiltered.map(
            ({ id, title, image, price, rating, reviewCount }) => (
              <div
                key={id}
                className="relative group w-full h-full rounded-xl bg-white shadow-md flex flex-col transition transform hover:scale-105"
              >
                {/* Wishlist Icon */}
                <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition">
                  <FaHeart size={18} />
                </button>

                {/* Image */}
                <div className="h-48 flex justify-center items-center p-4">
                  <img
                    src={image}
                    alt={title}
                    className="max-h-full object-contain"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  {/* Price + Title */}
                  <p className="bg-blue-600 text-white font-bold text-base rounded-r-md px-3 py-2 w-fit">
                    ₹ {price}
                  </p>
                  <h4 className="text-blue-600 font-bold text-lg mt-2 line-clamp-2 px-2">
                    {title}
                  </h4>

                  {/* Reviews */}
                  <div className="flex items-center gap-2 mt-2 px-2">
                    <div className="flex items-center">
                      <StarRate rating={rating} />
                    </div>
                    <span className="text-blue-600 text-sm font-semibold whitespace-nowrap">
                      ({formatCount(reviewCount || 0)} reviews)
                    </span>
                  </div>

                  {/* Spacer pushes button down */}
                  <div className="flex-grow p-2"></div>
                </div>

                {/* Add to Cart */}
                <button
                  className="w-full h-10 bg-black text-white font-semibold rounded-b-lg opacity-0 group-hover:opacity-100 hover:bg-blue-700 transition"
                  onClick={() => addToCart({ id, title, image, price })}
                >
                  Add to Cart
                </button>
              </div>
            )
          )
        )}
      </div>
    </section>
  );
}
