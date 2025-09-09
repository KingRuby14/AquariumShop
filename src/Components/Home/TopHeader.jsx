import React from "react";

export default function TopHeader() {
  return (
    <div className="bg-[#6a32c5] text-white flex flex-wrap justify-around items-center px-5 py-2 text-sm md:text-base z-50 relative text-center">
      <span className="mx-2">Find a Store</span>
      <span className="mx-2">Order Tracking</span>
      <span className="bg-[#ff782c] px-4 py-2 rounded-full text-xs md:text-sm mx-2">
        15% off
      </span>
      <span className="mx-2 text-sm sm:text-base md:text-lg">
        500+ When you Buy Online &amp; Pick up in-store
      </span>
    </div>
  );
}
