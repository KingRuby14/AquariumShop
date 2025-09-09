import React from "react";
import Octo from "../../../assets/fish/octo.png";

export default function AdvertisementFish() {
  return (
    <section className="w-full bg-[#EDE0E0] py-12 md:py-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-6">
        
        {/* Left Content */}
        <div className="flex flex-col md:w-1/2 space-y-6">
          <div className="space-y-2">
            <span className="text-xl md:text-2xl font-semibold text-[#ff7300] leading-tight">
              Fast Delivery
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#19063C] leading-snug max-w-2xl">
              Find Everything You Need for Fish
            </h1>
          </div>

          <div className="space-y-6">
            <p className="text-base md:text-lg text-black font-normal leading-relaxed">
              Lorem lipsm sdfvjbsvjbsfojvbsdofvofsvoefbv
            </p>
            <button className="bg-[#6839cc] text-white uppercase font-extrabold px-6 py-3 text-sm rounded-full transition-all duration-300 hover:bg-[#E0F7FA] hover:text-[#003B73] hover:scale-105">
              Shop Now
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:w-1/3">
          <img
            src={Octo}
            alt="Octopus"
            className="w-64 sm:w-80 md:w-[400px] lg:w-[500px] animate-bounce"
          />
        </div>
      </div>
    </section>
  );
}
