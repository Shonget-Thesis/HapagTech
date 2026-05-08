import Header from "../../components/Header";
import { Hero } from "./Hero";
import PopularNow from "./PopularNow";
import About from "./About";
import Services from "./Services";
import Footer from "./Footer";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Home = () => {
  useEffect(() => {
    const target = sessionStorage.getItem('hapagtech-scroll-target')
    if (!target) return

    const element = document.getElementById(target)
    if (!element) return

    const headerOffset = 80
    const elementPosition = element.getBoundingClientRect().top
    window.scrollTo({
      top: elementPosition + window.pageYOffset - headerOffset,
      behavior: 'smooth',
    })
    sessionStorage.removeItem('hapagtech-scroll-target')
  }, [])

  return (
    <div className="w-full max-w mx-auto">
      <Header />

      <motion.div
        id="home"
        style={{ paddingTop: '18px' }}
        initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <Hero />
      </motion.div>

      <motion.div
        id="popular"
        initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <PopularNow />
      </motion.div>

      <motion.div
        id="about"
        initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <About />
      </motion.div>

      <motion.div
        id="services"
        initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <Services />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default Home;