import { motion } from "framer-motion";
import Header from "../components/Header";
import Team from "./landing/Team";
import Footer from "./landing/Footer";
import { useEffect } from "react";

const TeamPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <motion.div
      className="page-shell w-full max-w mx-auto bg-white text-[#32347C]"
      initial={{ opacity: 0 }}    
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <Header />
      <div className="pt-28">
        <Team />
      </div>
      <Footer />
    </motion.div>
  );
};

export default TeamPage;
