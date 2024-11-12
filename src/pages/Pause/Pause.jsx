import "./Pause.css";
import { useNavigate } from "react-router-dom";
import pause from "../../assets/pauseicon.svg";
import { useContext, useState, useEffect } from "react";
import { TimerContext } from "../../components/TimerContext";
import { motion } from "framer-motion";

export default function Pause() {
  const navigate = useNavigate();
  const {
    pauseTimer,
    startTimer,
    minutes,
    isIntervalEnabled,
    setIsPauseEnabled,
  } = useContext(TimerContext);
  const [pauseTime, setPauseTime] = useState("5:00");

  // Uppdatera nedräkningen för pausen
  useEffect(() => {
    const updatePauseTime = () => {
      const { minutes, seconds } = pauseTimer.getTimeValues();
      setPauseTime(
        `${minutes.toString()}:${seconds.toString().padStart(2, "0")}`
      );
    };

    pauseTimer.addEventListener("secondsUpdated", updatePauseTime);

    // När tiden är slut, starta om intervallet
    const handleTargetAchieved = () => {
      setIsPauseEnabled(false);
      startTimer(minutes, isIntervalEnabled, true); // Starta nytt intervall
      navigate("/intervalapp/analogTimer");
    };

    // targetAchieved körs när paustimer når sitt mål
    pauseTimer.addEventListener("targetAchieved", handleTargetAchieved);

    // Tar bort eventlisteners
    return () => {
      pauseTimer.removeEventListener("secondsUpdated", updatePauseTime);
      pauseTimer.removeEventListener("targetAchieved", updatePauseTime);
    };
  }, [
    pauseTimer,
    startTimer,
    minutes,
    isIntervalEnabled,
    setIsPauseEnabled,
    navigate,
  ]);

  // Funktion för när man avbryter paus
  const noPause = () => {
    setTimeout(() => {
      pauseTimer.stop();
      setIsPauseEnabled(false);
      startTimer(minutes, isIntervalEnabled, true);
      navigate("/intervalapp/analogTimer");
    }, 300);
  };

  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pauseContainer"
      >
        <img src={pause} alt="Pause" className="pauseImg" />
        <h4 className="pauseText">Pause & breath</h4>
        <div className="pauseTimer">{pauseTime}</div>
        <article className="buttonWrapper">
          <motion.button
            className="gobackBtn"
            onClick={noPause}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring" }}
          >
            NO PAUSE, GO NOW!
          </motion.button>
        </article>
      </motion.main>
    </>
  );
}
