import { useContext, useState, useEffect } from "react";
import { TimerContext } from "../../components/TimerContext";
import Menu from "../../components/Menu/Menu";
import AbortButton from "../../components/AbortButton/AbortButton";
import IntervalHeader from "../../components/IntervalHeader/IntervalHeader";
import "./TextTimer.css";
import { motion } from "framer-motion";

// Omvandla minuter och sekunder till text
const timeToWords = (minutes, seconds) => {
  const ones = [
    "noll",
    "ett",
    "två",
    "tre",
    "fyra",
    "fem",
    "sex",
    "sju",
    "åtta",
    "nio",
  ];
  const teens = [
    "tio",
    "elva",
    "tolv",
    "tretton",
    "fjorton",
    "femton",
    "sexton",
    "sjutton",
    "arton",
    "nitton",
  ];
  const tens = ["", "", "tjugo", "trettio", "fyrtio", "femtio"];

  // Omvandlar nummer till ord mha timetoWords
  const numToWords = (num) => {
    if (num < 10) {
      return ones[num];
    } else if (num < 20) {
      return teens[num - 10];
    } else {
      const tensPart = tens[Math.floor(num / 10)]; // Beräknar vilket tiotal numret tillhör
      const onesPart = num % 10 > 0 ? ones[num % 10] : ""; // Hämta entalet om det är större än 0, annars använd en tom sträng
      return `${tensPart}${onesPart}`;
    }
  };

  // Textrepresentation av antal minuter
  const minText =
    minutes === 1
      ? "en minut"
      : minutes > 1
      ? `${numToWords(minutes)} minuter`
      : "";

  // Textrepresentation när enbart sekunder är kvar
  const secText =
    seconds === 1
      ? "en sekund"
      : seconds > 0
      ? `${numToWords(seconds)} sekunder`
      : "";

  // Om båda minuter och sekunder är 0, returnera tom sträng
  if (minutes === 0 && seconds === 0) {
    return "";
  }

  return `${minText}${minText && secText ? " och " : ""}${secText} kvar`;
};

export default function TextTimer() {
  const { timer } = useContext(TimerContext);
  const [time, setTime] = useState("noll minuter");

  // Uppdaterar tiden
  useEffect(() => {
    const updateTimerText = () => {
      const { minutes, seconds } = timer.getTimeValues();
      setTime(timeToWords(minutes, seconds));
    };

    // Lägger till eventlistener för secondsUpdated-eventet som anropar updateTimerText
    timer.addEventListener("secondsUpdated", updateTimerText);
    updateTimerText();

    // Rensa eventlistener
    return () => {
      timer.removeEventListener("secondsUpdated", updateTimerText);
    };
  }, [timer]);

  return (
    <>
      <Menu />
      <IntervalHeader />
      <main className="textTimer">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="textTimerContainer"
        >
          <div className="textTimerClock">{time}</div>
        </motion.section>
        <AbortButton />
      </main>
    </>
  );
}
