import { useState, useEffect } from "react";

const CountdownTimer = ({ initialSeconds, completed }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  // Format time as MM:SS
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    if (seconds <= 0) {
      completed();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  return formatTime(seconds);
};

export default CountdownTimer;
