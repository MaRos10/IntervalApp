import "./AnalogTimer.css";
import Menu from "../../components/Menu/Menu";
import AbortButton from "../../components/AbortButton/AbortButton";
import IntervalHeader from "../../components/IntervalHeader/IntervalHeader";
import clockFace from "../../assets/clockface.svg";
import { useEffect, useState, useContext } from "react";
import { TimerContext } from "../../components/TimerContext";
import { motion } from "framer-motion";

export default function AnalogTimer() {
  const { timer } = useContext(TimerContext);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Uppdatera minuter och sekunder baserat på timer
    const updateClock = () => {
      const { minutes, seconds } = timer.getTimeValues();
      setMinutes(minutes);
      setSeconds(seconds);
    };

    timer.addEventListener("secondsUpdated", updateClock);
    updateClock();

    // Rensa eventlistener
    return () => {
      timer.removeEventListener("secondsUpdated", updateClock);
    };
  }, [timer]);

  return (
    <>
      <Menu />
      <IntervalHeader />
      <main className="analog">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="analogContainer"
        >
          <div className="analogClock">
            <img src={clockFace} alt="Urtavla" className="analogFace" />
            <div
              className="analogHand analogMinuteHand"
              style={{ transform: `rotate(${minutes * 6}deg)` }}
            ></div>
            <div
              className="analogHand analogSecondHand"
              style={{ transform: `rotate(${seconds * 6}deg)` }}
            ></div>
          </div>
        </motion.section>
        <AbortButton />
      </main>
    </>
  );
}
