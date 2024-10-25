import { useNavigate } from "react-router-dom";
import "./Loading.css";
import logo from "../../assets/logo.svg";
import { motion } from "framer-motion";

export default function Loading() {
  const navigate = useNavigate();

  const handleClick = () => {
    setTimeout(() => {
      navigate("/setTimer");
    }, 300);
  };

  return (
    <main className="logoContainer">
      <motion.img
        whileTap={{ scale: 0.8 }}
        onClick={handleClick}
        src={logo}
        alt="Logo"
        className="logoImg"
      />
    </main>
  );
}
