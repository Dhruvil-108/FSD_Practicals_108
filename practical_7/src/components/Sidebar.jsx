import { Link } from "react-router-dom";
import "../assets/sidebar.css";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <Link to="/" onClick={toggleSidebar}>Home</Link>
      <Link to="/about" onClick={toggleSidebar}>About</Link>
      <Link to="/contact" onClick={toggleSidebar}>Contact</Link>
    </div>
  );
}
