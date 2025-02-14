import React, { useRef, useState } from "react";
import LOGO_MAIN from "../assets/logo_main.svg";
import { FaArrowRight } from "react-icons/fa";
import { CiAlarmOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/user.service";
import LoadingFullscreen from "../components/LoadingFullscreen";
import TokenService from "../services/token.service";
import CountdownTimer from "../components/CountDownTimer";
import Swal from "sweetalert2";

// Utility function to show error alerts
const showErrorAlert = (message) =>
  Swal.fire({ icon: "error", title: "Oops...", text: message });

/**
 * Login Component
 * Handles the mobile number input and navigates to OTP verification.
 */
const LoginComponent = ({ setComponentPage, setMobile, setLoading }) => {
  const [mobile, setLocalMobile] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const validateMobile = () => {
    if (mobile.length !== 10 || !mobile.startsWith("07")) {
      setAlertMessage("දුරකථන අංකය වැරදියි. \n නැවත උත්සහ කරන්න");
      return false;
    }
    return true;
  };

  const login = async () => {
    if (!validateMobile()) return;

    try {
      setLoading(true);
      await UserService.loginUser(mobile);
      setMobile(mobile);
      setComponentPage("otp");
    } catch (error) {
      console.error(error);
      showErrorAlert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate__animated animate__bounceInUp">
      <div className="text-white text-center mt-5 mb-5">
        <h4 className="fw-bold">ජංගම දුරකථනය ඇතුලත් කරන්න</h4>
        <input
          className="login-input mt-4"
          onChange={(e) => setLocalMobile(e.target.value)}
          value={mobile}
          placeholder="07xxxxxxxx"
        />
        <div className="validation-message mt-2">{alertMessage}</div>
      </div>
      <div className="text-center">
        <button className="main-button" onClick={login}>
          ඉදිරියට යන්න <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

/**
 * Enter Info Component
 * Handles user full name input and submission.
 */
const EnterInfoComponent = ({ setLoading }) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const validateName = () => {
    if (!fullName || fullName.length < 3) {
      setAlertMessage("නම සියල්ලම 3 ට වඩා වැඩි විය යුතුය");
      return false;
    }
    return true;
  };

  const submitName = async () => {
    if (!validateName()) return;

    try {
      setLoading(true);
      const userId = TokenService.getUserData().userid;
      await UserService.updateUser(userId, { full_name: fullName });
      TokenService.updateFullName(fullName);
      navigate("/home");
      window.location.reload();
    } catch (error) {
      console.error(error);
      showErrorAlert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate__animated animate__bounceInUp">
      <div className="text-white text-center mt-5">
        <h4 className="fw-bold">ඔබගේ නම ඇතුලත් කරන්න</h4>
        <input
          className="login-input mt-4"
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
        />
      </div>
      <div className="validation-message text-center mt-2">{alertMessage}</div>
      <div className="text-center mt-5">
        <button className="main-button" onClick={submitName}>
          ඇතුල්වන්න <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

/**
 * OTP Component
 * Handles OTP input and verification.
 */
const OTPComponent = ({ setComponentPage, mobile, setUserDetail, setLoading }) => {
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");

  const verifyOtp = async () => {
    const otp = inputRefs.current.map((input) => input.value).join("");

    try {
      setLoading(true);
      const response = await UserService.verifyOtp(mobile, otp);
      setUserDetail(response.data);

      if (response.first_time) {
        setComponentPage("info");
      } else {
        navigate("/home");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      setAlertMessage("OTP අංකය වැරදියි. නැවත උත්සහ කරන්න");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate__animated animate__bounceInUp">
      <div className="text-white text-center mt-5">
        <h4 className="fw-bold">OTP අංකය ඇතුලත් කරන්න</h4>
        <div className="text-end mt-4 fs-5">
          <span>
            <CiAlarmOn />{" "}
            <CountdownTimer initialSeconds={120} completed={() => console.log("")} />
          </span>
        </div>
        <div className="d-flex gap-4 mt-4">
          {Array(4)
            .fill("")
            .map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                className="login-input"
                maxLength={1}
                onChange={(e) => /^[0-9]?$/.test(e.target.value) || (e.target.value = "")}
              />
            ))}
        </div>
      </div>
      <div className="text-white mt-4">
        *මෙම කෙටි පණිවිඩය විනාඩි 15කට වලංගු වේ
      </div>
      <div className="validation-message text-center mt-2">{alertMessage}</div>
      <div className={"text-center" + (alertMessage ? " mt-3" : " mt-5")}>
        <button className="main-button" onClick={verifyOtp}>
          ඉදිරියට යන්න <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

/**
 * Main Login Page
 */
function LoginPage() {
  const [componentPage, setComponentPage] = useState("login");
  const [mobile, setMobile] = useState(null);
  const [userData, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="container">
      <LoadingFullscreen loading={loading} />
      <div className="text-center mt-5 animate__animated animate__bounceIn">
        <img src={LOGO_MAIN} className="splash-logo" />
      </div>
      {componentPage === "login" ? (
        <LoginComponent
          setComponentPage={setComponentPage}
          setMobile={setMobile}
          setLoading={setLoading}
        />
      ) : componentPage === "otp" ? (
        <OTPComponent
          setComponentPage={setComponentPage}
          mobile={mobile}
          setUserDetail={setUserDetail}
          setLoading={setLoading}
        />
      ) : (
        <EnterInfoComponent setLoading={setLoading} />
      )}
    </div>
  );
}

export default LoginPage;
