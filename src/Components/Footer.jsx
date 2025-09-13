import React from "react";
import { FaGithub, FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import logo from "../assets/AQualogo.png";
import { HiOutlineMail } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-cyan-400 to-blue-700 text-white w-full h-auto ">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row justify-between gap-10">
        {/* Branding */}
        <div className="flex flex-col items-start space-y-5">
          <img src={logo} alt="Logo" className="w-32 sm:w-36" />
          <p className="text-sm sm:text-base font-medium max-w-xs">
            Your Online AquaShop for Trusted Products and Friendly Service
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-2 text-xl">
            <a href="https://github.com/KingRuby14" target="_blank">
                <FaGithub className="h-5 w-5 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/selva-pandi-489981213/"
                target="_blank"
              >
                <FaLinkedinIn className="h-5 w-5 text-white" />
              </a>
              <a
                href="https://www.instagram.com/avlesidnapwebdev/"
                target="_blank"
              >
                <FaInstagram className="h-5 w-5 text-white" />
              </a>
              <a href="https://www.facebook.com/avlesidnap" target="_blank">
                <FaFacebookF className="h-5 w-5 text-white" />
              </a>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-12">
          <div>
            <h3 className="font-bold text-lg mb-3">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li >New Products</li>
              <li >Best Seller</li>
              <li >Bundles & Save</li>
              <li >Gift Cards</li>
              <li >Discounts</li>
              <li >Store Locator</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">My Account</h3>
            <ul className="space-y-2 text-sm">
              <li >My Profile</li>
              <li >Order History</li>
              <li >Wish List</li>
              <li >Order Tracking</li>
              <li >Shipping Info</li>
              <li >Shopping Cart</li>
            </ul>
          </div>

          
        </div>

        {/* Newsletter */}
        <div className="max-w-xs w-full">
          <h3 className="font-bold text-lg mb-3">Newsletter</h3>
          <p className="text-sm mb-3">
            Subscribe & get 10% off. Receive updates on latest products & offers.
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full py-2 px-4 rounded-full text-black outline-none"
            />
            <button className="absolute top-5 -translate-y-1/2 right-1 bg-blue-600 rounded-full p-2 hover:bg-red-700 transition">
              <HiOutlineMail className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-dotted border-white/50 mx-6" />

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-10 gap-3 text-sm">
        <span>© 2025 Aqua Shop. All Rights Reserved</span>
        <div className="flex gap-5 items-center">
          <span >Privacy & Cookie Policy</span>
          <span>|</span>
          <span >Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
