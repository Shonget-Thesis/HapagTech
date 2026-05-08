import { Link } from "react-router-dom";
import { useEffect, useState, MouseEvent } from 'react';
import LogoOrange from "./ui/LogoOrange";
import Navbar from "../components/layout/Navbar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextProgress = Math.min(window.scrollY / 160, 1);
      setScrollProgress(nextProgress);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileScroll = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleGetStartedClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 900);
  };

  return (
    <header className="relative z-50">
      <style>{`
        .arrow-btn-wrapper {
          position: relative;
          display: inline-flex;
          overflow: visible;
        }

        .arrow-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 9px 32px 9px 22px;
          background: transparent;
          color: white;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.01em;
          border: none;
          outline: none;
          cursor: pointer;
          white-space: nowrap;
          text-decoration: none;
          z-index: 1;
          animation: arrow-breathe 1.6s ease-in-out infinite;
        }

        .arrow-btn:hover {
          animation: arrow-nudge 0.7s ease-in-out infinite;
        }

        .arrow-btn.clicked {
          animation: arrow-shoot 0.75s cubic-bezier(0.4, 0, 1, 1) forwards !important;
        }

        .arrow-btn.clicked .arrow-ghost {
          animation: ghost-trail 0.75s cubic-bezier(0.4, 0, 1, 1) forwards;
        }

        /* SVG background shape */
        .arrow-shape {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: visible;
          pointer-events: none;
        }

        .arrow-shape path {
          fill: #2D2D2D;
          transition: fill 0.2s ease;
        }

        .arrow-btn:hover .arrow-shape path {
          fill: #424242;
        }

        .arrow-text {
          position: relative;
          z-index: 2;
        }

        /* Ghost trail element */
        .arrow-ghost {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          opacity: 0;
        }

        .arrow-ghost path {
          fill: rgba(255, 83, 0, 0.3);
        }

        /* Idle breathe */
        @keyframes arrow-breathe {
          0%, 100% { transform: translateX(0px); }
          50%       { transform: translateX(3px); }
        }

        /* Hover nudge */
        @keyframes arrow-nudge {
          0%, 100% { transform: translateX(0px); }
          50%       { transform: translateX(6px); }
        }

        /* Click: smooth exit right, re-enter from left */
        @keyframes arrow-shoot {
          0%   { transform: translateX(0px);   opacity: 1; }
          55%  { transform: translateX(140px); opacity: 0; }
          56%  { transform: translateX(-60px); opacity: 0; }
          100% { transform: translateX(0px);   opacity: 1; }
        }

        @keyframes ghost-trail {
          0%   { transform: translateX(0px);  opacity: 0.45; }
          100% { transform: translateX(110px); opacity: 0; }
        }
      `}</style>

      <div
        className="fixed top-0 left-0 right-0 bg-white flex justify-between items-center w-full px-10 shadow-lg transition-all duration-300 ease-out"
        style={{
          paddingTop: `${10 - scrollProgress * 12}px`,
          paddingBottom: `${10 - scrollProgress * 12}px`,
        }}
      >
        <div
          className="flex-shrink-0 origin-left overflow-hidden transition-all duration-300 ease-out"
          style={{
            width: `${40 * (1 - scrollProgress)}px`,
            maxWidth: `${40 * (1 - scrollProgress)}px`,
            opacity: Math.max(0, 1 - scrollProgress * 2),
            transform: `scale(${1 - scrollProgress * 0.35})`,
            marginRight: `${10 * (1 - scrollProgress)}px`,
          }}
        >
          <Link to="/"><LogoOrange /></Link>
        </div>

        <div className="flex-grow flex justify-center">
          <Navbar />
        </div>

        <div
          className="flex-shrink-0 transition-transform duration-300 ease-out hidden md:block"
          style={{ transform: `scale(${1 - scrollProgress * 0.12})` }}
        >
          <Link
            to="/register"
            onClick={handleGetStartedClick}
            className={`arrow-btn ${clicked ? 'clicked' : ''}`}
          >
            <svg className="arrow-shape" viewBox="0 0 160 42" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 0 H118 Q135 0 160 21 Q135 42 118 42 H14 Q0 42 18 21 Q0 0 14 0 Z" />
            </svg>  
            <svg className="arrow-ghost" viewBox="0 0 160 42" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 0 H118 Q135 0 160 21 Q135 42 118 42 H14 Q0 42 18 21 Q0 0 14 0 Z" />
            </svg>
            <span className="arrow-text">Get Started</span>
          </Link>
        </div>

        <div className="md:hidden flex-shrink-0">
          <button onClick={() => setIsOpen(true)} className="text-gray-700 text-2xl focus:outline-none">
            ☰
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 transition-opacity duration-300 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden z-20`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center py-6 space-y-6">
          {["home", "about", "services", "popular"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-full border border-[#FF5300]/20 px-5 py-2.5 text-base font-[600] text-[#FF5300] transition-all duration-300 hover:border-[#FF5300] hover:shadow-[0_0_0_1px_rgba(237,63,37,0.12)]"
              onClick={(e) => handleMobileScroll(e, id)}
            >
              {id === "popular" ? "Popular Now" : id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="arrow-btn"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;