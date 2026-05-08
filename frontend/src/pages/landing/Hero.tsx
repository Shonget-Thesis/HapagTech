import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FoodHp from "../../assets/FoodHero.png";
import Food from "../../assets/Food.png";
import Wordmark from '../../assets/Wordmark.png'

export const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-auto md:h-screen mt-5 md:m-0">
      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes spin-glow {
          from { --angle: 0deg; }
          to   { --angle: 360deg; }
        }

        @keyframes fade-in-glow {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Shared base ── */
        .hero-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 50px;     
          border-radius: 9999px;
          font-size: 18px;         
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          isolation: isolate;
          transition: background 0.25s ease, color 0.25s ease;
          border: none;
          outline: none;
        }

        .hero-btn::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 9999px;
          background: conic-gradient(
            from var(--angle),
            transparent 0%,
            transparent 25%,
            #ffe066 42%,
            #FFAE00 50%,
            #ffcc44 58%,
            transparent 75%,
            transparent 100%
          );

          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 2px;
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
          z-index: 2;   /* ← sit above button bg */
        }

        /* ── Glow bloom ── */
        .hero-btn::after {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 9999px;
          background: conic-gradient(
            from var(--angle),
            transparent 0%,
            transparent 25%,
            rgba(255, 174, 0, 0.12) 42%,
            rgba(255, 174, 0, 0.35) 50%,
            rgba(255, 174, 0, 0.12) 58%,
            transparent 75%,
            transparent 100%
          );
          filter: blur(8px);
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: -1;   /* ← sit behind everything */
          pointer-events: none;
        }

        .hero-btn:hover::before,
        .hero-btn:hover::after {
          opacity: 1;
          animation: spin-glow 1.8s linear infinite, fade-in-glow 0.35s ease forwards;
        }

        .hero-btn .label {
          position: relative;
          z-index: 3;   /* ← above ::before */
        }

        .hero-btn:hover .label {
          font-weight: 700;
        }

        /* ── Arrow animations (unchanged) ── */
        @keyframes arrow-breathe {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(3px); }
        }
        @keyframes arrow-nudge {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(6px); }
        }
        @keyframes arrow-shoot {
          0% { transform: translateX(0px); opacity: 1; }
          60% { transform: translateX(120px); opacity: 0; }
          100% { transform: translateX(0px); opacity: 1; }
        }
        .hero-btn .arrow {
          display: inline-block;
          margin-left: 8px;
          animation: arrow-breathe 1.6s ease-in-out infinite;
          transition: all 0.2s ease;
        }
        .hero-btn:hover .arrow { animation: arrow-nudge 0.6s ease-in-out infinite; }
        .hero-btn:active .arrow { animation: arrow-shoot 0.5s ease-out; }

        /* ── Sign Up variant ── */
        .hero-btn-signup {
          background: #FFAE00;
          color: #2D2D2D;
          border: 2px solid #FFAE00;
        }
        .hero-btn-signup:hover {
          background: white;
          border-color: transparent;   /* ← let ::before glow take over */
        }

        /* ── Log In variant ── */
        .hero-btn-login {
          background: white;
          color: #2D2D2D;
          border: 2px solid #FF5300;
        }
        .hero-btn-login:hover {
          background: white;
          border-color: transparent; 
        }
      `}</style>

      {/* Left Side */}
      <motion.div
        className="w-full md:w-1/2 self-center px-5 mx-10 text-center md:text-left md:mt-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div>
          <img src={Wordmark} className="w-[76vh] md:m-0" />
        </div>

        <motion.p
          className="text-[1.2rem] text-[#6C6C6C] my-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
        From the warmth of Filipino salu-salo to the pulse of modern technology, HAPAG TECH creates experiences worth sharing at every hapag-kainan.
        </motion.p>

        <motion.div
          className="my-6 flex justify-center md:justify-start gap-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link to="/register" className="hero-btn hero-btn-signup">
            <span className="label">Sign Up</span>
          </Link>
          <Link to="/login" className="hero-btn hero-btn-login">
            <span className="label">Log In</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Right Side */}
      <motion.div
        className="relative w-full md:w-1/2 md:block hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img src={FoodHp} alt="Background" className="absolute top-0 left-1/2 w-full h-full object-cover transform -translate-x-1/4" />
        <motion.img
          src={Food}
          alt="Food Dish"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/4 w-[70%] max-w-[80%]"
          style={{ translateX: "-50%", translateY: "-50%" }}
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
};