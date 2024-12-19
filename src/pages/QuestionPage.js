import React, { useState } from "react";
import LOGO_MAIN from "../assets/logo_main.svg";
import PRO_PIC from "../assets/propic.png";
import FloatingNavbar from "../components/FloatingNavbar";
import POINT_ICON from "../assets/point.svg";
import MOTOR_BIKE from "../assets/motorbike.png";
import { FaPause } from "react-icons/fa";
import { CiAlarmOn } from "react-icons/ci";
import { IoAlarmOutline } from "react-icons/io5";
import Lottie from "react-lottie-player";
import SUCCESS from "../assets/sucess - animation.json";
import FAILED from "../assets/failed - animation.json";
import { useNavigate } from "react-router-dom";

function QuestionPage() {
  const [screen, setScreen] = useState("question");
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const navigate = useNavigate();
  return screen == "question" ? (
    <>
      <div
        style={{ backgroundColor: "#1B98A4" }}
        className="text-center text-white p-2 "
      >
        <div>01 of 05</div>
      </div>
      <div className="container">
        <div
          className="text-center text-white mt-4"
          style={{ overflowY: "no" }}
        >
          <div style={{fontSize: '12px'}}>ඔබ මෙතෙක් ලබාගත් ලකුණු ප්‍රමාණය</div>
          <div className="d-flex justify-content-center">
            <div
              className="mt-2"
              style={{
                backgroundColor: "#1B98A4",
                width: "200px",
                textAlign: "center",
                borderRadius: "15px",
                padding: "3px",
                fontWeight: "bold",
              }}
            >
              0
            </div>
          </div>
          <h3 className="mt-3">ශ්‍රී ලංකාවේ මුල් නම කුමක්ද?</h3>

          <div className="d-flex justify-content-between gap-5 mt-4 px-2">
            <div style={{ fontSize: "11px", textAlign: "start" }}>
              ප්‍රශ්ණයට පිළිඹුරු දීමට ඔබට ඇත්තේ තවත් තත්පර
            </div>
            <div
              style={{
                fontSize: "15px",
                backgroundColor: "red",
                padding: "2px",
                width: "130px",
                borderRadius: "5px",
                paddingInline: "16px",
                fontWeight: "bold",
              }}
            >
              <IoAlarmOutline /> <span className="mt-1">00:12</span>
            </div>
          </div>
          <div className="mt-4">
            <div className={`d-flex justify-content-start gap-3 answer-item mb-3 ${selectedAnswer == "A" && 'active'}`} onClick={()=> setSelectedAnswer("A")}>
              <div className={`answer-no ${selectedAnswer == "A" && 'active'}`}>A</div>
              <div className="pt-1">Ceylon</div>
            </div>
            <div className={`d-flex justify-content-start gap-3 answer-item mb-3 ${selectedAnswer == "B" && 'active'}`} onClick={()=> setSelectedAnswer("B")}>
              <div className={`answer-no ${selectedAnswer == "B" && 'active'}`}>B</div>
              <div className="pt-1">Ceylon</div>
            </div>
            <div className={`d-flex justify-content-start gap-3 answer-item mb-3 ${selectedAnswer == "C" && 'active'}`} onClick={()=> setSelectedAnswer("C")}>
              <div className={`answer-no ${selectedAnswer == "C" && 'active'}`}>C</div>
              <div className="pt-1">Ceylon</div>
            </div>
            <div className={`d-flex justify-content-start gap-3 answer-item mb-3 ${selectedAnswer == "D" && 'active'}`} onClick={()=> setSelectedAnswer("D")}>
              <div className={`answer-no ${selectedAnswer == "D" && 'active'}`}>D</div>
              <div className="pt-1">Ceylon</div>
            </div>
          </div>
          <div className="mt-4">
            <button
              className="main-button"
              style={{ padding: "10px", fontSize: "14px" }}
              onClick={() => setScreen("success")}
            >
              පිළිතුර පරීක්ෂා කරන්න
            </button>
          </div>
        </div>
      </div>
    </>
  ) : screen == "success" ? (
    <SuccessScreen setScreen={setScreen} />
  ) : (
    <FailedScreen setScreen={setScreen} />
  );
}

const SuccessScreen = ({ setScreen }) => {
  const navigate = useNavigate();
  return (
    <div className="container text-center text-white ">
        <div className="mt-5 fw-bold">
      අපේ ඔබේ උණුසුම් සුභ පැතුම්..!
      </div>
      <div className="text-center d-flex justify-content-center">
        <Lottie
          loop={false}
          animationData={SUCCESS}
          play
          style={{ width: 250, height: 250, textAlign: "center" }}
        />
      </div>
      <h4 className="fw-bold">නිවැරදි පිළිතුරකි</h4>
      <p>ඒ වෙනුවෙන් ඔබ දිනාගත් ලකුණු ප්‍රමාණය</p>
      <h1>10</h1>
      <div>
        <button
          className="main-button mt-4"
          style={{ padding: "10px", fontSize: "14px" }}
          onClick={() => navigate("/on-demand")}
        >
          ඊළඟ ප්‍රශ්නයට යන්න
        </button>
      </div>
   
      <div className="text-center text-white px-5 mt-4" style={{fontSize: '12px'}}>
        By continuing, I agree to <span className="fw-bold text-decoration-underline" onClick={() => navigate("/tc")}>Terms of Conditions</span> and <span className="fw-bold text-decoration-underline">Privacy of Policy</span>
        </div>
    </div>
  );
};

const FailedScreen = ({ setScreen }) => {
  return (
    <div className="container text-center text-white">
      <div className="text-center d-flex justify-content-center mt-5">
        <Lottie
          loop={false}
          animationData={FAILED}
          play
          style={{ width: 250, height: 250, textAlign: "center" }}
        />
      </div>
      <h4 className="fw-bold">වැරදි පිළිතුරකි</h4>
      <p className="px-4">ඊලඟ ප්‍රශ්නය සඳහා නිවැරදි පිලිතුරු ලබා දීමට උත්සහ කරන්න</p>

      <div>
        <button
          className="main-button mt-4"
          style={{ padding: "10px", fontSize: "14px" }}
          onClick={() => setScreen("question")}
        >
          ඊළඟ ප්‍රශ්නයට යන්න
        </button>
      </div>
      <div className="text-center d-flex justify-content-center mt-4">
        <div
          style={{
            fontSize: "15px",
            backgroundColor: "red",
            padding: "2px",
            width: "100px",
            borderRadius: "5px",
            paddingInline: "16px",
            fontWeight: "bold",
          }}
        >
          <IoAlarmOutline /> 00:12
        </div>
      </div>
      <div className="text-center text-white px-5 mt-4" style={{fontSize: '12px'}}>
        By continuing, I agree to <span className="fw-bold text-decoration-underline" >Terms of Conditions</span> and <span className="fw-bold text-decoration-underline">Privacy of Policy</span>
        </div>
    </div>
  );
};

export default QuestionPage;
