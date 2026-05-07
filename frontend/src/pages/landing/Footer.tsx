import { Link as ScrollLink } from 'react-scroll'
import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from "lucide-react";
import WordMark2 from "../../assets/WordmarkFooter.png"

const Footer = () => {
  return (
    <footer className="bg-[#F3E8CC] px-2 py-8 text-[#2D2D2D] md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-10 border-b border-[#2D2D2D]/25 pb-8 md:grid-cols-2 md:gap-12">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold">Get in touch</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+63 997 728 9552</span>
              </div>
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Mail className="h-4 w-4 shrink-0" />
                <span>kangina.ph@domain.com</span>
              </div>
              <div className="flex items-start justify-center gap-2 md:justify-start">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>45th 21st Bldg. 02 St. Nazareth, CDO</span>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right">
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/team" className="footer-link text-[#2D2D2D] hover:text-[#2D2D2D]">Team</Link>
              </li>
              <li>
                <Link to="/privacy" className="footer-link text-[#2D2D2D] hover:text-[#2D2D2D]">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="footer-link text-[#2D2D2D] hover:text-[#2D2D2D]">Terms of Use</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid items-center gap-4 pt-5 text-center md:grid-cols-3">
          <div className="md:text-left">
            <p className="text-lg leading-6 text-[#2D2D2D]/90">
              The wildest culinary adventure, plated fresh in Cagayan de Oro.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <ScrollLink
              to="home"
              smooth={true}
              duration={600}
              offset={-80}
              className="transition-opacity hover:opacity-90 cursor-pointer"
              aria-label="Scroll to hero"
            >
              <img src={WordMark2} alt="HapagTech Logo" className="h-12" />
            </ScrollLink>
          </div>

          <div className="md:text-right">
            <p className="text-m text-[#2D2D2D]/85">© 2025 — 2026 Kangina. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
