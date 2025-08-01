import React, { useRef, useState } from "react";
import LOGO_MAIN from "../assets/logo_main.svg";
import { FaSyncAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { CiAlarmOn } from "react-icons/ci";
import { UserService } from "../services/user.service";
import LoadingFullscreen from "../components/LoadingFullscreen";
import TokenService from "../services/token.service";
import OtpCountDown from "../components/OtpCountDown";
import Swal from "sweetalert2";


// Utility function to show error alerts
const showErrorAlert = (message) =>
  Swal.fire({ icon: "error", title: "Oops...", text: message });

/**
 * Login Component
 * Handles the mobile number input and navigates to OTP verification.
 */
const LoginComponent = ({ setComponentPage, setMobile, setLoading, setTestOtp, setUserDetail }) => {
  const [mobile, setLocalMobile] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const CHARGE_AMOUNT_PREPAID = process.env.CHARGE_AMOUNT_PREPAID || 6;
  const CHARGE_AMOUNT_POSTPAID = process.env.CHARGE_AMOUNT_POSTPAID || 180;

  const phoneRegex = /^07[0-8]\d{7}$/;

  const validateMobile = () => {
    const isValidMobile = phoneRegex.test(mobile);
    if (!isValidMobile) {
      setAlertMessage("දුරකථන අංකය වැරදියි. \n නැවත උත්සහ කරන්න");
      return false;
    }
    return true;
  };

  const login = async () => {
    if (!validateMobile()) return;

    try {
      setLoading(true);
      const response = await UserService.loginUser(mobile);

      if (response.code !== 100 && response.code !== 200) {
        showErrorAlert(response.message || "Something went wrong!");
        setLoading(false);
        return;
      }

      if (response.code === 200) {
        console.log("User already exists." + response.code);
        setUserDetail(response.data);
        TokenService.setUser(response);
        window.location.reload();
        return;
      }

      TokenService.setUser(response);
      setMobile(mobile);
      setTestOtp(response?.data?.latest_otp)
      const isFirstTime = response?.firstTimeLogin
      if (isFirstTime == true) {
        setComponentPage("username");
      }
      else {
        setComponentPage("otp");
      }

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
        <h4 className="fw-bold">මොබයිල් නොම්බරය ඇතුලත් කරන්න</h4>
        <input
          className="login-input mt-4"
          onChange={(e) => setLocalMobile(e.target.value)}
          value={mobile}
          inputMode="numeric"
          placeholder="07xxxxxxxx"
        />
        <div className="validation-message mt-2">{alertMessage}</div>
      </div>
      <div style={{
        textAlign : "center",
        color: "white",
        fontSize: "small"
      }}>
       
        <p className="mb-4">
          ලියාපදිංචි ගාස්තු<br/>
          {`පෙරගෙවුම් : දිනකට රු.${CHARGE_AMOUNT_PREPAID}+ අදාළ බදු අයවේ.`}<br />
          {`පසුගෙවුම් : මසකට රු.${CHARGE_AMOUNT_POSTPAID}+ අදාළ බදු අයවේ.`}
        </p>
        <button className="main-button mb-4" onClick={login}>
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
const EnterInfoComponent = ({ setLoading, setComponentPage }) => {
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
      const userId = TokenService.getUserData().id;
      await UserService.updateUser(userId, { full_name: fullName });
      TokenService.updateFullName(fullName);
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
  const [alertMessage, setAlertMessage] = useState("");
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [isNewUser, setIsNewUser] = useState(TokenService.isNewUser());

  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));

  const userData = TokenService.getUserData();

  const handleTimeOut = async () => {
    setIsTimeOut(true);
    for (let i = 0; i < OTP_LENGTH; i++) {
      inputRefs.current[i].value = "";
    }
    inputRefs.current[0].focus();
  }

  const requestOtpAgain = async () => {
    try {
      setLoading(true);
      const response = await UserService.loginUser(mobile);
      TokenService.setUser(response);
      setTestOtp(response?.data?.latest_otp)
      setIsTimeOut(false);
      setSeconds(60);
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
      if (response.code === 100) {
        setUserDetail(response.data);
        window.location.reload();
      } else {
        setAlertMessage(response.message || "Something went wrong!");
        return;
      }
    } catch (error) {
      console.error(error);
      setAlertMessage("OTP අංකය වැරදියි. නැවත උත්සහ කරන්න");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      // If current input is empty, move focus to previous
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }

      // Clear current input from state
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }

    // Prevent typing non-numeric keys
    if (!['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key) && !/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };

  return (
    <div className="animate__animated animate__bounceInUp">
      <div className="text-white text-center mt-5">
        {!isNewUser && <h5>Hi, {getGreeting()} {userData?.full_name}! <br /> Welcome Back!</h5>}
        <h4 className="fw-bold">OTP අංකය ඇතුලත් කරන්න</h4>
        <div className="text-end mt-4 fs-5">
          <span>
            <CiAlarmOn />{" "}
            <OtpCountDown seconds={seconds} setSeconds={setSeconds} completed={handleTimeOut} />
          </span>
        </div>
        {/* <p className="fw-bold" style={{ color: "black" }}>Please use this test OTP : {TestOtp}</p> */}
        <div className="d-flex gap-2 mt-4">
          {Array(OTP_LENGTH)
            .fill("")
            .map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                className="otp-input"
                inputMode="numeric"
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

      <div className={"text-center" + (alertMessage ? " mt-3" : " mt-5")}>
        <button className={`main-button ${isTimeOut && "disabled"}`} onClick={verifyOtp}>
          ඉදිරියට යන්න <FaArrowRight />
        </button>
      </div>
      <div className={"text-center mt-4"}>
        <button className={`btn-otp-resend  ${!isTimeOut && "disabled"}`} onClick={requestOtpAgain}>
          <FaSyncAlt /> නැවත උත්සහ කරන්න

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
          setUserDetail={setUserDetail}
        />
      ) : componentPage === "otp" ? (
        <OTPComponent
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
