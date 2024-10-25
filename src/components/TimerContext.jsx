import { createContext, useState, useEffect } from "react";
import Timer from "easytimer.js";
import { useNavigate } from "react-router-dom";

export const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [timer] = useState(new Timer());
  const [pauseTimer] = useState(new Timer());
  const [isRunning, setIsRunning] = useState(false);
  const [isIntervalEnabled, setIsIntervalEnabled] = useState(false);
  const [isPauseEnabled, setIsPauseEnabled] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const navigate = useNavigate();

  // Funktion för när timer når mål
  const targetAchievedHandler = () => {
    if (isIntervalEnabled) {
      if (isPauseEnabled) {
        navigate("/pause");
        pauseTimer.start({ countdown: true, startValues: { minutes: 5 } }); // Starta paustimer
      } else {
        // om !isPauseEnabled - fortsätt med intervall utan paus
        timer.start({ countdown: true, startValues: { minutes } });
      }
    } else {
      navigate("/alarm");
    }
  };

  // Lägger till eventlistener för när timer når mål och tar bort den när beroenden ändras
  useEffect(() => {
    timer.addEventListener("targetAchieved", targetAchievedHandler);
    return () => {
      timer.removeEventListener("targetAchieved", targetAchievedHandler);
    };
  }, [isIntervalEnabled, isPauseEnabled, minutes, navigate, pauseTimer]);

  // Startar timern
  const startTimer = (inputMinutes, intervalEnabled, pauseEnabled) => {
    timer.stop();
    setMinutes(inputMinutes); // spara minut som skickas in
    timer.start({ countdown: true, startValues: { minutes: inputMinutes } });
    setIsRunning(true);
    setIsIntervalEnabled(intervalEnabled);
    setIsPauseEnabled(pauseEnabled);
  };

  // Stoppar timer och återställer till 0min
  const stopTimer = () => {
    timer.stop();
    setIsRunning(false);
    timer.start({ countdown: true, startValues: { minutes: 0 } });
  };

  return (
    <TimerContext.Provider
      value={{
        timer,
        pauseTimer,
        isRunning,
        startTimer,
        stopTimer,
        setIsPauseEnabled,
        minutes,
        isIntervalEnabled,
        isPauseEnabled,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}
