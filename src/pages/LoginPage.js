import React, { useState } from "react";
import LOGO_MAIN from "../assets/logo_main.svg";
import { FaArrowRight } from "react-icons/fa";
import { CiAlarmOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const LoginComponent = ({ setComponentPage }) => {
  return (
    <div className="animate__animated animate__bounceInUp">
      <div className="text-white text-center mt-5">
        <h4 className="fw-bold">ජංගම දුරකථනය ඇතුලත් කරන්න</h4>
        <input className="login-input mt-4" />
      </div>
      <div className="text-center mt-5">
        <button className="main-button" onClick={() => setComponentPage("otp")}>
          ඉදිරියට යන්න <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

const EnterInfoComponent = ({ setComponentPage }) => {
  const navigate = useNavigate();
    return (
      <div className="animate__animated animate__bounceInUp">
        <div className="text-white text-center mt-5">
          <h4 className="fw-bold">ඔබගේ නම ඇතුලත් කරන්න</h4>
          <input className="login-input mt-4" />
        </div>
        <div className="text-center mt-5">
          <button className="main-button" onClick={() => navigate("/home")}>
          ඇතුල්වන්න <FaArrowRight />
          </button>
        </div>
      </div>
    );
  };

const OTPComponent = ({ setComponentPage }) => {
  return (
    <div className="animate__animated animate__bounceInUp">
      <div className="text-white text-center mt-5">
        <h4 className="fw-bold">OTP අංකය ඇතුලත් කරන්න</h4>
        <div className="text-end mt-4 fs-5"><span><CiAlarmOn /> 15:00</span></div>
        <div className="d-flex gap-4 mt-4">
          <input className="login-input" />
          <input className="login-input" />
          <input className="login-input" />
          <input className="login-input" />
        </div>
      </div>
      <div className="text-white mt-4">
      *මෙම කෙටි පණිවිඩය විනාඩි 15කට වලංගු වේ
      </div>
      <div className="text-center mt-5">
        <button className="main-button" onClick={() => setComponentPage("info")}>
          ඉදිරියට යන්න <FaArrowRight />
        </button>
      </div>
    </div>
  );
};
function LoginPage() {
  const [componentPage, setComponentPage] = useState("login");
  return (
    <div className="container">
      <div className="text-center mt-5 animate__animated animate__bounceIn">
        <img src={LOGO_MAIN} className="splash-logo" />
      </div>
      {componentPage == "login" ? (
        <LoginComponent setComponentPage={setComponentPage} />
      ) : componentPage == "otp" ? (
        <OTPComponent setComponentPage={setComponentPage} />
      ) : (
        <EnterInfoComponent setComponentPage={setComponentPage} />
      )}
    </div>
  );
}

export default LoginPage;
