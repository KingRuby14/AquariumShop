import React from "react";
import logo from "../assets/AQualogo.png";
import Phone from "../assets/Phone.png";
import Instagram from "../assets/Instagram.png";
import Facebook from "../assets/Facebook.png";
import X from "../assets/X.png";
import Email from "../assets/Envelope.png";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-cyan-400 to-blue-700 text-white">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-evenly items-start lg:items-center gap-10 px-6 py-12">
        {/* First Column */}
        <div className="flex flex-col items-start space-y-5">
          <img src={logo} alt="Logo" className="w-36" />
          <p className="max-w-xs font-semibold text-sm">
            Your Online AquaShop store for friendly service and Trusted AquaShop
            Products
          </p>

          <div className="pt-4 space-y-3">
            <div className="flex items-center gap-3">
              <img src={Phone} alt="phone" className="w-8" />
              <span className="font-semibold">Helpline (24/7)</span>
            </div>
            <div className="font-bold">+91 9092264342</div>

            <div className="flex gap-3">
              <img src={Instagram} alt="Instagram" className="w-8 cursor-pointer" />
              <img src={Facebook} alt="Facebook" className="w-8 cursor-pointer" />
              <img src={X} alt="X" className="w-8 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="flex flex-col sm:flex-row gap-12">
          <div>
            <h3 className="font-bold text-lg mb-3">Useful Links</h3>
            <ul className="space-y-2">
              <li className="cursor-pointer">New Products</li>
              <li className="cursor-pointer">Best Seller</li>
              <li className="cursor-pointer">Bundles & Save</li>
              <li className="cursor-pointer">Online Gift Card</li>
              <li className="cursor-pointer">Discount</li>
              <li className="cursor-pointer">Store Locator</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">My Account</h3>
            <ul className="space-y-2">
              <li className="cursor-pointer">My Profile</li>
              <li className="cursor-pointer">My Order History</li>
              <li className="cursor-pointer">My Wish List</li>
              <li className="cursor-pointer">Order Tracking</li>
              <li className="cursor-pointer">Shipping Info</li>
              <li className="cursor-pointer">Shopping Cart</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Company</h3>
            <ul className="space-y-2">
              <li className="cursor-pointer">About Us</li>
              <li className="cursor-pointer">Careers</li>
              <li className="cursor-pointer">Blog</li>
              <li className="cursor-pointer">Contact Us</li>
              <li className="cursor-pointer">Gift Cards</li>
            </ul>
          </div>
        </div>

        {/* Third Column */}
        <div className="max-w-xs">
          <h3 className="font-bold text-lg mb-3">Newsletter</h3>
          <p className="text-xs mb-3">
            Subscribe & get 10% Discount. Get E-Mail Updates About our Latest
            Shop And Special Offers
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full py-2 px-4 rounded-full text-black outline-none"
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-2 bg-red-600 rounded-full p-2">
              <img src={Email} alt="email" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-dotted border-black mx-6" />

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 gap-3">
        <span className="font-medium">
          © 2025 Aqua Shop. All Rights Reserved
        </span>
        <div className="flex gap-5 items-center text-sm font-medium">
          <span className="cursor-pointer">Privacy & Cookie Policy</span>
          <span>|</span>
          <span className="cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
