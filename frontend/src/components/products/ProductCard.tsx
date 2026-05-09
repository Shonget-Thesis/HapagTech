import React, { useState, memo } from 'react';
import { Product, ProductCardProps } from '../../utils/types';
import { useCart } from '../../hooks/cart/usecart';
import { useFavorites } from '../../hooks/favorites/usefavorites';
import { ProductDetailModal } from './ProductDetailModal';
import { DIETARY_FILTER_OPTIONS, DIETARY_KEYWORDS } from '../../utils/dietaryFilters';

const extractDietaryTags = (product: Product) => {
  const searchText = [product.dietary_info, product.name, product.ingredients]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .replace(/[_-]/g, ' ');
  if (!searchText.trim()) return [];
  return [...new Set(
    DIETARY_FILTER_OPTIONS.filter(({ value }) => {
      const keywords = DIETARY_KEYWORDS[value] ?? [value];
      return keywords.some((keyword) => searchText.includes(keyword));
    }).map((option) => option.label)
  )];
};

export const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const { addItem, isLoading: isCartLoading } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(product.id);
  const [showDetails, setShowDetails] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product.id, 1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const dietaryTags = extractDietaryTags(product);

  return (
    <>
      <div className="group flex w-full flex-col overflow-hidden rounded-[24px] border border-slate-100 bg-white/95 shadow-[0_8px_24px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(15,23,42,0.13)] cursor-pointer">
        
        {/* Image */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-100">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-3">
          <div>
            <div className="flex items-start justify-between gap-1">
              <h3 className="truncate text-sm font-bold text-slate-900 leading-snug">
                {product.name}
              </h3>
              <button
                onClick={handleToggleFavorite}
                className={`flex-shrink-0 cursor-pointer rounded-full border border-slate-200 bg-white p-1.5 text-slate-500 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 hover:border-red-200 hover:text-red-500 ${isFav ? 'bg-red-50 text-red-500 shadow-red-100' : ''}`}
                aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  className={`h-4 w-4 transition-all duration-200 ${isFav ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-current'}`}
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <p className="mt-0.5 text-sm font-medium text-slate-500">
              ₱{product.price.toLocaleString()}
            </p>
            {dietaryTags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {dietaryTags.map((tag) => (
                  <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              className={`cursor-pointer h-9 rounded-full text-xs font-semibold text-slate-900 transition-colors duration-300 ${isCartLoading ? 'bg-yellow-400' : 'bg-[#FFAE00] hover:bg-yellow-600'}`}
              onClick={handleAddToCart}
              disabled={isCartLoading}
            >
              {isCartLoading ? 'Adding...' : 'Add to Cart'}
            </button>
            <button
              className="cursor-pointer h-9 rounded-full border border-[#FF5300] bg-white text-xs font-semibold text-slate-900 transition-colors duration-300 hover:bg-[#ffcfb6]"
              onClick={() => setShowDetails(true)}
            >
              View
            </button>
          </div>
        </div>
      </div>

      {showDetails && (
        <ProductDetailModal
          product={product}
          onClose={() => setShowDetails(false)}
          onToggleFavorite={() => toggleFavorite(product.id)}
        />
      )}
    </>
  );
});