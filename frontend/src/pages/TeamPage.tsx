import Header from "../components/Header";
import Team from "./landing/Team";
import Footer from "./landing/Footer";
import { useEffect } from "react";

const TeamPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="page-shell w-full max-w mx-auto bg-white text-[#32347C]">
      <Header />
      <div className="pt-28">
        <Team />
      </div>
      <Footer />
    </div>
  )
}

export default TeamPage
