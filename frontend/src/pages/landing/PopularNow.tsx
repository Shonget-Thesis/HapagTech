import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Product = {
  id: number
  name: string
  price: number
  image_url?: string
  description?: string
  category?: string
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const tooltipVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
}

const ItemCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl border border-black/5 bg-white shadow-lg transition-transform duration-300 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-44 overflow-hidden rounded-t-xl bg-white">
        {product.image_url ? (
          <motion.img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-semibold text-[#2D2D2D]">
            No Image
          </div>
        )}
      </div>
      <div className="relative space-y-2 p-4">
        <h3 className="text-lg font-semibold text-[#2D2D2D]">{product.name}</h3>
        <p className="text-sm text-[#2D2D2D]/75">₱{Number(product.price).toFixed(0)}</p>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50 bg-white border border-black/10 rounded-lg shadow-lg p-4 max-w-xs"
            style={{ pointerEvents: 'none' }}
          >
            <div className="text-sm">
              <p className="font-semibold mb-1">{product.name}</p>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-xs text-gray-500">Category: {product.category}</p>
            </div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

// Helper: chunk into groups of 4
const chunkProducts = (arr: Product[], size: number) => {
  const chunks: Product[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

const PopularNow: React.FC = () => {
  // Dummy products for local testing
  const [products] = useState<Product[]>([
    { id: 1, name: 'Pizza', price: 250, image_url: 'https://via.placeholder.com/300x200' },
    { id: 2, name: 'Burger', price: 150, image_url: 'https://via.placeholder.com/300x200' },
    { id: 3, name: 'Pasta', price: 200, image_url: 'https://via.placeholder.com/300x200' },
    { id: 4, name: 'Salad', price: 120, image_url: 'https://via.placeholder.com/300x200' },
    { id: 5, name: 'Sushi', price: 300, image_url: 'https://via.placeholder.com/300x200' },
    { id: 6, name: 'Steak', price: 500, image_url: 'https://via.placeholder.com/300x200' },
    { id: 7, name: 'Tacos', price: 180, image_url: 'https://via.placeholder.com/300x200' },
    { id: 8, name: 'Ice Cream', price: 100, image_url: 'https://via.placeholder.com/300x200' },
  ])

  const chunks = chunkProducts(products, 4)
  const [currentIndex, setCurrentIndex] = useState(1) // start at 1 for loop effect
  const [slides, setSlides] = useState<Product[][]>([])
  const slideContainerRef = useRef<HTMLDivElement | null>(null)
  const timerRef = useRef<number | null>(null)
  const isTransitioning = useRef(false)

  // Setup looped slides
  useEffect(() => {
    if (chunks.length === 0) return
    const last = chunks[chunks.length - 1]
    const first = chunks[0]
    setSlides([last, ...chunks, first])
    setCurrentIndex(1)
  }, [products])

  // Handle infinite loop transition
  useEffect(() => {
    if (!slideContainerRef.current || slides.length === 0) return

    const handleTransitionEnd = () => {
      isTransitioning.current = false
      if (currentIndex >= slides.length - 1) {
        slideContainerRef.current!.style.transition = 'none'
        setCurrentIndex(1)
        setTimeout(() => {
          slideContainerRef.current!.style.transition = 'transform 700ms ease-in-out'
        }, 10)
      }
      if (currentIndex <= 0) {
        slideContainerRef.current!.style.transition = 'none'
        setCurrentIndex(slides.length - 2)
        setTimeout(() => {
          slideContainerRef.current!.style.transition = 'transform 700ms ease-in-out'
        }, 10)
      }
    }

    const container = slideContainerRef.current
    container.addEventListener('transitionend', handleTransitionEnd)
    return () => container.removeEventListener('transitionend', handleTransitionEnd)
  }, [currentIndex, slides.length])

  // Auto-slide
  useEffect(() => {
    if (slides.length > 0) startAutoSlide()
    return () => stopAutoSlide()
  }, [slides.length])

  const startAutoSlide = () => {
    if (timerRef.current !== null) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!isTransitioning.current) {
        isTransitioning.current = true
        setCurrentIndex(prev => prev + 1)
      }
    }, 4000) as unknown as number
  }

  const stopAutoSlide = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const nextSlide = () => {
    if (!isTransitioning.current) {
      isTransitioning.current = true
      setCurrentIndex(prev => prev + 1)
    }
  }

  const prevSlide = () => {
    if (!isTransitioning.current) {
      isTransitioning.current = true
      setCurrentIndex(prev => prev - 1)
    }
  }

  if (slides.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-[#FFAE00] py-10 md:py-12 text-[#2D2D2D]">
      <div className="relative mx-auto w-full max-w-7xl px-2">
        <div className="mb-8 text-center">
          <h2 className="mx-auto w-fit text-6xl font-extrabold tracking-tight text-[#2D2D2D] md:text-6xl">
            Popular Now
          </h2>
        </div>

        <div className="relative">
          {/* Floating arrows outside cards */}
          <button
            onClick={prevSlide}
            className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 text-[#2D2D2D] hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 text-[#2D2D2D] hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={40} />
          </button>

          <div
            ref={slideContainerRef}
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            onMouseEnter={stopAutoSlide}
            onMouseLeave={startAutoSlide}
          >
            {slides.map((group, groupIndex) => (
              <div key={groupIndex} className="flex w-full flex-shrink-0">
                {group.map((product, index) => (
                  <div key={product.id} className="w-1/4 px-2 sm:w-1/2 md:w-1/4">
                    <ItemCard product={product} index={index} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Optional indicator dots */}
        <div className="mt-6 flex justify-center space-x-2">
          {chunks.map((_, index) => {
            // actual index mapping
            const actualIndex =
              currentIndex === 0
                ? chunks.length - 1
                : currentIndex === slides.length - 1
                ? 0
                : currentIndex - 1
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index + 1)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === actualIndex ? 'bg-[#2D2D2D]' : 'bg-[#2D2D2D]/30'
                }`}
              />
            )
          })}
        </div>

        <motion.p
          className="mt-8 text-center text-2xl text-[#2D2D2D]/80 md:text-3xl italic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          Fresh picks from the kitchen
        </motion.p>
      </div>
    </section>
  )
}

export default PopularNow
