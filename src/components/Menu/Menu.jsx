import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Menu.css";
import blackMenuIcon from "../../assets/navicon-black.svg";
import whiteMenuIcon from "../../assets/navicon-white.svg";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { text: "Analog Timer", path: "/intervalapp/analogTimer", delay: 0.1 },
    { text: "Digital Timer", path: "/intervalapp/digitalTimer", delay: 0.2 },
    { text: "Text Timer", path: "/intervalapp/textTimer", delay: 0.3 },
  ];

  const handleNavigate = (path) => {
    setIsOpen(false); // Stänger menyn efter att en sida valts
    navigate(path);
  };

  return (
    <nav className="menu">
      <button className="menuToggle" onClick={() => setIsOpen(!isOpen)}>
        <img
          src={isOpen ? whiteMenuIcon : blackMenuIcon}
          alt="Menu Icon"
          className="menuIcon"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            className="menuOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.ul
              className="menuList"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {menuItems.map((item, id) => (
                <motion.li
                  key={id}
                  className="menuItem"
                  onClick={() => handleNavigate(item.path)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.delay, duration: 0.3 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  {item.text}
                </motion.li>
              ))}
            </motion.ul>
          </motion.section>
        )}
      </AnimatePresence>
    </nav>
  );
}
