import React, { useEffect, useState } from "react";
import LOGO_MAIN from "../assets/logo_main.svg";
import NO_PIC from "../assets/no_pro.png";
import FloatingNavbar from "../components/FloatingNavbar";
import POINT_ICON from "../assets/point.svg";
import { useNavigate } from "react-router-dom";
import TokenService from "../services/token.service";
import { CampaignService } from "../services/campaign.service";
import { LeaderboardService } from "../services/leaderboard.service";
import NO_IMAGE from "../assets/No_Image_Available.jpg";
import { capitalizeFirstLetter, truncateString } from "../common/common";
import LoadingFullscreen from "../components/LoadingFullscreen";
import Swal from "sweetalert2";

function MainPage() {
  const navigate = useNavigate();
  const userData = TokenService.getUserData();

  const [campaign, setCampaign] = useState(null);
  const [prevWinners, setPrevWinners] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCampaignDetails();
    fetchWinners();
  }, []);

  useEffect(() => {
    if (campaign) fetchUserLeaderBoard();
  }, [campaign]);

  // Utility function for error alerts
  const showErrorAlert = (message = "Something went wrong!") => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
  };

  // Fetch campaign details
  const fetchCampaignDetails = async () => {
    setLoading(true);
    try {
      const response = await CampaignService.getCampaigns();
      const [currentCampaign] = response.data;
      setCampaign(currentCampaign);
      TokenService.updateCampaignData(currentCampaign);
    } catch (error) {
      console.error(error);
      showErrorAlert();
    } finally {
      setLoading(false);
    }
  };

  // Fetch leaderboard data
  const fetchUserLeaderBoard = async () => {
    setLoading(true);
    try {
      const response = await LeaderboardService.getUserCampaignLeaderboard(
        userData?.userid,
        campaign?.id
      );
      TokenService.updateLeaderboardData(response.data[0]);
    } catch (error) {
      console.error(error);
      showErrorAlert();
    } finally {
      setLoading(false);
    }
  };

  // Fetch previous winners
  const fetchWinners = async () => {
    setLoading(true);
    try {
      const response = await CampaignService.getWinners();
      setPrevWinners(response.data);
    } catch (error) {
      console.error(error);
      showErrorAlert();
    } finally {
      setLoading(false);
    }
  };

  // Style variables for reuse
  const avatarStyle = { borderRadius: "50%", objectFit: "cover" };
  const giftStyle = { borderRadius: 10, objectFit: "cover" };

  return (
    <div className="container">
      <LoadingFullscreen loading={loading} />

      {/* Logo Section */}
      <div className="text-center pt-3 animate__animated animate__bounceIn">
        <img src={LOGO_MAIN} alt="Main Logo" height={70} />
      </div>

      <div style={{ overflowY: "hidden", paddingBottom: "130px" }}>
        {/* Dashboard Header */}
        <div className="dashboard-main mt-4 text-start">
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="fw-bold">සුභ දවසක්</h4>
              <h5>{truncateString(userData?.full_name, 20)}</h5>
              <p>දැනුමයි වාසනවායි තරඟයට ඔබ සාරෙන් පිලිගන්නවා...</p>
              <p className="text-white">සුභ පැතුම්...!</p>
            </div>
            <div>
              <img
                src={userData?.profile_pic?.url || NO_PIC}
                alt="Profile"
                height={80}
                width={80}
                style={avatarStyle}
              />
            </div>
          </div>

          {/* Points Display */}
          <div className="text-center">
            <div>ඔබ දැනට ලබාගෙන ඇති ලකුණු ප්‍රමාණය</div>
            <div className="d-flex justify-content-center gap-2 fw-bold mt-2">
              <img src={POINT_ICON} alt="Point Icon" height={20} />
              {userData?.leaderboard?.score || 0}
            </div>
          </div>
        </div>

        {/* Questions Button */}
        <div className="text-center mt-4">
          <button
            className={`main-button ${!campaign && "disabled"}`}
            style={{ fontSize: "13px", padding: 16, borderColor: "#AA0077" }}
            onClick={() => navigate("/tc?btn=true")}
            disabled={!campaign}
          >
            දැන් ප්‍රශ්න වලට උත්තර සපයන්න
          </button>
        </div>

        {/* Previous Winners */}
        <div className="text-white mt-4">
          <h5 className="fw-bold">පසුගිය මාසයේ ජයග්‍රහකයෝ</h5>
          <div
            className="leaderboard-dash mt-3"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            {prevWinners?.map((winner, index) => (
              <div
                key={index}
                className="d-flex justify-content-between px-2 mb-4"
              >
                <div className="d-flex justify-content-start gap-3">
                  <img
                    src={winner?.winner?.profile_pic?.url || NO_PIC}
                    alt="Winner Profile"
                    height={65}
                    width={65}
                    style={{ ...avatarStyle, border: "6px solid white" }}
                  />
                  <div className="text-start">
                    <div className="fw-bold">
                      {truncateString(winner?.winner?.full_name, 17)}
                    </div>
                    <div>{capitalizeFirstLetter(winner?.campaign_month)}</div>
                    <div>{winner?.gift_name}</div>
                  </div>
                </div>
                <img
                  src={winner?.gift_image?.url || NO_IMAGE}
                  alt="Gift"
                  height={60}
                  width={60}
                  style={giftStyle}
                />
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Button */}
        <div className="text-center mt-4">
          <button
            className="main-button"
            style={{ fontSize: "13px", padding: 16 }}
            onClick={() => navigate("/faq")}
          >
            තරග විස්තර දැන ගැනීමට පිවිසෙන්න
          </button>
        </div>

        {/* Footer Text */}
        <div
          className="text-center text-white px-5 mt-4"
          style={{ fontSize: "12px" }}
        >
          By continuing, I agree to{" "}
          <span
            className="fw-bold text-decoration-underline"
            onClick={() => navigate("/tc")}
          >
            Terms of Conditions
          </span>{" "}
          and{" "}
          <span className="fw-bold text-decoration-underline">
            Privacy of Policy
          </span>
        </div>
      </div>

      <FloatingNavbar menu="menu" />
    </div>
  );
}

export default MainPage;
