import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "./landing/Footer";
import { useEffect } from "react";

const TermsAndConditions = () => {
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
              <h1 className="mt-3 text-4xl font-extrabold text-center">Terms & Conditions</h1>
            </div>
            <div className="rounded-3xl border border-[#FFAE00]/50 bg-white p-6 shadow-md md:p-8 space-y-5 leading-7 text-[#525252]">
              <p className="text-sm font-semibold text-[#2D2D2D]">Last updated: May 7, 2026</p>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#FF5300]">Acceptance of Terms</h3>
                <p>By using HapagTech's website and services, you agree to these Terms and any updates. Please read them carefully.</p>
              </section>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#FF5300]">Services</h3>
                <p>We provide online ordering and delivery services for prepared food items. Availability may vary by location.</p>
              </section>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#FF5300]">Orders & Payments</h3>
                <p>Prices and availability are subject to change. Payment must be authorized when placing an order. Refunds and cancellations are handled per our refund policy.</p>
              </section>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#FF5300]">User Responsibilities</h3>
                <p>Users must provide accurate information and comply with applicable laws when using our services.</p>
              </section>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#FF5300]">Limitation of Liability</h3>
                <p>To the fullest extent permitted by law, HapagTech is not liable for indirect or consequential damages arising from use of the service.</p>
              </section>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#FF5300]">Governing Law</h3>
                <p>These Terms are governed by the laws of the Philippines.</p>
              </section>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#FF5300]">Contact</h3>
                <p>Questions about these Terms: hapagtech.ph@domain.com</p>
              </section>
            </div>
      </main>
      <Footer />
    </motion.div>
  )
}

export default TermsAndConditions
