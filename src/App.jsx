import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Shop from "./Pages/Shop.jsx";
import Wishlist from "./Pages/WishList.jsx";
import Contact from "./Pages/Contact.jsx";
import FAQ from "./Pages/FAQ.jsx";
import Wrong from "./Pages/Wrong404.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/Wrong" element={<Wrong />} />
        <Route path="/Wishlist" element={<Wishlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
