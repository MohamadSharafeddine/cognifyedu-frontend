import React, { useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo-bar.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  return (
    <nav className="navbar">
    </nav>
  );
};

export default Navbar;
