import Header from "../components/Header";
import Footer from "./landing/Footer";
import { useEffect } from "react";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="page-shell bg-white text-[#32347C] min-h-screen">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-24 md:py-28">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FF5300]">Legal</p>
              <h1 className="mt-3 text-4xl font-extrabold">Terms & Conditions</h1>
            </div>
            <div className="rounded-3xl border border-[#32347C]/10 bg-white p-6 shadow-sm md:p-8 space-y-5 leading-7 text-[#525252]">
              <p className="text-sm font-semibold text-[#32347C]">Last updated: May 7, 2026</p>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#32347C]">Acceptance of Terms</h3>
                <p>By using Kangina's website and services, you agree to these Terms and any updates. Please read them carefully.</p>
              </section>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#32347C]">Services</h3>
                <p>We provide online ordering and delivery services for prepared food items. Availability may vary by location.</p>
              </section>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#32347C]">Orders & Payments</h3>
                <p>Prices and availability are subject to change. Payment must be authorized when placing an order. Refunds and cancellations are handled per our refund policy.</p>
              </section>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#32347C]">User Responsibilities</h3>
                <p>Users must provide accurate information and comply with applicable laws when using our services.</p>
              </section>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#32347C]">Limitation of Liability</h3>
                <p>To the fullest extent permitted by law, Kangina is not liable for indirect or consequential damages arising from use of the service.</p>
              </section>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#32347C]">Governing Law</h3>
                <p>These Terms are governed by the laws of the Philippines.</p>
              </section>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#32347C]">Contact</h3>
                <p>Questions about these Terms: kangina.ph@domain.com</p>
              </section>
            </div>
      </main>
      <Footer />
    </div>
  )
}

export default TermsAndConditions
