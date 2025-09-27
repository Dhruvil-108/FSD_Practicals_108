import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./assets/sidebar.css";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <Router>
      <div className="app-container">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className="main-content">
          <button className="menu-btn" onClick={toggleSidebar}>
            &#9776; Menu
          </button>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
