import "./IntervalHeader.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TimerContext } from "../TimerContext";

export default function IntervalHeader() {
  const { stopTimer } = useContext(TimerContext);
  const navigate = useNavigate();

  const handleHeadertext = () => {
    setTimeout(() => {
      stopTimer();
      navigate("/setTimer");
    }, 300);
  };
  return (
    <>
      <header className="headerText" onClick={handleHeadertext}>
        interval
      </header>
    </>
  );
}
