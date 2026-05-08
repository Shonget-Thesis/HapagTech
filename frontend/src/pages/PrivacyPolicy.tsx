import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "./landing/Footer";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <motion.div
      className="page-shell w-full max-w mx-auto bg-white text-[#FF5300]"
      initial={{ opacity: 0 }}    
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-24 md:py-28">
        <div className="mb-8">
          <h1 className="mt-3 text-4xl font-extrabold text-center">Privacy Policy</h1>
        </div>
        <div className="rounded-3xl border border-[#FFAE00]/50 bg-white p-6 shadow-md md:p-8 space-y-5 leading-7 text-[#525252]">
          <p className="text-sm font-semibold text-[#2D2D2D]">Last updated: May 7, 2026</p>
          <p>
            HapagTech ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
          <section>
            <h3 className="mb-2 text-lg font-semibold text-[#FF5300]">Information We Collect</h3>
            <p>We may collect personal information you provide directly (e.g., name, email, shipping address), payment information used to process orders, and usage data (e.g., pages visited, products viewed).</p>
          </section>
          <section>
            <h3 className="mb-2 text-lg font-semibold text-[#FF5300]">How We Use Your Information</h3>
            <p>We use information to provide, maintain and improve our services, process orders, communicate with you, and personalize your experience. We may also use data for analytics and fraud prevention.</p>
          </section>
          <section>
            <h3 className="mb-2 text-lg font-semibold text-[#FF5300]">Sharing & Disclosure</h3>
            <p>We do not sell your personal information. We may share data with service providers (payment processors, shipping partners) and when required by law.</p>
          </section>
          <section>
            <h3 className="mb-2 text-lg font-semibold text-[#FF5300]">Your Choices</h3>
            <p>You may access, correct, or delete your personal information by contacting us. You can opt out of marketing communications at any time.</p>
          </section>
          <section>
            <h3 className="mb-2 text-lg font-semibold text-[#FF5300]">Security</h3>
            <p>We implement reasonable security measures to protect your information, but no system is completely secure.</p>
          </section>
          <section>
            <h3 className="mb-2 text-lg font-semibold text-[#FF5300]">Contact Us</h3>
            <p>If you have questions about this policy, contact us at hapagtech.ph@domain.com.</p>
          </section>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default PrivacyPolicy;
