import "./Alarm.css";
import { useNavigate } from "react-router-dom";
import alarmClock from "../../assets/alarmicon.svg";
import { motion } from "framer-motion";

export default function Alarm() {
  const navigate = useNavigate();

  const setNewTimer = () => {
    setTimeout(() => {
      navigate("/setTimer");
    }, 300);
  };

  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="alarmContainer"
      >
        <img src={alarmClock} alt="Alarm" className="alarmImg" />
        <h4 className="alarmText">Times up!</h4>
        <article className="buttonWrapper">
          <motion.button
            className="settimerBtn"
            onClick={setNewTimer}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring" }}
          >
            SET NEW TIMER
          </motion.button>
        </article>
      </motion.main>
    </>
  );
}
