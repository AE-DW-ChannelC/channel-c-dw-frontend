import React, { useState } from "react";
import LOGO_MAIN from "../assets/logo_main.svg";
import PRO_PIC from "../assets/propic.png";
import FloatingNavbar from "../components/FloatingNavbar";
import GOLD from "../assets/gold.svg";
import MOTOR_BIKE from "../assets/motorbike.png";
import STAGE_ICON from "../assets/stage.svg";
import { MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function MyInfoPage() {
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  return !isEdit ? (
    <div className="container text-white text-center">
      <div className="text-center pt-3 animate__animated animate__bounceIn">
        <h5 className="text-white fw-bold">මගේ විස්තර</h5>
      </div>
      <div className="text-center mt-4">
        <img
          src={PRO_PIC}
          height={100}
          style={{ borderRadius: "50%", border: "4px white solid" }}
        />
      </div>
      <div className="mt-4">
        <h2>Hasintha Kavindu</h2>
      </div>
      <div className="mt-4">
        <button
          className="main-button"
          style={{ fontSize: "13px", padding: 16 }}
          onClick={() => setIsEdit(true)}
        >
          විස්තර වෙනස් කරන්න
        </button>
      </div>
      <div
        className="mt-3"
        style={{
          overflowY: "hidden",
          paddingBottom: "120px",
          paddingInline: "10px",
        }}
      >
        <div className="text-start">
          <div>දුරකථන අංකය</div>
          <input className="login-input mt-2" />
        </div>

        <div className="text-start mt-2">
          <div>වයස</div>
          <input className="login-input mt-2" />
        </div>
        <div className="mt-4">
          <button
            className="main-button"
            onClick={() => navigate("/")}
            style={{
              fontSize: "13px",
              padding: 16,
              backgroundColor: "#E35151",
              borderColor: "#4B1B1B",
            }}
          >
            Unsubscribe
          </button>
        </div>
      </div>
      <FloatingNavbar menu="info" />
    </div>
  ) : (
    <EditInfoPage setIsEdit={setIsEdit} />
  );
}

const EditInfoPage = ({ setIsEdit }) => {
  return (
    <div className="container text-white text-center">
      <div className="text-center pt-3 animate__animated animate__bounceIn">
        <h5 className="text-white fw-bold">මගේ විස්තර</h5>
      </div>
      <div className="text-center mt-4">
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={PRO_PIC}
            height={100}
            style={{
              borderRadius: "50%",
              border: "4px white solid",
            }}
            alt="Profile"
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "4px",
              paddingInline: "6px",
              border: "2px solid white",
              boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
              color: "balck",
            }}
          >
            <MdOutlineModeEdit style={{ color: "black", fontSize: "20px" }} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h2>Hasintha Kavindu</h2>
      </div>
      <div
        className="mt-3"
        style={{
          overflowY: "hidden",
          paddingBottom: "120px",
          paddingInline: "10px",
        }}
      >
        <div className="text-start">
          <div>සම්පූර්ණ නම</div>
          <input className="login-input mt-2" />
        </div>
        <div className="text-start mt-2">
          <div>දුරකථන අංකය</div>
          <input className="login-input mt-2" />
        </div>

        
        <div className="text-start mt-2">
          <div>වයස</div>
          <input className="login-input mt-2" />
        </div>
        <div className="mt-4">
          <button
            className="main-button"
            style={{ fontSize: "13px", padding: 16 }}
            onClick={() => setIsEdit(false)}
          >
            විස්තර වෙනස් කරන්න
          </button>
        </div>
      </div>
      <FloatingNavbar menu="info" />
    </div>
  );
};

export default MyInfoPage;
