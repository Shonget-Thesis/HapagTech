import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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

const ItemCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => (
  <motion.article
    custom={index}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="group relative overflow-hidden rounded-[1.6rem] border border-black/5 bg-white shadow-[0_18px_60px_rgba(47,39,18,0.12)] transition-transform duration-300"
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
  </motion.article>
)

const PopularNow: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    let mounted = true
    getAllProducts()
      .then(data => {
        if (!mounted) return
        const available = data.filter(p => p.available).slice(0, 8)
        setProducts(available)
      })
      .catch(() => {
        // ignore errors silently — keep sample fallback
      })

    return () => { mounted = false }
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#FFAE00] py-10 md:py-12 text-[#2D2D2D]">

      <motion.div
        className="relative mx-auto w-full max-w-7xl px-2"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-8 text-center">
          <h2 className="mx-auto w-fit text-6xl font-extrabold tracking-tight text-[#2D2D2D] md:text-6xl">
            Popular Now
          </h2>
        </div>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
          {products.length > 0 ? (
            products.map((product, index) => <ItemCard key={product.id} product={product} index={index} />)
          ) : (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-[1.6rem] bg-white p-4 flex items-center justify-center h-44 border border-black/5 shadow-[0_12px_40px_rgba(47,39,18,0.1)]">
                Loading...
              </div>
            ))
          )}
        </div>

        <motion.p
          className="mt-8 text-center text-2xl text-[#2D2D2D]/80 md:text-3xl italic"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Fresh picks from the kitchen
        </motion.p>
      </motion.div>
    </section>
  )
}

export default PopularNow
