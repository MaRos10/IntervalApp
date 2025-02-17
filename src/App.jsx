import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { TimerProvider } from "./components/TimerContext";
import "./index.css";
import Loading from "./pages/Loading/Loading";
import SetTimer from "./pages/SetTimer/SetTimer";
import AnalogTimer from "./pages/AnalogTimer/AnalogTimer";
import DigitalTimer from "./pages/DigitalTimer/DigitalTimer";
import TextTimer from "./pages/TextTimer/TextTimer";
import Alarm from "./pages/Alarm/Alarm";
import Pause from "./pages/Pause/Pause";

function App() {
  return (
    <>
      <div className="mobileFrame">
        <div className="mobileContent">
          <Router>
            <TimerProvider>
              <Routes>
                <Route path="/" element={<Loading />} />
                <Route path="/setTimer" element={<SetTimer />} />
                <Route path="/analogTimer" element={<AnalogTimer />} />
                <Route path="/digitalTimer" element={<DigitalTimer />} />
                <Route path="/textTimer" element={<TextTimer />} />
                <Route path="/alarm" element={<Alarm />} />
                <Route path="/pause" element={<Pause />} />
              </Routes>
            </TimerProvider>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
