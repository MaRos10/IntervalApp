import Menu from "../../components/Menu/Menu";
import "./SetTimer.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TimerContext } from "../../components/TimerContext";
import { motion } from "framer-motion";

export default function SetTimer() {
  const [minutes, setMinutes] = useState(0);
  const [isIntervalEnabled, setIsIntervalEnabled] = useState(false);
  const [isPauseEnabled, setIsPauseEnabled] = useState(false);
  const [pop, setPop] = useState(false);
  const { startTimer } = useContext(TimerContext);
  const navigate = useNavigate();

  // Start av timer
  const handleStart = () => {
    setTimeout(() => {
      if (minutes > 0) {
        startTimer(minutes, isIntervalEnabled, isPauseEnabled);
        navigate("/analogTimer");
      }
    }, 300);
  };

  // Hanterar inställning av intervall
  const handleIntervalChange = () => {
    setIsIntervalEnabled((prev) => !prev);
    if (!isIntervalEnabled) {
      setIsPauseEnabled(false); // Avmarkera paus om intervallet är avmarkerat
    }
  };

  // Hanterar inställning av paus
  const handlePauseChange = () => {
    setIsPauseEnabled((prev) => !prev);
  };

  // Pop-animation för siffran i tidvisaren när minuterna ändras
  const triggerPop = () => {
    setPop(true);
    setTimeout(() => setPop(false), 300); // Återställ pop efter animation
  };

  return (
    <>
      <Menu />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="setTimer"
      >
        {/* Set Timer Duration */}
        <section className="timePicker">
          <button
            className="timeArrow"
            onClick={() => {
              setMinutes(Math.max(minutes - 1, 0));
              triggerPop();
            }}
          >
            &lt;
          </button>

          <motion.div className="timeDisplay">
            <span
              className={`timeMinutes ${pop ? "pop" : ""}`} // Lägg till pop-klass
            >
              {minutes}
            </span>
            <span className="timeLabel">minutes</span>
          </motion.div>

          <button
            className="timeArrow"
            onClick={() => {
              setMinutes(Math.min(minutes + 1, 60));
              triggerPop();
            }}
          >
            &gt;
          </button>
        </section>

        {/* Timer Settings */}
        <section className="timerControls">
          <div className="checkboxes">
            <label>
              <input
                className="inputBox"
                type="checkbox"
                checked={isIntervalEnabled}
                onChange={handleIntervalChange}
              />
              intervals
            </label>
            <label>
              <input
                className="inputBox"
                type="checkbox"
                checked={isPauseEnabled}
                onChange={handlePauseChange}
                disabled={!isIntervalEnabled} // Paus kan bara aktiveras om intervallet är aktiverat
              />
              5 min break included
            </label>
          </div>
          <motion.button
            className="startBtn"
            onClick={handleStart}
            disabled={minutes === 0}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring" }}
          >
            START TIMER
          </motion.button>
        </section>
      </motion.div>
    </>
  );
}
