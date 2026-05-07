import { useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import Icon1 from "../../assets/ServiceIcon1.png"
import Icon2 from "../../assets/ServiceIcon2.png"
import Icon3 from "../../assets/ServiceIcon3.png"

interface ServiceCardData {
  image: string
  title: string
  description: string
  accent: string
  gradientFrom: string
  gradientTo: string
  glowColor: string
}

const serviceCards: ServiceCardData[] = [
  {
    image: Icon1,
    title: 'Easy Order System',
    description: 'Seamlessly place your orders with just a few taps for a hassle-free experience.',
    accent: '#EC4024',
    gradientFrom: '#EC4024',
    gradientTo: '#FF7059',
    glowColor: 'rgba(236,64,36,0.35)',
  },
  {
    image: Icon2,
    title: 'Quality Food',
    description: 'Savor expertly crafted dishes made with the finest and local ingredients.',
    accent: '#FF5300',
    gradientFrom: '#FF5300',
    gradientTo: '#FF8D56',
    glowColor: 'rgba(255,83,0,0.35)',
  },
  {
    image: Icon3,
    title: 'Quick Delivery',
    description: 'Enjoy fast, fresh, and flavorful meals delivered straight to your doorstep.',
    accent: '#FFAE00',
    gradientFrom: '#FFAE00',
    gradientTo: '#FFD476',
    glowColor: 'rgba(255,174,0,0.35)',
  },
]

const ServiceCard: React.FC<ServiceCardData> = ({
  image,
  title,
  description,
  gradientFrom,
  gradientTo,
  glowColor,
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ '--glow': glowColor } as CSSProperties}
      className="group relative w-full h-36 cursor-pointer select-none overflow-hidden rounded-md transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]"
    >
      <motion.div
        animate={hovered ? 'hover' : 'rest'}
        variants={{
          rest: { y: 0, boxShadow: `0 2px 8px rgba(0,0,0,0.08)` },
          hover: {
            y: -3,
            boxShadow: `0 10px 22px ${glowColor}, 0 3px 10px rgba(0,0,0,0.12)`,
          },
        }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="relative flex h-full w-full overflow-hidden rounded-md"
        style={{ background: `linear-gradient(145deg, ${gradientFrom}, ${gradientTo})` }}
      >
        {/* Icon + Title */}
        <motion.div
          animate={hovered ? { opacity: 0, y: -15 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-1"
        >
          <img
            src={image}
            alt={title}
            className="h-14 w-16 object-contain brightness-0 invert drop-shadow-sm"
          />
          <h3 className="text-sm md:text-base font-extrabold uppercase tracking-wide text-white drop-shadow-sm">
            {title}
          </h3>
        </motion.div>

        {/* Description */}
        <motion.div
          animate={hovered ? { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 } : { opacity: 0, y: 15, filter: 'blur(6px)', scale: 0.98 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center px-2 text-center"
        >
          <p className="max-w-[26ch] text-md md:text-lg font-medium leading-5 text-white/95">
            {description}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const Features = () => {
  return (
    <section className="bg-[#2D2D2D] py-12 font-sans">
      <div className="relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <motion.div
          className="grid gap-14 md:grid-cols-3 lg:gap-16" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {serviceCards.map((card) => (
            <motion.div
              key={card.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeInOut" },
                },
              }}
            >
              <ServiceCard {...card} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Features
