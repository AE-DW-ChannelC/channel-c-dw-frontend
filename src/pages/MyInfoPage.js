import React, { useRef, useState } from "react";
import FloatingNavbar from "../components/FloatingNavbar";
import { MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TokenService from "../services/token.service";
import { UserService } from "../services/user.service";
import LoadingFullscreen from "../components/LoadingFullscreen";
import NO_PIC from "../assets/no_pro.png";
import Swal from "sweetalert2";
function MyInfoPage() {
  const [isEdit, setIsEdit] = useState(false);
  const userData = TokenService.getUserData();
  const [loading, setLoading] = useState(false);

  const handleUnsubscribe = async () => {
    const isUserConfirmed = window.confirm("Are you sure you want to unsubscribe?");
    if (isUserConfirmed) {
      try {
        setLoading(true);
        const response = await UserService.unsubscribe(userData?.mobile);
        if (response.code === 100) {
          TokenService.removeUser();
          window.location.reload();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.message || "Something went wrong!",
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });

      }finally{
        setLoading(false);
      }
    }
  }

  const handleLogout = () => {
    const isUserConfirmed = window.confirm("Are you sure you want to logout?");
    if (isUserConfirmed) {
      TokenService.removeUser();
      window.location.reload();
    }
  }

  return !isEdit ? (
    
    <div className="container text-white text-center">
      <LoadingFullscreen loading={loading} />
      <div className="text-center pt-3 animate__animated animate__bounceIn">
        <h5 className="text-white fw-bold">මගේ විස්තර</h5>
      </div>
      <div className="text-center mt-4">
        <img
          src={userData?.profile_pic?.url || NO_PIC}
          height={100}
          style={{ borderRadius: "50%", border: "4px white solid" }}
        />
      </div>
      <div className="mt-4">
        <h2>{userData?.full_name}</h2>
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
          <input
            className="login-input mt-2"
            value={userData?.mobile || userData?.username}
            disabled
          />
        </div>

        <div className="text-start mt-2">
          <div>වයස</div>
          <input className="login-input mt-2" value={userData?.age} disabled />
        </div>
        <div className="mt-4">
          <button
            className="main-button"
            style={{
              fontSize: "16px",
              padding: 10,
              backgroundColor: "gray",
              borderColor: "#4B1B1B",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="mt-4">
          <button
            className="main-button"
            onClick={handleUnsubscribe}
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
  const userData = TokenService.getUserData();
  const [fullName, setfullName] = useState(userData?.full_name);
  const [age, setage] = useState(userData?.age);
  const [mobile, setmobile] = useState(userData?.mobile);
  const [loading, setloading] = useState(false);

  const fileInputRef = useRef(null);
  const [alertMessage, setAlertMessage] = useState("");

  const handleEditClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        // Process the selected file here
        handleUpload(file);
      } else {
        alert("Please select a valid JPG or PNG image.");
      }
    }
  };

  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("files", file);
      setloading(true);
      const uploadRespone = await UserService.uploadProfilePhoto(formData);
      const fileData = { profile_pic: uploadRespone[0]?.id };
      await UserService.updateUser(TokenService.getUserData().userid, fileData);
      TokenService.updateProfilePic(uploadRespone[0]);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setloading(false);
    }
  };

  const updateInfo = async () => {
    try {
      if (!fullName) {
        setAlertMessage("නම ඇතුලත් කරන්න");
        return;
      }

      if (!mobile) {
        setAlertMessage("දුරකථන අංකය ඇතුලත් කරන්න");
        return;
      }
      if (fullName.length < 3) {
        setAlertMessage("නම සියල්ලම 3 ට වඩා වැඩි විය යුතුය");
        return;
      }
      setAlertMessage("");
      setloading(true);
      const body = { full_name: fullName, age, mobile };
      await UserService.updateUser(TokenService.getUserData().userid, body);
      TokenService.updateFullName(fullName);
      TokenService.updateAge(age);
      TokenService.updateMobile(mobile);
      setIsEdit(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="container text-white text-center">
      <LoadingFullscreen loading={loading} message="Updating..." />
      <div className="text-center pt-3 animate__animated animate__bounceIn">
        <h5 className="text-white fw-bold">මගේ විස්තර</h5>
      </div>
      <div className="text-center mt-4">
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={userData?.profile_pic?.url || NO_PIC}
            height={100}
            width={100}
            style={{
              borderRadius: "50%",
              border: "4px white solid",
              objectFit: "cover",
            }}
            alt="Profile"
          />

          <div
            onClick={handleEditClick}
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
      <input
        type="file"
        accept=".jpg,.png"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className="mt-4">
        <h2>{userData?.full_name}</h2>
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
          <div>නම</div>
          <input
            className="login-input mt-2"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
          />
        </div>
        <div className="text-start mt-2">
          <div>දුරකථන අංකය</div>
          <input
            className="login-input mt-2 disabled"
            value={mobile}
            disabled
          />
        </div>

        <div className="text-start mt-2">
          <div>වයස</div>
          <input
            className="login-input mt-2"
            type="number"
            value={age}
            onChange={(e) => setage(e.target.value)}
          />
        </div>
        <div className="validation-message text-center mt-2">
          {alertMessage}
        </div>
        <div className="mt-4">
          <button
            className="main-button"
            style={{ fontSize: "13px", padding: 16 }}
            onClick={updateInfo}
          >
            විස්තර වෙනස් කරන්න
          </button>
        </div>
        <div className="mt-4">
          <button
            className="main-button"
            style={{
              fontSize: "16px",
              padding: 10,
              backgroundColor: "gray",
              borderColor: "#4B1B1B",
            }}
            onClick={() => setIsEdit(false)}
          >
            Cancel
          </button>
        </div>
      </div>
      <FloatingNavbar menu="info" />
    </div>
  );
};

export default MyInfoPage;
