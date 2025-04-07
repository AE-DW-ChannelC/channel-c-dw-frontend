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
const LoginComponent = ({ setComponentPage, setMobile }) => {
  const [mobile, setLocalMobile] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const validateMobile = () => {
    if (mobile.length !== 10 || !mobile.startsWith("07")) {
      setAlertMessage("දුරකථන අංකය වැරදියි. \n නැවත උත්සහ කරන්න");
      return false;
    }
    return true;
  };

  const login = () => {
    if (!validateMobile()) return;
    setMobile(mobile);
    setComponentPage("username");

  };

  return (
    <div className="animate__animated animate__bounceInUp">
      <div className="text-white text-center mt-5 mb-5">
        <h4 className="fw-bold">මොබයිල් නොම්බරය ඇතුලත් කරන්න</h4>
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
const EnterInfoComponent = ({ setLoading, setComponentPage, mobile, setTestOtp }) => {
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
      const response = await UserService.loginUser(mobile);
      TokenService.setUser(response);

      //it can be improve as a one login request that accept mobile and username as parameters.
      const userId = TokenService.getUserData().id;
      await UserService.updateUser(userId, { full_name: fullName });
      TokenService.updateFullName(fullName);

      setTestOtp(response?.data?.latest_otp)

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
const OTPComponent = ({ mobile, setUserDetail, setLoading, TestOtp, setTestOtp }) => {
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [otp, setOtp] = useState([]);
  const [isTimeOut, setIsTimeOut] = useState(false);

  const handleTimeOut = async () => {
    setIsTimeOut(true);
  }

  const requestOtpAgain = async () => {
    try {
      setLoading(true);
      const response = await UserService.loginUser(mobile);
      TokenService.setUser(response);
      setTestOtp(response?.data?.latest_otp)
      setIsTimeOut(false);
      
    }
    catch (error) {
      console.error(error);
      showErrorAlert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  const verifyOtp = async () => {
    const otpStr = inputRefs.current.map((input) => input.value).join("");


    try {
      setLoading(true);
      const response = await UserService.verifyOtp(mobile, otpStr);
      setUserDetail(response.data);
      window.location.reload();

    } catch (error) {
      console.error(error);
      setAlertMessage("OTP අංකය වැරදියි. නැවත උත්සහ කරන්න");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="animate__animated animate__bounceInUp">
      <div className="text-white text-center mt-5">
        <h4 className="fw-bold">OTP අංකය ඇතුලත් කරන්න</h4>
        <div className="text-end mt-4 fs-5">
          <span>
            <CiAlarmOn />{" "}
            <CountdownTimer initialSeconds={60} completed={handleTimeOut} />
          </span>
        </div>
        <p className="fw-bold" style={{ color: "black" }}>Please use this test OTP : {TestOtp}</p>
        <div className="d-flex gap-4 mt-4">
          {Array(4)
            .fill("")
            .map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                className="login-input"
                maxLength={1}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
      </div>
      <div className="text-white mt-4">
        *මෙම කෙටි අංකය තත්පර 60ක් සදහා වලංගු වේ.
      </div>
      <div className="validation-message text-center mt-2">{alertMessage}</div>
      {isTimeOut ?
        <div
          className="validation-message text-center mt-2 text-decoration-underline"
          style={{ cursor: 'pointer' }}
          onClick={requestOtpAgain}
        >
          OTP අංකය කල් ඉකුත් වී ඇත. නැවත උත්සහ කරන්න
        </div> : null}

      <div className={"text-center" + (alertMessage ? " mt-3" : " mt-5")}>
        <button className="main-button" disabled={isTimeOut} onClick={verifyOtp}>
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
  const [TestOtp, setTestOtp] = useState("")
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
          setTestOtp={setTestOtp}
        />
      ) : componentPage === "otp" ? (
        <OTPComponent
          setComponentPage={setComponentPage}
          mobile={mobile}
          TestOtp={TestOtp}
          setUserDetail={setUserDetail}
          setLoading={setLoading}
          setTestOtp={setTestOtp}
        />
      ) : componentPage === "username" ? (
        <EnterInfoComponent
          setLoading={setLoading}
          setComponentPage={setComponentPage}
          mobile={mobile}
          setTestOtp={setTestOtp}
        />
      ) : (
        <LoginComponent
          setComponentPage={setComponentPage}
          setMobile={setMobile}
          setLoading={setLoading}
          setTestOtp={setTestOtp}
        />
      )}
    </div>
  );
}

export default LoginPage;
