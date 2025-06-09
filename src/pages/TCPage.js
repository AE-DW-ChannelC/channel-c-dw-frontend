import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TokenService from "../services/token.service";

function TCPage({ menuBtn }) {
  const navigate = useNavigate();
  const location = useLocation(); // Provides access to the current location object.
  const queryParams = new URLSearchParams(location.search); // Parse the query string.

  const button = queryParams.get("btn"); // Get the value of the "btn" query parameter.

  const userData = TokenService.getUserData();
  const today = new Date().toISOString().split("T")[0];

  const [freeQuestions, setFreeQuestions] = useState(() => {
    const answeredToday =
      userData?.leaderboard?.answered_questions_by_date?.find(
        (item) => item.date === today
      )?.answered_questions ?? 0; // default to 0 if no record

    return answeredToday < 5;
  });

  const handleStartQuiz = () => {
    if (!userData?.leaderboard) {
      navigate("/questions");
      return
    }
    if (freeQuestions) {
      navigate("/questions");
    } else {
      navigate("/on-demand");
      console.log("Free questions limit reached, redirecting to on-demand page.");
    }
  };

  return (
    <div className="container">
      <div className="text-center pt-3 animate__animated animate__bounceIn">
        <h5 className="text-white fw-bold">තරග කොන්දේසි</h5>
      </div>
      <div
        className="mt-4"
        style={{ overflowY: "hidden", paddingBottom: "120px" }}
      >
        <div className="text-white" style={{ fontSize: "13px" }}>
          <ul>
            <li className="mb-3">
              දිනකට රුපියල් 6+ බදු අය කරයි. එය නොමිලේ ප්‍රශ්නාවලිය පහකට ප්‍රවේශය
              ලබා දෙයි සෑම අමතර ප්‍රශ්නාවලියක් සඳහාම රුපියල් (1.50) බදු අය කෙරේ.
              ක්‍රීඩාවට ප්‍රවේශ වීමට පර්ශීලකයන් සේවාවට දායක විය යුතු අතර දෛනික
              ගාස්තුව ගෙවිය යුතුය.
            </li>
            <li className="mb-3">
              දෛනික ගාස්තුව ගෙවීමක් සිදු කිරීමට තරම් මුදල් නොමැතිවිමකදී ප්‍රමුක
              පුවරුවට (Leaderboard) ලකුණු එකතුවීමක් සිදුනොවේ.
            </li>
            <li className="mb-3">
              ප්‍රශ්නාවලිය ආරමිභ වන විට සහ පශීලකයාගේ පිළිතුරු වාර්තා කරන විට
              පද්ධතිය තත්පර (10) ටයිමරයක් ආරම්භ කරයි. ටයිමරය අවසන් වුවහොත්,
              ලකුණු ලබා නොදේ. පද්ධතිය ක්‍රීඩා කරන ප්‍රශ්නාවලිය ගණන සහ පරිශීලකයා
              නොමිලේ ප්‍රශ්නාවලිය (5) සීමාව තුළ සිටීද නැතහොත් අමතර ප්‍රශ්නාවලිය
              සඳහා ගෙවීමට අවශ්‍යද යන්න නිරීක්ෂණය කරයි.
            </li>
            <li className="mb-3">
              පලමු ප්‍රශ්න පහටම පිලිතුරු සැපයූවොත් පමනක් ලකුණු එකතු වේ. පිළිතුරු
              සැපයීම ආරම්භ කරන්න
            </li>
          </ul>
        </div>
        {(menuBtn || button) && (
          <div className="text-center mt-4">
            <button
              className="main-button"
              style={{ fontSize: "13px", padding: 16 }}
              onClick={handleStartQuiz}
            >
              දැන් ප්‍රශ්න වලට උත්තර දෙන්න
            </button>
          </div>
        )}
        <div
          className="text-decoration-underline mt-3 text-white text-center"
          onClick={() => navigate("/home")}
        >
          ප්‍රදාන මෙනුව වෙත යන්න
        </div>
      </div>
    </div>
  );
}

export default TCPage;
