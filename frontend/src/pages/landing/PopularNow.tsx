import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getAllProducts } from '../../api/products/productApi'
import { Product } from '../../utils/types'

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
      className="group relative overflow-hidden rounded-[1.6rem] border border-black/5 bg-white shadow-[0_18px_60px_rgba(47,39,18,0.12)] transition-transform duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-44 overflow-hidden rounded-t-[1.6rem] bg-white">
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
            className="absolute top-full left-1/2 z-50 mt-2 max-w-xs -translate-x-1/2 transform rounded-lg border border-black/10 bg-white p-4 shadow-lg"
            style={{ pointerEvents: 'none' }}
          >
            <div className="text-sm">
              <p className="mb-1 font-semibold">{product.name}</p>
              <p className="mb-2 text-gray-600">{product.description}</p>
              <p className="text-xs text-gray-500">Category: {product.category}</p>
            </div>
            <div className="absolute -top-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-b-4 border-transparent border-b-white"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

const chunkProducts = (arr: Product[], size: number) => {
  const chunks: Product[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

const PopularNow: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [currentIndex, setCurrentIndex] = useState(1)
  const slideContainerRef = useRef<HTMLDivElement | null>(null)
  const timerRef = useRef<number | null>(null)
  const isTransitioning = useRef(false)

  const displayProducts = products.slice(0, 8)
  const chunks = chunkProducts(displayProducts, 4)
  const slides = chunks.length > 1 ? [chunks[chunks.length - 1], ...chunks, chunks[0]] : chunks

  useEffect(() => {
    let mounted = true

    getAllProducts()
      .then(data => {
        if (!mounted) return
        setProducts(data.slice(0, 8))
      })
      .catch(() => {
        if (!mounted) return
        setProducts([])
      })

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (slides.length > 1) {
      setCurrentIndex(1)
    } else {
      setCurrentIndex(0)
    }
  }, [slides.length])

  useEffect(() => {
    if (!slideContainerRef.current || slides.length <= 1) return

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

  useEffect(() => {
    if (slides.length > 1) startAutoSlide()
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
    if (!isTransitioning.current && slides.length > 1) {
      isTransitioning.current = true
      setCurrentIndex(prev => prev + 1)
    }
  }

  const prevSlide = () => {
    if (!isTransitioning.current && slides.length > 1) {
      isTransitioning.current = true
      setCurrentIndex(prev => prev - 1)
    }
  }

  if (products.length === 0) {
    return (
      <section className="relative overflow-hidden bg-[#FFAE00] py-10 md:py-12 text-[#2D2D2D]">
        <div className="relative mx-auto w-full max-w-7xl px-2">
          <div className="mb-8 text-center">
            <h2 className="mx-auto w-fit text-6xl font-extrabold tracking-tight text-[#2D2D2D] md:text-6xl">
              Popular Now
            </h2>
          </div>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex h-44 items-center justify-center rounded-[1.6rem] border border-black/5 bg-white p-4 shadow-[0_12px_40px_rgba(47,39,18,0.1)]">
                Loading...
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden bg-[#FFAE00] py-10 md:py-12 text-[#2D2D2D]">
      <div className="relative mx-auto w-full max-w-7xl px-2">
        <div className="mb-8 text-center">
          <h2 className="mx-auto w-fit text-6xl font-extrabold tracking-tight text-[#2D2D2D] md:text-6xl">
            Popular Now
          </h2>
        </div>

        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute -left-12 top-1/2 z-10 -translate-y-1/2 text-[#2D2D2D] transition-opacity hover:opacity-100"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-12 top-1/2 z-10 -translate-y-1/2 text-[#2D2D2D] transition-opacity hover:opacity-100"
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

        <div className="mt-6 flex justify-center space-x-2">
          {chunks.map((_, index) => {
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
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
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
