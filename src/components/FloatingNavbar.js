import React from "react";
import { FaHome, FaUser, FaTrophy } from "react-icons/fa";
import "./Component.css"
import { useNavigate } from "react-router-dom";

const FloatingNavbar = ({menu = 'menu'}) => {
  const navigate = useNavigate();
  return (
    <div className="floating-navbar " style={{cursor: 'pointer'}}>
      <div className={`nav-item ${menu == "menu" && "active"}`} onClick={() => navigate("/home")}>
        <FaHome size={24} />
        <p>ප්‍රධාන මෙනුව</p>
      </div>
      <div className={`nav-item ${menu == "place" && "active"}`} onClick={() => navigate("/place")}>
        <FaTrophy size={24} />
        <p>මගේ ස්ථානය</p>
      </div>
      <div className={`nav-item ${menu == "info" && "active"}`} onClick={() => navigate("/info")}>
        <FaUser size={24} />
        <p>මගේ විස්තර</p>
      </div>
    </div>
  );
};

export default FloatingNavbar;
