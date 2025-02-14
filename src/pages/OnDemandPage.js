import React, { useState } from "react";
import LOGO_MAIN from "../assets/logo_main.svg";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function OnDemandPage() {
  const navigate = useNavigate();
  return (
    <div className="container text-white text-center">
      <div className="text-center mt-4 animate__animated animate__bounceIn">
        <img
          src={LOGO_MAIN}
          className="splash-logo"
          style={{ height: "270px" }}
        />
      </div>
      <div className="mt-4 px-3">
        <h6>
          අද දිනයේ ඔබට ලැබී ඇති ප්‍රශ්න පහ අවසන්. අමතර ප්‍රශ්න සඳහා පිලිතුරු
          දීමට පහත බොත්තම ඔබන්න.
        </h6>
      </div>
      <div className="mt-4">
        <button
          className="main-button"
          style={{ fontSize: "14px" }}
          onClick={() => navigate("/questions")}
        >
          ඉදිරියට යන්න <FaArrowRight />
        </button>
      </div>
      <div
        className="text-decoration-underline mt-2"
        onClick={() => navigate("/home")}
      >
        ප්‍රදාන මෙනුව වෙත යන්න
      </div>
      <p className="mt-5" style={{ fontSize: "12px" }}>
        * කොන්දේසි අදාල වේ.
      </p>
      <div className="text-center text-white px-5" style={{ fontSize: "12px" }}>
        By continuing, I agree to{" "}
        <span className="fw-bold text-decoration-underline" onClick={() => navigate("/tc")}>
          Terms of Conditions
        </span>{" "}
        and{" "}
        <span className="fw-bold text-decoration-underline">
          Privacy of Policy
        </span>
      </div>
    </div>
  );
}

export default OnDemandPage;
