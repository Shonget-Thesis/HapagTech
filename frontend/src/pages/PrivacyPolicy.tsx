import Header from "../components/Header";
import Footer from "./landing/Footer";
import { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="page-shell bg-white text-[#32347C] min-h-screen">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-24 md:py-28">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FF5300]">Legal</p>
              <h1 className="mt-3 text-4xl font-extrabold">Privacy Policy</h1>
            </div>
            <div className="rounded-3xl border border-[#32347C]/10 bg-white p-6 shadow-sm md:p-8 space-y-5 leading-7 text-[#525252]">
              <p className="text-sm font-semibold text-[#32347C]">Last updated: May 7, 2026</p>
              <p>
                Kangina (“we”, “our”, “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#32347C]">Information We Collect</h3>
                <p>We may collect personal information you provide directly (e.g., name, email, shipping address), payment information used to process orders, and usage data (e.g., pages visited, products viewed).</p>
              </section>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#32347C]">How We Use Your Information</h3>
                <p>We use information to provide, maintain and improve our services, process orders, communicate with you, and personalize your experience. We may also use data for analytics and fraud prevention.</p>
              </section>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#32347C]">Sharing & Disclosure</h3>
                <p>We do not sell your personal information. We may share data with service providers (payment processors, shipping partners) and when required by law.</p>
              </section>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#32347C]">Your Choices</h3>
                <p>You may access, correct, or delete your personal information by contacting us. You can opt out of marketing communications at any time.</p>
              </section>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#32347C]">Security</h3>
                <p>We implement reasonable security measures to protect your information, but no system is completely secure.</p>
              </section>
              <section>
                <h3 className="mb-2 text-lg font-semibold text-[#32347C]">Contact Us</h3>
                <p>If you have questions about this policy, contact us at kangina.ph@domain.com.</p>
              </section>
            </div>
      </main>
      <Footer />
    </div>
  )
}

export default PrivacyPolicy
