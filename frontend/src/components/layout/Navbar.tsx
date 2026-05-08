import { Link as ScrollLink } from 'react-scroll'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const landingSections = [
  { label: 'Home', target: 'home' },
  { label: 'Popular Now', target: 'popular' },
  { label: 'About', target: 'about' },
  { label: 'Services', target: 'services' },
]

const Navbar: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const pendingTarget = sessionStorage.getItem('hapagtech-scroll-target')
    if (!pendingTarget || location.pathname !== '/') return

    const targetElement = document.getElementById(pendingTarget)
    if (!targetElement) return

    const headerOffset = 80
    const elementPosition = targetElement.getBoundingClientRect().top
    window.scrollTo({
      top: elementPosition + window.pageYOffset - headerOffset,
      behavior: 'smooth',
    })
    sessionStorage.removeItem('hapagtech-scroll-target')
  }, [location.pathname])

  const handleDesktopNavigation = (target: string) => {
    if (location.pathname === '/') {
      const targetElement = document.getElementById(target)
      if (!targetElement) return

      const headerOffset = 80
      const elementPosition = targetElement.getBoundingClientRect().top
      window.scrollTo({
        top: elementPosition + window.pageYOffset - headerOffset,
        behavior: 'smooth',
      })
      return
    }

    sessionStorage.setItem('hapagtech-scroll-target', target)
    navigate('/')
  }

  const desktopNavItem = (label: string, target: string) => {
    if (location.pathname !== '/') {
      return (
        <button
          key={label}
          type="button"
          onClick={() => handleDesktopNavigation(target)}
          className="nav-button-trace group relative inline-flex min-w-[72px] items-center justify-center rounded-full px-3 py-1 text-[18px] font-semibold tracking-wide text-[#FF5300] cursor-pointer lg:min-w-[84px] lg:px-3.5 lg:py-1.5"
        >
          <span className="label">{label}</span>
        </button>
      )
    }

    return (
      <ScrollLink
        key={label}
        to={target}
        smooth={true}
        duration={500}
        spy={true}
        offset={-50}
        className="nav-button-trace group relative inline-flex min-w-[72px] items-center justify-center rounded-full px-3 py-1 text-[18px] font-semibold tracking-wide text-[#FF5300] cursor-pointer lg:min-w-[84px] lg:px-3.5 lg:py-1.5"
      >
        <span className="label">{label}</span>
      </ScrollLink>
    )
  }

  return (
    <>
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

        .nav-button-trace {
          position: relative;
          background: transparent;
          border: none;
          outline: none;
          isolation: isolate;
        }

        .nav-button-trace::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 9999px;
          padding: 2px;
          background: conic-gradient(
            from var(--angle),
            transparent 0%,
            transparent 30%,
            #ff9966 45%,
            #ff5300 50%,
            #ff6b35 55%,
            transparent 70%,
            transparent 100%
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .nav-button-trace::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 9999px;
          background: conic-gradient(
            from var(--angle),
            transparent 0%,
            transparent 30%,
            rgba(237, 63, 37, 0.15) 45%,
            rgba(237, 63, 37, 0.35) 50%,
            rgba(237, 63, 37, 0.15) 55%,
            transparent 70%,
            transparent 100%
          );
          filter: blur(6px);
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: -1;
        }

        .nav-button-trace:hover::before,
        .nav-button-trace:hover::after {
          opacity: 1;
          animation: spin-glow 1.8s linear infinite, fade-in-glow 0.35s ease forwards;
        }

        .nav-button-trace .label {
          position: relative;
          z-index: 1;
        }

        .nav-button-trace:hover .label {
          font-weight: 800;
        }
      `}</style>

      <nav className="hidden md:flex flex-grow items-center justify-center gap-6 lg:gap-8">
        {landingSections.map(({ label, target }) => desktopNavItem(label, target))}
      </nav>
    </>
  );
};

export default Navbar;