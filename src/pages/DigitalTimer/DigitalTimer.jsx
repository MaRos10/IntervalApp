import "./DigitalTimer.css";
import Menu from "../../components/Menu/Menu";
import AbortButton from "../../components/AbortButton/AbortButton";
import IntervalHeader from "../../components/IntervalHeader/IntervalHeader";
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { TimerContext } from "../../components/TimerContext";
import { useNavigate } from "react-router-dom";

export default function DigitalTimer() {
  const { timer } = useContext(TimerContext);
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Uppdatera timer varje sekund
    timer.addEventListener("secondsUpdated", () => {
      const { minutes, seconds } = timer.getTimeValues();
      setTime(
        `${minutes.toString().padStart(1)}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    });

    // Rensa eventlisteners
    return () => {
      timer.removeEventListener("secondsUpdated");
      timer.removeEventListener("targetAchieved");
    };
  }, [timer, navigate]);

  return (
    <>
      <Menu />
      <IntervalHeader />
      <main className="digital">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="digitalContainer"
        >
          <div className="digitalClock">{time}</div>
        </motion.div>
        <AbortButton />
      </main>
    </>
  );
}
