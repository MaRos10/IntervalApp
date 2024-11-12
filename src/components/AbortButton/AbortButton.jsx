import { useContext } from "react";
import { motion } from "framer-motion";
import "./AbortButton.css";
import { TimerContext } from "../TimerContext";
import { useNavigate } from "react-router-dom";

export default function AbortButton() {
  const { stopTimer } = useContext(TimerContext);
  const navigate = useNavigate();

  const handleAbort = () => {
    setTimeout(() => {
      stopTimer();
      navigate("/intervalapp/setTimer");
    }, 300);
  };

  return (
    <>
      <article className="buttonWrapper">
        <motion.button
          className="abortBtn"
          onClick={handleAbort}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring" }}
        >
          ABORT TIMER
        </motion.button>
      </article>
    </>
  );
}
