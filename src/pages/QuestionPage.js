import React, { useEffect, useState } from "react";
import { IoAlarmOutline, IoExitOutline } from "react-icons/io5";
import Lottie from "react-lottie-player";
import SUCCESS from "../assets/sucess - animation.json";
import FAILED from "../assets/failed - animation.json";
import { useNavigate } from "react-router-dom";
import { QuestionService } from "../services/question.service";
import TokenService from "../services/token.service";
import CountdownTimer from "../components/CountDownTimer";
import LoadingFullscreen from "../components/LoadingFullscreen";
import { LeaderboardService } from "../services/leaderboard.service";
import Swal from "sweetalert2";
import AUDIO from "../assets/01.wav";

function QuestionPage() {
  const [screen, setScreen] = useState("question");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const userData = TokenService.getUserData();
  const campaignData = TokenService.getCampaignData();

  const [loading, setLoading] = useState(false);
  const [questionId, setQuestionId] = useState(null);
  const [questions, setQuestions] = useState("");
  const [answer_a, setAnswer_a] = useState("");
  const [answer_b, setAnswer_b] = useState("");
  const [answer_c, setAnswer_c] = useState("");
  const [answer_d, setAnswer_d] = useState("");

  const [timer, setTimer] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const [freeQuestions, setFreeQuestions] = useState(
    userData?.leaderboard?.answered_questions_by_date?.find(
      (item) => item.date == new Date().toISOString().split("T")[0]
    )?.answered_questions < 5
  );

  const [questionNumber, setQuestionNumber] = useState(
    userData?.leaderboard?.answered_questions_by_date?.find(
      (item) => item.date == new Date().toISOString().split("T")[0]
    )?.answered_questions
  );

  useEffect(() => {
    screen == "question" && getQuestion();
  }, [screen]);

  const getQuestion = async () => {
    try {
      setLoading(true);
      const response = await QuestionService.getQuestions(userData?.mobile);
      setAudioFile(response.question?.audio_file?.url || null);
      setQuestions(response.question.question);
      setAnswer_a(response.question?.answer_A || null);
      setAnswer_b(response.question?.answer_B || null);
      setAnswer_c(response.question?.answer_C || null);
      setAnswer_d(response.question?.answer_D || null);

      setQuestionId(response.question.id);
      setTimer(response.question.timer_seconds);
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

  const verifyAnswer = async () => {
    setAudioFile(null);
    try {
      if (selectedAnswer == "") {
        await updateLeaderboard(0);
        setScreen("timeout");

        return;
      }
      setLoading(true);
      const response = await QuestionService.verifyAnswer(
        userData?.mobile,
        selectedAnswer,
        questionId
      );
      if (response.code == 100) {
        await updateLeaderboard(10);
        setScreen("success");
      } else {
        await updateLeaderboard(0);
        setScreen("failed");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false);
      setTimer(null);
      setSelectedAnswer("");
    }
  };

  const updateLeaderboard = async (score) => {
    try {
      const body = {
        campaign_id: campaignData?.id,
        user_id: userData?.userid,
        score,
      };

      const response = await LeaderboardService.updateLeaderboard(body);
      TokenService.updateLeaderboardData(response.leaderboard);

      const selectedCount =
        response.leaderboard?.answered_questions_by_date.find(
          (item) => item.date == new Date().toISOString().split("T")[0]
        );

      if (selectedCount?.answered_questions >= 5) {
        setFreeQuestions(false);
      } else {
        setFreeQuestions(true);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isConfirmed) {
        // Trigger your custom logic here
        const userConfirmed = window.confirm(
          "Are you sure you want to refresh the page? Changes may be lost."
        );
        if (!userConfirmed) {
          event.preventDefault();
          setIsConfirmed(false);
          return false; // Cancel the refresh
        } else {
          setIsConfirmed(true);
        }
      }
    };

    // Attach the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isConfirmed]);

  return screen == "question" ? (
    <>
      <div
        style={{ backgroundColor: "#1B98A4" }}
        className="text-center text-white p-2 d-flex justify-content-between"
      >
        {freeQuestions && (
          <div className="text-center">0{questionNumber} of 05</div>
        )}
        {!freeQuestions && <div>Questions: {questionNumber}</div>}
        <div>
          <IoExitOutline
            onClick={() => window.location.reload(false)}
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "#E25B5B",
              backgroundColor: "#F5C8C8",
              paddingInline: 4,
              borderRadius: 25,
            }}
          />
        </div>
      </div>
      <LoadingFullscreen loading={loading} />
      {audioFile && <audio src={audioFile} autoPlay />}
      <div className="container">
        <div
          className="text-center text-white mt-4"
          style={{ overflowY: "no" }}
        >
          <div style={{ fontSize: "12px" }}>
            ඔබ මෙතෙක් ලබාගත් ලකුණු ප්‍රමාණය
          </div>
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
              {userData?.leaderboard?.score}
            </div>
          </div>
          <h3 className="mt-3">{questions}</h3>

          <div className="d-flex justify-content-between gap-5 mt-4 px-2">
            <div style={{ fontSize: "11px", textAlign: "start" }}>
              ප්‍රශ්ණයට පිළිතුරු දීමට ඔබට ඇත්තේ තවත් තත්පර
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
              <IoAlarmOutline />{" "}
              <span className="mt-1">
                {timer && (
                  <CountdownTimer
                    initialSeconds={timer}
                    completed={verifyAnswer}
                  />
                )}
              </span>
            </div>
          </div>
          <div className="mt-4">
            {answer_a && (
              <div
                className={`d-flex justify-content-start gap-3 answer-item mb-3 ${
                  selectedAnswer == "A" && "active"
                }`}
                onClick={() => setSelectedAnswer("A")}
              >
                <div
                  className={`answer-no ${selectedAnswer == "A" && "active"}`}
                >
                  A
                </div>
                <div className="pt-1">{answer_a}</div>
              </div>
            )}
            {answer_b && (
              <div
                className={`d-flex justify-content-start gap-3 answer-item mb-3 ${
                  selectedAnswer == "B" && "active"
                }`}
                onClick={() => setSelectedAnswer("B")}
              >
                <div
                  className={`answer-no ${selectedAnswer == "B" && "active"}`}
                >
                  B
                </div>
                <div className="pt-1">{answer_b}</div>
              </div>
            )}
            {answer_c && (
              <div
                className={`d-flex justify-content-start gap-3 answer-item mb-3 ${
                  selectedAnswer == "C" && "active"
                }`}
                onClick={() => setSelectedAnswer("C")}
              >
                <div
                  className={`answer-no ${selectedAnswer == "C" && "active"}`}
                >
                  C
                </div>
                <div className="pt-1">{answer_c}</div>
              </div>
            )}
            {answer_d && (
              <div
                className={`d-flex justify-content-start gap-3 answer-item mb-3 ${
                  selectedAnswer == "D" && "active"
                }`}
                onClick={() => setSelectedAnswer("D")}
              >
                <div
                  className={`answer-no ${selectedAnswer == "D" && "active"}`}
                >
                  D
                </div>
                <div className="pt-1">{answer_d}</div>
              </div>
            )}
          </div>
          <div className="mt-4">
            <button
              className={`main-button ${selectedAnswer == "" && "disabled"}`}
              style={{ padding: "10px", fontSize: "14px" }}
              onClick={verifyAnswer}
              disabled={selectedAnswer == ""}
            >
              පිළිතුර පරීක්ෂා කරන්න
            </button>
          </div>
        </div>
      </div>
    </>
  ) : screen == "success" ? (
    <SuccessScreen setScreen={setScreen} freeQuestions={freeQuestions} />
  ) : screen == "failed" ? (
    <FailedScreen setScreen={setScreen} freeQuestions={freeQuestions} />
  ) : (
    <TimeoutScreen setScreen={setScreen} freeQuestions={freeQuestions} />
  );
}

const SuccessScreen = ({ setScreen, freeQuestions }) => {
  const navigate = useNavigate();
  return (
    <div className="container text-center text-white ">
      <div className="mt-5 fw-bold">අපේ ඔබේ උණුසුම් සුභ පැතුම්..!</div>
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
          onClick={() =>
            freeQuestions ? setScreen("question") : navigate("/on-demand")
          }
        >
          ඊළඟ ප්‍රශ්නයට යන්න
        </button>
      </div>

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
  );
};

const FailedScreen = ({ setScreen, freeQuestions }) => {
  const navigate = useNavigate();
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
      <p className="px-4">
        ඊලඟ ප්‍රශ්නය සඳහා නිවැරදි පිළිතුරු ලබා දීමට උත්සහ කරන්න
      </p>

      <div>
        <button
          className="main-button mt-4"
          style={{ padding: "10px", fontSize: "14px" }}
          onClick={() =>
            freeQuestions ? setScreen("question") : navigate("/on-demand")
          }
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
      <div
        className="text-center text-white px-5 mt-4"
        style={{ fontSize: "12px" }}
      >
        By continuing, I agree to{" "}
        <span className="fw-bold text-decoration-underline">
          Terms of Conditions
        </span>{" "}
        and{" "}
        <span className="fw-bold text-decoration-underline">
          Privacy of Policy
        </span>
      </div>
    </div>
  );
};

const TimeoutScreen = ({ setScreen, freeQuestions }) => {
  const navigate = useNavigate();
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
      <h4 className="fw-bold">කාලය අවසන්</h4>
      <p className="px-4">
        ඊලඟ ප්‍රශ්නය සඳහා නිවැරදි පිලිතුරු ලබා දීමට උත්සහ කරන්න
      </p>

      <div>
        <button
          className="main-button mt-4"
          style={{ padding: "10px", fontSize: "14px" }}
          onClick={() =>
            freeQuestions ? setScreen("question") : navigate("/on-demand")
          }
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
      <div
        className="text-center text-white px-5 mt-4"
        style={{ fontSize: "12px" }}
      >
        By continuing, I agree to{" "}
        <span className="fw-bold text-decoration-underline">
          Terms of Conditions
        </span>{" "}
        and{" "}
        <span className="fw-bold text-decoration-underline">
          Privacy of Policy
        </span>
      </div>
    </div>
  );
};

export default QuestionPage;
