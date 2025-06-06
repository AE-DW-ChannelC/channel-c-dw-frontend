import React, { useEffect, useState } from "react";
import FloatingNavbar from "../components/FloatingNavbar";
import GOLD from "../assets/gold.svg";
import STAGE_ICON from "../assets/stage.svg";
import TokenService from "../services/token.service";
import NO_PIC from "../assets/no_pro.png";
import { LeaderboardService } from "../services/leaderboard.service";
import { capitalizeFirstLetter, truncateString } from "../common/common";
import LoadingFullscreen from "../components/LoadingFullscreen";
import Swal from "sweetalert2";
import POINT_ICON from "../assets/point.svg";

function MyPlacePage() {
  const userData = TokenService.getUserData();
  const campaignData = TokenService.getCampaignData();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [heighestScorers, setHeighestScorers] = useState(null);

  useEffect(() => {
    getHighestScores();
  }, []);

  const getHighestScores = async () => {
    try {
      setLoading(true);
      const response = await LeaderboardService.getHighstUserScores(
        campaignData?.id
      );
      setHeighestScorers(response.data);
      const highestScore = response.data[0]?.score;

      const userScore = userData?.leaderboard?.score;

      const pro = (userScore / highestScore) * 100;
      setProgress(pro);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <LoadingFullscreen loading={loading} />
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

        {heighestScorers && (
          <div className="podium-container ">
            <img
              src={STAGE_ICON}
              alt="Podium Stage"
              className="podium-bg animate__animated animate__fadeInUp"
            />

            <div className="winner winner-1 ">
              <img
                src={heighestScorers[0]?.user?.profile_pic?.url || NO_PIC}
                alt="Winner 1"
                className="profile-pic animate__animated animate__bounceIn animate__delay-2s"
              />
              <div className="crown animate__animated animate__bounceIn  animate__delay-2s">
                👑
              </div>
              <p className="winner-name animate__animated animate__bounceIn  animate__delay-2s mb-0">
                {truncateString(heighestScorers[0]?.user?.full_name, 7) ||
                  "No User"}
              </p>
              <p className="winner-score animate__animated animate__bounceIn  animate__delay-2s">
                {heighestScorers[0]?.score}
              </p>
            </div>

            <div className="winner winner-2">
              <img
                src={heighestScorers[1]?.user?.profile_pic?.url || NO_PIC}
                alt="Winner 2"
                className="profile-pic animate__animated animate__bounceIn animate__delay-1s"
              />
              <p className="winner-name animate__animated animate__bounceIn animate__delay-1s mb-0">
                {truncateString(heighestScorers[1]?.user?.full_name, 7) ||
                  "No User"}
              </p>
              <p className="winner-score animate__animated animate__bounceIn  animate__delay-2s">
                {heighestScorers[1]?.score}
              </p>
            </div>

            <div className="winner winner-3">
              <img
                src={heighestScorers[2]?.user?.profile_pic?.url || NO_PIC}
                alt="Winner 3"
                className="profile-pic animate__animated animate__bounceIn animate__delay-1s"
              />
              <p className="winner-name animate__animated animate__bounceIn animate__delay-1s mb-0">
                {truncateString(heighestScorers[2]?.user?.full_name, 7) ||
                  "No User"}
              </p>
              <p className="winner-score animate__animated animate__bounceIn  animate__delay-2s">
                {heighestScorers[2]?.score}
              </p>
            </div>
          </div>
        )}
        <div
          className="leaderboard-self text-white animate__animated animate__fadeIn"
          style={{ zIndex: 100 }}
        >
          <h6 className="fw-bold text-start">මගේ ස්ථානය</h6>
          <div className="text-end" style={{ width: `${progress + 1}%` }}>
            <img src={GOLD} height={25} />
          </div>
          <div className="progress-container mt-1">
            <div
              className="progress-filler"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="leaderboard-self-profile-item d-flex justify-content-evenly px-2 mt-3">
            <div className="d-flex justify-content-start gap-3">

              <h4 className="pt-3">{heighestScorers ? heighestScorers.findIndex(entry => entry.user.id === userData.userid) + 1 : ''}</h4>
              <img
                src={userData?.profile_pic?.url || NO_PIC}
                height={55}
                width={55}
                style={{
                  borderRadius: "50%",
                  border: "6px solid white",
                  objectFit: "cover",
                }}
              />
              <div className="text-start">
                <div className="fw-bold">{userData?.full_name}</div>
                <div>{capitalizeFirstLetter(campaignData?.campaign_month)}</div>
              </div>
              <div className="text-start">
                <div>
                  <div className="fw-bold">Your score</div>
                  {heighestScorers ? heighestScorers.find(entry => entry.user.id === userData.userid)?.score : ""}
                </div>
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
