import React, { useEffect, useState, useRef } from "react";
import logo from "../assets/AQualogo.png";
import searchIcon from "../assets/search.png";
import Wishlist from "../assets/wishlist.png";
import Cart from "../assets/fish.png";
import Login from "../assets/login.png";
import { useCart } from '../Constant/AddToCart.jsx'
import data from '../Data/ProductsData.jsx'
import { Link, useLocation } from "react-router-dom";
import TopHeader from "./Home/TopHeader.jsx";

export default function Header({ setQuery }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search filter
  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredResults([]);
    } else {
      const results = data.filter((item) =>
        item.title.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredResults(results);
    }
  }, [inputValue]);

  return (
    <div>
      {/* Show TopHeader only if not homepage */}
      {location.pathname !== "/" && <TopHeader />}

      <header
        className={`fixed w-full top-0 z-50 flex items-center justify-between px-4 md:px-8 lg:px-16 py-3 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-28 md:w-32" />
        </div>

        {/* Hamburger Button (Mobile) */}
        <div
          className="flex flex-col gap-1.5 cursor-pointer md:hidden"
          onClick={toggleMenu}
        >
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
        </div>

        {/* Navigation Links */}
        <nav
          ref={menuRef}
          className={`${
            menuOpen
              ? "flex flex-col absolute top-14 right-4 bg-black text-white rounded-lg shadow-lg p-4 space-y-3"
              : "hidden"
          } md:flex md:flex-row md:static md:bg-transparent md:shadow-none md:space-x-6 md:p-0`}
        >
          <Link
            to="/"
            className="font-semibold hover:text-orange-500"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/Shop"
            className="font-semibold hover:text-orange-500"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            to="/About"
            className="font-semibold hover:text-orange-500"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/Track"
            className="font-semibold hover:text-orange-500"
            onClick={() => setMenuOpen(false)}
          >
            Track
          </Link>
          <Link
            to="/Contact"
            className="font-semibold hover:text-orange-500"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>

        {/* Search Box */}
        <div className="hidden md:flex relative items-center">
          <input
            type="search"
            placeholder="Search Products"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setQuery(e.target.value);
            }}
            className={`w-64 lg:w-72 h-9 rounded-full px-3 border outline-none transition-all ${
              scrolled
                ? "bg-black text-white placeholder-white border-black"
                : "bg-white text-black border-gray-400"
            }`}
          />
          <button className="absolute right-0 bg-orange-500 w-10 h-9 rounded-full flex items-center justify-center">
            <img src={searchIcon} alt="Search" className="w-5" />
          </button>

          {/* Search Dropdown */}
          {filteredResults.length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-black text-white rounded-md max-h-48 overflow-y-auto shadow-lg z-50">
              {filteredResults.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 hover:text-black"
                  onClick={() => alert(`Selected: ${item.title}`)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Icons */}
        <div className="flex items-center gap-4 ml-4">
          <a href="#">
            <img
              src={Wishlist}
              alt="wishlist"
              className="w-8 md:w-10 rounded-full bg-white p-1"
            />
          </a>
          <a href="#" className="relative">
            <img src={Cart} alt="cart" className="w-8 md:w-10" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
              {cartItems.length}
            </span>
          </a>
          <a href="#">
            <img
              src={Login}
              alt="login"
              className="w-8 md:w-10 rounded-full bg-white p-1"
            />
          </a>
        </div>
      </header>
    </div>
  );
}
