import Header from "../../components/Header";
import { Hero } from "./Hero";
import PopularNow from "./PopularNow";
import About from "./About";
import Services from "./Services";
import Footer from "./Footer";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const target = sessionStorage.getItem('kangina-scroll-target')
    if (!target) return

    const element = document.getElementById(target)
    if (!element) return

    const headerOffset = 80
    const elementPosition = element.getBoundingClientRect().top
    window.scrollTo({
      top: elementPosition + window.pageYOffset - headerOffset,
      behavior: 'smooth',
    })
    sessionStorage.removeItem('kangina-scroll-target')
  }, [])

  return (
    <div className="w-full max-w mx-auto">
      <Header />
      
      {/* Section IDs match the ones used in the Header component */}
      <div id="home" style={{ paddingTop: '18px' }}>
        <Hero />
      </div>

      <div id="popular">
        <PopularNow />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="services">
        <Services />
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;