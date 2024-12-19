import React from "react";
import LOGO_MAIN from "../assets/logo_main.svg";
import PRO_PIC from "../assets/propic.png";
import NO_PIC from "../assets/no_pro.png";
import FloatingNavbar from "../components/FloatingNavbar";
import POINT_ICON from "../assets/point.svg";
import MOTOR_BIKE from "../assets/motorbike.png";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="text-center pt-3 animate__animated animate__bounceIn">
        <img src={LOGO_MAIN} height={70} />
      </div>
      <div style={{ overflowY: "hidden", paddingBottom: '130px' }}>
        <div className="dashboard-main mt-4 text-start">
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="fw-bold">සුභ දවසක්</h4>
              <h5>Hasintha</h5>
              <p>දැනුමයි වාසනවායි තරඟයට ඔබ සාරෙන් පිලිගන්නවා...</p>
              <p className="text-white">සුභ පැතුම්...!</p>
            </div>
            <div>
              <img src={PRO_PIC} height={80} style={{ borderRadius: "50%" }} />
            </div>
          </div>
          <div className="text-center">
            <div>ඔබ දැනට ලබාගෙන ඇති ලකුණු ප්‍රමාණය</div>
            <div className="d-flex justify-content-center gap-2 fw-bold mt-2">
              <img src={POINT_ICON} height={20} /> 400
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <button
            className="main-button"
            style={{ fontSize: "13px", padding: 16, borderColor: '#AA0077' }}
            onClick={() => navigate("/tc?btn=true")}
          >
            දැන් ප්‍රශ්න වලට උත්තර සපයන්න
          </button>
        </div>
        <div className="text-white mt-4">
          <h5 className="fw-bold">පසුගිය මාසයේ ජයග්‍රහකයෝ</h5>
          <div className="leaderboard-dash mt-3" style={{maxHeight: "400px", overflowY: 'auto'}}>
            <div className="d-flex justify-content-between px-2 mb-4">
              <div className="d-flex justify-content-start gap-3">
                <img
                  src={PRO_PIC}
                  height={65}
                  style={{ borderRadius: "50%", border: "6px solid white" }}
                />
                <div className="text-start">
                  <div className="fw-bold">Hasintha Dol</div>
                  <div>November</div>
                  <div>Motor Bike</div>
                </div>
              </div>
              <div>
                <img src={MOTOR_BIKE} height={45} />
              </div>
            </div>
            <div className="d-flex justify-content-between px-2 mb-4">
              <div className="d-flex justify-content-start gap-3">
                <img
                  src={NO_PIC}
                  height={65}
                  style={{ borderRadius: "50%", border: "6px solid white" }}
                />
                <div className="text-start">
                  <div className="fw-bold">Hasintha Dol</div>
                  <div>November</div>
                  <div>Motor Bike</div>
                </div>
              </div>
              <div>
                <img src={MOTOR_BIKE} height={45} />
              </div>
            </div>
            <div className="d-flex justify-content-between px-2 mb-4">
              <div className="d-flex justify-content-start gap-3">
                <img
                  src={PRO_PIC}
                  height={65}
                  style={{ borderRadius: "50%", border: "6px solid white" }}
                />
                <div className="text-start">
                  <div className="fw-bold">Hasintha Dol</div>
                  <div>November</div>
                  <div>Motor Bike</div>
                </div>
              </div>
              <div>
                <img src={MOTOR_BIKE} height={45} />
              </div>
            </div>
            <div className="d-flex justify-content-between px-2 mb-4">
              <div className="d-flex justify-content-start gap-3">
                <img
                  src={NO_PIC}
                  height={65}
                  style={{ borderRadius: "50%", border: "6px solid white" }}
                />
                <div className="text-start">
                  <div className="fw-bold">Hasintha Dol</div>
                  <div>November</div>
                  <div>Motor Bike</div>
                </div>
              </div>
              <div>
                <img src={MOTOR_BIKE} height={45} />
              </div>
            </div>
            <div className="d-flex justify-content-between px-2 mb-4">
              <div className="d-flex justify-content-start gap-3">
                <img
                  src={NO_PIC}
                  height={65}
                  style={{ borderRadius: "50%", border: "6px solid white" }}
                />
                <div className="text-start">
                  <div className="fw-bold">Hasintha Dol</div>
                  <div>November</div>
                  <div>Motor Bike</div>
                </div>
              </div>
              <div>
                <img src={MOTOR_BIKE} height={45} />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <button
            className="main-button"
            style={{ fontSize: "13px", padding: 16 }}
            onClick={() => navigate("/faq")}
          >
            තරග විස්තර දැන ගැනීමට පිවිසෙන්න
          </button>
        </div>
        <div className="text-center text-white px-5 mt-4" style={{fontSize: '12px'}}>
        By continuing, I agree to <span className="fw-bold text-decoration-underline" onClick={() => navigate("/tc")}>Terms of Conditions</span> and <span className="fw-bold text-decoration-underline">Privacy of Policy</span>
        </div>
      </div>
      <FloatingNavbar menu="menu" />
    </div>
  );
}

export default MainPage;
