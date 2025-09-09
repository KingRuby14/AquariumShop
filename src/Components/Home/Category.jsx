import React from "react";
import data from "../../Data/CatrgoryData";

export default function CategorySection() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="flex flex-col items-start px-5 sm:px-10 lg:px-20">
        {/* Title */}
        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold underline uppercase">
          Browse By Categories:
        </h3>

        {/* Category list */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-10 lg:gap-14 mt-8 w-full">
          {data.map(({ id, name, image }) => (
            <div
              key={id}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full shadow-md flex items-center justify-center bg-white">
                <img
                  src={image}
                  alt={name}
                  className="w-10 sm:w-12 md:w-14"
                />
              </div>
              <span className="mt-3 text-sm sm:text-base md:text-lg font-semibold">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
