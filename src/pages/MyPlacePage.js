import React, { useState } from "react";
import LOGO_MAIN from "../assets/logo_main.svg";
import PRO_PIC from "../assets/propic.png";
import FloatingNavbar from "../components/FloatingNavbar";
import GOLD from "../assets/gold.svg";
import MOTOR_BIKE from "../assets/motorbike.png";
import STAGE_ICON from "../assets/stage.svg";

function MyPlacePage() {
  const [progress, setProgress] = useState(60)
  return (
    <div className="container">
      <div className="text-center pt-3 animate__animated animate__bounceIn">
        <h5 className="text-white fw-bold">මගේ ස්ථානය</h5>
      </div>
      <div
        style={{
          overflowY: "hidden",
          paddingBottom: "120px",
          marginTop: "80px",
        }}
      >
        {/* <div className="stage text-center mt-5">
          <img src={STAGE_ICON} style={{ width: "100%" }} />
        </div> */}

        <div className="podium-container ">
          <img
            src={STAGE_ICON}
            alt="Podium Stage"
            className="podium-bg animate__animated animate__fadeInUp"
          />

          <div className="winner winner-1 ">
            <img
              src={PRO_PIC}
              alt="Winner 1"
              className="profile-pic animate__animated animate__bounceIn animate__delay-2s"
            />
            <div className="crown animate__animated animate__bounceIn  animate__delay-2s">
              👑
            </div>
            <p className="winner-name animate__animated animate__bounceIn  animate__delay-2s">
              Rasya
            </p>
          </div>

          <div className="winner winner-2">
            <img
              src={PRO_PIC}
              alt="Winner 2"
              className="profile-pic animate__animated animate__bounceIn animate__delay-1s"
            />
            <p className="winner-name animate__animated animate__bounceIn animate__delay-1s">
              Janani
            </p>
          </div>

          <div className="winner winner-3">
            <img
              src={PRO_PIC}
              alt="Winner 3"
              className="profile-pic animate__animated animate__bounceIn"
            />
            <p className="winner-name animate__animated animate__bounceIn">
              Hasintha
            </p>
          </div>
        </div>
        <div
          className="leaderboard-self text-white animate__animated animate__fadeIn"
          style={{ zIndex: 100 }}
        >
          <h6 className="fw-bold text-start">මගේ ස්ථානය</h6>
          <div className="text-end" style={{ width: `${progress + 3}%` }}>
            <img src={GOLD} height={25} />
          </div>
          <div className="progress-container mt-1">
            <div className="progress-filler" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="leaderboard-self-profile-item d-flex justify-content-between px-2 mt-3">
            <div className="d-flex justify-content-start gap-3">
              <h4 className="pt-3">5</h4>
              <img
                src={PRO_PIC}
                height={55}
                style={{ borderRadius: "50%", border: "6px solid white" }}
              />
              <div className="text-start">
                <div className="fw-bold">Hasintha Dol</div>
                <div>November</div>
              </div>
            </div>
            <div>
              <img src={GOLD} height={45} />
            </div>
          </div>
        </div>
      </div>
      <FloatingNavbar menu="place" />
    </div>
  );
}

export default MyPlacePage;
