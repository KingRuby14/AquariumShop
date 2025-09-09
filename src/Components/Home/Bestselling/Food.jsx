import React, { useRef, useEffect } from "react";
import FoodData from "../../../Data/FoodData.jsx";
import StarRate from '../../../Constant/Stars.jsx'
import { useCart } from '../../../Constant/AddToCart.jsx'

export default function Food() {
  const { addToCart } = useCart();
  const scrollRef = useRef();

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  function formatCount(count) {
    if (count >= 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return count;
  }

  const infiniteFoodData = [...FoodData, ...FoodData, ...FoodData];

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
    scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full min-h-[70vh] bg-gradient-to-r from-blue-600 to-cyan-400 py-10">
      {/* Header */}
      <div className="flex justify-between items-center px-6 md:px-20">
        <h3 className="text-white text-xl md:text-2xl font-semibold underline uppercase">
          Best Selling For Food & Medicine:
        </h3>
      </div>

      {/* Carousel */}
      <div className="relative w-full mt-6">
        {/* Scroll Left */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 text-white text-2xl md:text-3xl rounded-full px-3 py-1 z-10 hover:bg-blue-600 transition"
          onClick={() => scroll(-300)}
        >
          ❮
        </button>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 px-4 md:px-10 overflow-x-auto scroll-smooth cursor-grab active:cursor-grabbing no-scrollbar"
        >
          {infiniteFoodData.map((item, index) => (
            <div
              key={index}
              className="group flex-none w-56 sm:w-64 md:w-72 h-80 rounded-xl bg-white/10 shadow-lg backdrop-blur-sm transform transition hover:scale-105 relative"
            >
              {/* Image */}
              <div className="w-full h-40 flex justify-center items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full object-contain"
                />
              </div>

              {/* Price + Title */}
              <div className="px-3">
                <p className="bg-white text-blue-700 font-bold text-sm md:text-base rounded-r-md px-3 py-1 w-fit">
                  ₹ {item.price}
                </p>
                <h4 className="text-white font-bold text-lg md:text-xl mt-2">
                  {item.title}
                </h4>
              </div>

              {/* Reviews */}
              <div className="flex items-center gap-2 px-3 mt-1">
                <StarRate rating={item.rating} />
                <span className="text-white text-sm">
                  ({formatCount(item.reviewCount || 0)} reviews)
                </span>
              </div>

              {/* Add to Cart */}
              <button
                className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[90%] h-10 bg-black text-white font-semibold rounded-md opacity-0 group-hover:opacity-100 hover:bg-blue-700 transition"
                onClick={() =>
                  addToCart({
                    id: item.id,
                    title: item.title,
                    image: item.image,
                    price: item.price,
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Scroll Right */}
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 text-white text-2xl md:text-3xl rounded-full px-3 py-1 z-10 hover:bg-blue-600 transition"
          onClick={() => scroll(300)}
        >
          ❯
        </button>
      </div>
    </section>
  );
}
