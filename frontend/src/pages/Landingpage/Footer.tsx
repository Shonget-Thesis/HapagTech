import { Mail, MapPin, Phone } from "lucide-react";
import WordMark2 from "../../assets/Wordmark2.png";

const contactInfo = [
  { icon: Phone, text: "+63 997 728 9552" },
  { icon: Mail, text: "kangina.ph@domain.com" },
  { icon: MapPin, text: "45th 21st Bldg. 02 St. Nazareth, CDO" },
];

const footerLinks = [
  { label: "Terms of Use", href: "#" },
  { label: "Cookies Use", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-[#ED3F25] border-t border-gray-200 py-10 px-4 md:px-10 lg:px-20 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">

        {/* Logo Section */}
        <div className="text-center md:text-left">
          <img src={WordMark2} alt="Kangina Logo" className="h-20 mx-auto md:mx-0" />
          <p className="text-sm mt-2">
            © 2025 — 2026 <br />
            <a href="#" className="hover:underline">
              Privacy and Terms
            </a>
          </p>
        </div>

        {/* Contact Section */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Get in touch</h3>

          <div className="mt-2 space-y-2">
            {contactInfo.map(({ icon: Icon, text }, idx) => (
              <div key={idx} className="flex items-center justify-center md:justify-start gap-2">
                <Icon className="h-5 w-5" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Links Section */}
        <div className="text-center md:text-right">
          <ul className="space-y-2">
            {footerLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;