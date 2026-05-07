import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCounterProps {
  targetValue: number;
  label: string;
  delay: number;
}

const AnimatedCounter = ({ targetValue, label, delay }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const duration = 2000; // Duration in milliseconds
  const formatCount = (value: number) => new Intl.NumberFormat('en-PH').format(value)
  
  useEffect(() => {
    let startTime: number | undefined;
    let animationFrame: number | undefined;
    const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress < duration) {
        // Calculate the current count based on progress
        const easedProgress = easeOutCubic(progress / duration);
        const nextCount = Math.floor(easedProgress * targetValue);
        setCount(nextCount);
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        // Ensure we reach exactly the target value
        setCount(targetValue);
      }
    };
    
    // Delay the start of counting
    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(updateCount);
    }, delay);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      clearTimeout(timer);
    };
  }, [targetValue, delay, duration]);
  
  return (
    <motion.div
      className="flex min-w-[110px] flex-col"
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay / 1000, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-3xl font-bold tracking-tight text-[#FF5300]">
        {formatCount(count)}
      </span>
      <motion.span
        className="mt-1 block text-sm font-light text-[#2D2D2D]/80"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay / 1000 + 0.1, duration: 0.5 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
};

export default AnimatedCounter;