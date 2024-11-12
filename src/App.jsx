import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      <Router>
        <TimerProvider>
          <Routes>
            <Route path="/intervalapp" element={<Loading />} />
            <Route path="/intervalapp/setTimer" element={<SetTimer />} />
            <Route path="/intervalapp/analogTimer" element={<AnalogTimer />} />
            <Route
              path="/intervalapp/digitalTimer"
              element={<DigitalTimer />}
            />
            <Route path="/intervalapp/textTimer" element={<TextTimer />} />
            <Route path="/intervalapp/alarm" element={<Alarm />} />
            <Route path="/intervalapp/pause" element={<Pause />} />
          </Routes>
        </TimerProvider>
      </Router>
    </>
  );
}

export default App;
