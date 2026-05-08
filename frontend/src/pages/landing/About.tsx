import { motion } from 'framer-motion';
import Carousel from '../../components/ui/Carousel';
import AnimatedCounter from '../../components/ui/AnimatedCounter';
import StoryTitle from '../../assets/StoryTitle.png';

const About = () => {
  return (
    <section className="bg-white py-12 text-[#2D2D2D] md:mt-0.4">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-22">
        <motion.div
          className="w-full flex justify-center"
        >
          <div className="w-full h-full md:w-1/2 sm:w-2/3 lg:w-1/3 mb-6 md:mb-0 flex justify-center flex-1">
            <Carousel />
          </div>
        </motion.div>

        {/* Text and Stats */}
        <motion.div
          className="w-full text-center md:text-left flex flex-col justify-center items-center md:items-start lg:max-w-[560px] lg:mx-0"
        >
        <motion.img
          src={StoryTitle}
          alt="Story Title"
          className="mb-6 md:mb-0 max-h-[12em] w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
          {/* Animated Paragraph */}
          <motion.p
            className="w-full max-w-[58ch] font-light text-lg mb-6 text-[#2D2D2D]/90"
          >
            Sa ating mga hapag-kainan nagsisimula ang mga kwento, mga tawanan, ideya, at koneksyong bumubuo sa bawat komunidad. At HAPAG TECH, we bring together the warmth of traditional Filipino gatherings and the dynamic spirit of modern technology to create experiences that do more than satisfy—they inspire connection, collaboration, and creativity.
          </motion.p>

          {/* Animated Statistics Section with Dynamic Counters */}
          <motion.div
            className="flex flex-wrap justify-center md:justify-start gap-8 mb-8"
          >
            {/* Individual Stats with Dynamic Counting */}
            <AnimatedCounter targetValue={5432} label="active customers" delay={800} />
            <AnimatedCounter targetValue={9876} label="satisfied diners" delay={1000} />
            <AnimatedCounter targetValue={16} label="award winning" delay={1200} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;