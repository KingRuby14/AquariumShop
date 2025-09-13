import React, { useRef, useEffect, useState } from "react";
import FishData from "../../../Data/FishData.jsx";
import StarRate from "../../../Constant/Stars.jsx";
import { useCart } from "../../../Constant/AddToCart.jsx";
import { useWishlist } from "../../../Constant/Wishlist.jsx";
import { FaHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

export default function Fish() {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const scrollRef = useRef();
  const [popupMessage, setPopupMessage] = useState("");

  const scroll = (scrollOffset) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollLeft += scrollOffset;
  };

  function formatCount(count) {
    if (count >= 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return count;
  }

  const infiniteFishData = [...FishData, ...FishData, ...FishData];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth / 3;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      if (scrollLeft >= scrollWidth * 2) {
        scrollContainer.scrollLeft = scrollLeft - scrollWidth;
      } else if (scrollLeft <= 0) {
        scrollContainer.scrollLeft = scrollLeft + scrollWidth;
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    // seed the position in the middle block for infinite effect
    scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  // Show popup for 2 seconds
  const showPopup = (msg) => {
    setPopupMessage(msg);
    setTimeout(() => setPopupMessage(""), 2000);
  };

  return (
    <section className="w-full h-[60vh] bg-gradient-to-tr from-sky-400 to-blue-600 py-10 relative">
      {/* Popup */}
      {popupMessage && (
  <div className="fixed top-20 right-5 transform -translate-x-3.5 bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg z-50 animate-fade-in-out">
    {popupMessage}
  </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center px-6 md:px-20">
        <h3 className="text-white text-xl md:text-2xl font-semibold underline uppercase">
          Best Selling For Fish:
        </h3>
      </div>

      {/* Carousel wrapper: allow vertical overflow so scaled cards are visible */}
      <div className="relative w-full mt-6 overflow-visible">
        {/* Scroll Left */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 text-white text-2xl md:text-3xl rounded-full px-3 py-1 z-50 hover:bg-blue-600 transition"
          onClick={() => scroll(-300)}
          aria-label="scroll left"
        >
          ❮
        </button>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 px-4 md:px-10 scroll-smooth cursor-grab active:cursor-grabbing no-scrollbar items-center overflow-x-auto overflow-y-visible py-10"
        >
          {infiniteFishData.map((item, index) => (
            <div
              key={index}
              className="relative group flex-none w-56 sm:w-64 md:w-72 h-auto rounded-xl bg-white shadow-md flex flex-col transition-transform transform-gpu hover:scale-105 hover:z-20"
            >
              {/* Image */}
              <div className="h-40 flex justify-center items-center p-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1">
                {/* Price + Title */}
                <p className="bg-blue-600 text-white font-bold text-sm md:text-base rounded-r-md px-3 py-1 w-fit">
                  ₹ {item.price}
                </p>
                <h4 className="text-blue-600 font-bold text-lg mt-2 capitalize line-clamp-2 px-2">
                  {item.title}
                </h4>

                {/* Reviews */}
                <div className="flex items-center gap-2 mt-2 px-2">
                  <StarRate rating={item.rating} />
                  <span className="text-blue-600 text-sm font-semibold whitespace-nowrap">
                    ({formatCount(item.reviewCount || 0)} reviews)
                  </span>
                </div>

                <div className="flex-grow p-2"></div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-around items-center w-full border-t p-2">
                {/* Add to Cart */}
                <button
                  className="flex items-center gap-2 text-blue-600 font-semibold hover:text-red-600 transition"
                  onClick={() => {
                    addToCart(item);
                    showPopup("✅ Added to Cart");
                  }}
                >
                  <FiShoppingCart size={20} />
                  <span className="hidden sm:inline">Cart</span>
                </button>

                {/* Add to Wishlist */}
                <button
                  className="flex items-center gap-2 text-blue-500 hover:text-red-600 font-semibold transition"
                  onClick={() => {
                    addToWishlist(item);
                    showPopup("❤️ Added to Wishlist");
                  }}
                >
                  <FaHeart size={20} />
                  <span className="hidden sm:inline">Wishlist</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Right */}
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 text-white text-2xl md:text-3xl rounded-full px-3 py-1 z-20 hover:bg-blue-600 transition"
          onClick={() => scroll(300)}
          aria-label="scroll right"
        >
          ❯
        </button>
      </div>
    </section>
  );
}
