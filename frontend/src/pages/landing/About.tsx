import { motion } from 'framer-motion';
import Carousel from '../../components/ui/Carousel';
import AnimatedCounter from '../../components/ui/AnimatedCounter';

const About = () => {
  return (
    <section className="bg-white py-12 text-[#2D2D2D] md:mt-0.4">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-22">
        <motion.div
          className="w-full flex justify-center"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full h-full md:w-1/2 sm:w-2/3 lg:w-1/3 mb-6 md:mb-0 flex justify-center flex-1">
            <Carousel />
          </div>
        </motion.div>

        {/* Text and Stats */}
        <motion.div
          className="w-full text-center md:text-left flex flex-col justify-center items-center md:items-start lg:max-w-[560px] lg:mx-0"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated Heading */}
          <motion.h2
            className="text-[3em] uppercase font-bold text-[#2D2D2D]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            We are Kangina.
          </motion.h2>

          {/* Animated Paragraph */}
          <motion.p
            className="w-full max-w-[58ch] font-light text-lg mb-6 text-[#2D2D2D]/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Our adventure began in a humble kitchen where we discovered that the true secret ingredient wasn't in the pantry—it was in the playful spirit of every "tarantado" who dared to break the rules. We take pride in transforming everyday ingredients into masterpieces that carry the soul of Filipino cooking, spiced up with a hint of rebellious wit.
          </motion.p>

          {/* Animated Statistics Section with Dynamic Counters */}
          <motion.div
            className="flex flex-wrap justify-center md:justify-start gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
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