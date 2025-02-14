import React, { useState } from "react";
import LOGO_MAIN from "../assets/logo_main.svg";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SplashPage() {
  const navigate = useNavigate();
  return (
    <div className="container text-white text-center">
      <div className="text-center mt-4 animate__animated animate__bounceIn">
        <img
          src={LOGO_MAIN}
          className="splash-logo"
          style={{ height: "320px" }}
        />
      </div>
      <div className="mt-5 px-3">
        <h5>තරගයට පිවිසීමට පහත බොත්තම ඔබන්න</h5>
      </div>
      <div className="mt-4">
        <button className="main-button" style={{fontSize: '14px'}} onClick={() => navigate("login")}>
          ඉදිරියට යන්න <FaArrowRight />
        </button>
      </div>
      <p className="mt-4">* කොන්දේසි අදාල වේ.</p>
    </div>
  );
}

export default SplashPage;
