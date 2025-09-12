// Header.jsx
import React, { useEffect, useState, useRef } from "react";
import logo from "../assets/AQualogo.png";
import searchIcon from "../assets/search.png";
import { useCart } from "../Constant/AddToCart.jsx";
import data from "../Data/ProductsData.jsx";
import { Link, useLocation } from "react-router-dom";
import TopHeader from "./Home/TopHeader.jsx";
import { FiShoppingBag } from "react-icons/fi";
import { RiHeartAddLine } from "react-icons/ri";
import { IoLogIn } from "react-icons/io5";
import AddToCartSidebar from "../Constant/AddToCartSidebar.jsx";
import WishlistSidebar from "../Constant/WishlistSidebar.jsx";
import { useWishlist } from "../Constant/Wishlist.jsx";

export default function Header({ setQuery }) {
  // main UI state
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // refs
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const cartButtonRef = useRef(null);
  const wishlistButtonRef = useRef(null);
  const searchDesktopRef = useRef(null);
  const searchMobileRef = useRef(null);

  const location = useLocation();
  const cartContext = useCart() || {};
  const cartItems = cartContext.cartItems ?? [];

  const [scrolled, setScrolled] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const wishlistContext = useWishlist() || {};
  const wishlistItems = wishlistContext.wishlistItems ?? [];

  // toggle helpers
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setCartOpen(false);
    setWishlistOpen(false);
  };
  const toggleCart = () => {
    setCartOpen((prev) => !prev);
    setMenuOpen(false);
    setWishlistOpen(false);
  };
  const toggleWishlist = () => {
    setWishlistOpen((prev) => !prev);
    setMenuOpen(false);
    setCartOpen(false);
  };

  // Debounced search
  useEffect(() => {
    const id = setTimeout(() => {
      if (!inputValue.trim()) {
        setFilteredResults([]);
        setShowResults(false);
      } else {
        const q = inputValue.toLowerCase();
        const results = data.filter((it) => it.title.toLowerCase().includes(q));
        setFilteredResults(results);
        setShowResults(true);
      }
    }, 250);
    return () => clearTimeout(id);
  }, [inputValue]);

  // scroll effects
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Document-level click
  useEffect(() => {
    const onDocClick = (e) => {
      const t = e.target;

      if (
        menuOpen &&
        !(menuRef.current?.contains(t) || menuButtonRef.current?.contains(t))
      ) {
        setMenuOpen(false);
      }
      if (
        showResults &&
        !(
          searchDesktopRef.current?.contains(t) ||
          searchMobileRef.current?.contains(t)
        )
      ) {
        setShowResults(false);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setCartOpen(false);
        setWishlistOpen(false);
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, cartOpen, wishlistOpen, showResults]);

  return (
    <div>
      {location.pathname !== "/" && <TopHeader />}

      {/* header */}
      <header
        className={`fixed w-full top-0 z-50 flex items-center justify-between px-3 md:px-8 lg:px-16 transition-all duration-300
        ${
          scrolled
            ? "bg-transparent shadow-md py-2 md:py-2.5"
            : "bg-transparent py-3 md:py-4"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-20 md:w-28 lg:w-32" />
        </div>

        {/* Mobile search */}
        <div
          ref={searchMobileRef}
          className="relative flex md:hidden items-center flex-1 mx-3"
        >
          <input
            type="search"
            placeholder="Search..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setQuery?.(e.target.value);
            }}
            onFocus={() => inputValue && setShowResults(true)}
            className="w-full h-8 rounded-full text-black px-3 border border-gray-300 outline-none text-sm"
          />
          <button className="absolute right-0 top-0 bg-orange-500 w-8 h-8 rounded-full flex items-center justify-center">
            <img src={searchIcon} alt="Search" className="w-6" />
          </button>

          {showResults && filteredResults.length > 0 && (
            <div className="absolute top-10 left-0 w-full bg-white text-black rounded-xl max-h-64 overflow-y-auto shadow-lg border z-50">
              {filteredResults.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    alert(`Selected: ${item.title}`);
                    setShowResults(false);
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                  <span className="font-medium text-sm">{item.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hamburger */}
        <button
          ref={menuButtonRef}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label="Open menu"
          className="flex flex-col gap-1.5 bg-blue-600 p-2 rounded-md cursor-pointer md:hidden"
        >
          <span className="w-6 h-0.5 bg-white" />
          <span className="w-6 h-0.5 bg-white" />
          <span className="w-6 h-0.5 bg-white" />
        </button>

        {/* desktop nav */}
        <nav className="hidden md:flex md:flex-row md:space-x-6">
          {["Home", "Shop", "About", "Track", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item}`}
              className="font-semibold md:text-sm lg:text-lg xl:text-xl text-black"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* desktop search */}
        <div
          ref={searchDesktopRef}
          className="hidden md:flex relative items-center ml-4"
        >
          <input
            type="search"
            placeholder="Search Products"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setQuery?.(e.target.value);
            }}
            onFocus={() => inputValue && setShowResults(true)}
            className={`w-40 sm:w-56 lg:w-72 h-9 rounded-full px-3 border outline-none transition-all
              ${
                scrolled
                  ? "bg-blue-600 text-white placeholder-white border-white"
                  : "bg-white text-black border-gray-400"
              }`}
          />
          <button className="absolute right-0 bg-orange-500 w-9 h-9 rounded-full flex items-center justify-center">
            <img src={searchIcon} alt="Search" className="w-5" />
          </button>

          {showResults && filteredResults.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white text-black rounded-xl max-h-64 overflow-y-auto shadow-lg border z-50">
              {filteredResults.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    alert(`Selected: ${item.title}`);
                    setShowResults(false);
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                  <span className="font-medium text-sm">{item.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* desktop icons */}
        <div
          className={`hidden md:flex items-center gap-6 text-2xl transition-colors 
            ${scrolled ? "text-white" : "text-white"}`}
        >
          <button
            ref={wishlistButtonRef}
            onClick={toggleWishlist}
            aria-expanded={wishlistOpen}
            className="relative cursor-pointer bg-orange-500 rounded-full p-3"
            title="Wishlist"
          >
            <RiHeartAddLine className="hover:text-red-600 text-white z-99" />
            {wishlistItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
                {wishlistItems.length}
              </span>
            )}
          </button>

          <button
            ref={cartButtonRef}
            onClick={toggleCart}
            aria-expanded={cartOpen}
            className="relative cursor-pointer bg-orange-500 rounded-full p-3"
            title="Cart"
          >
            <FiShoppingBag className="hover:text-red-600" />
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
              {cartItems.length}
            </span>
          </button>
          <button
            className="cursor-pointer hover:text-red-600 bg-orange-500 rounded-full p-3 "
            title="Login"
          >
            <IoLogIn className="hover:text-red-600 text-white z-99" />
          </button>
        </div>
      </header>

      {/* overlay */}
      {(menuOpen || cartOpen || wishlistOpen) && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => {
            setMenuOpen(false);
            setCartOpen(false);
            setWishlistOpen(false);
            setShowResults(false);
          }}
        />
      )}

      {/* mobile menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col items-start gap-6 mt-16 px-6 text-lg font-semibold text-blue-700">
          {["Home", "Shop", "About", "Track", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item}`}
              className="hover:text-black"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <AddToCartSidebar cartOpen={cartOpen} toggleCart={toggleCart} />

      {/* Wishlist Sidebar */}
      <WishlistSidebar
        wishlistOpen={wishlistOpen}
        toggleWishlist={toggleWishlist}
      />

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-md flex justify-around items-center py-3 md:hidden">
        <button
          className="relative w-8 h-8 flex items-center justify-center text-blue-600 hover:text-red-600"
          onClick={toggleWishlist}
          ref={wishlistButtonRef}
          aria-label="Open wishlist"
        >
          <RiHeartAddLine className="h-7 w-7" />
          {wishlistItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
              {wishlistItems.length}
            </span>
          )}
        </button>

        <button
          className="relative w-8 h-8 flex items-center justify-center text-blue-600 hover:text-red-600"
          onClick={toggleCart}
          ref={cartButtonRef}
          aria-label="Open cart"
        >
          <FiShoppingBag className="h-7 w-7" />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
            {cartItems.length}
          </span>
        </button>

        <IoLogIn className="w-7 h-7 cursor-pointer text-blue-600 hover:text-red-600" />
      </div>
    </div>
  );
}
