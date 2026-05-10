import React, { useEffect } from 'react';
import { ProductDetailModalProps, Product } from '../../utils/types';
import { useFavorites } from '../../hooks/favorites/usefavorites';
import { useCart } from '../../hooks/cart/usecart';
import { useAuthStore } from '../../hooks/auth/useauth';
import { useNavigate } from 'react-router-dom';
import { DIETARY_FILTER_OPTIONS, DIETARY_KEYWORDS } from '../../utils/dietaryFilters';

const extractDietaryTags = (product: Product) => {
  const searchText = [product.dietary_info, product.name, product.ingredients]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .replace(/[_-]/g, ' ');

  if (!searchText.trim()) {
    return [];
  }

  return [...new Set(
    DIETARY_FILTER_OPTIONS.filter(({ value }) => {
      const keywords = DIETARY_KEYWORDS[value] ?? [value];
      return keywords.some((keyword) => searchText.includes(keyword));
    }).map((option) => option.label)
  )];
};

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onToggleFavorite
}) => {
  const navigate = useNavigate();
  const { isFavorite } = useFavorites();
  const { addItem, isLoading: isCartLoading } = useCart();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const formatPrice = (price: number | string | undefined) => {
    if (price === undefined || price === null) return 'N/A';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(numPrice) ? 'N/A' : `₱${numPrice.toFixed(2)}`;
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await addItem(product.id, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const dietaryTags = extractDietaryTags(product);

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
        <div className="relative mx-auto w-full max-w-3xl max-h-[calc(100vh-3rem)] overflow-hidden rounded-[32px] bg-white/95 shadow-[0_32px_100px_rgba(15,23,42,0.18)] ring-1 ring-slate-950/5 backdrop-blur-xl">
          <div className="flex h-full flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-y-auto scrollbar-hidden px-6 pt-6 pb-4">
              <button
                onClick={onClose}
                className="absolute right-6 top-6 inline-flex cursor-pointer h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="mb-4">
                <h2 className="text-3xl font-bold text-slate-900">{product.name}</h2>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700">Description</h3>
                <p className="text-sm text-gray-600">
                  {product.description || 'No description available'}
                </p>
              </div>

              <div className="mb-4">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-56 rounded-3xl object-cover" />
                ) : (
                  <div className="w-full h-56 rounded-3xl bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700">Ingredients</h3>
                <p className="text-sm text-gray-600">{product.ingredients || 'No ingredients listed'}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700">Serving Size</h3>
                <p className="text-sm text-gray-600">{product.serving_size || 'N/A'}</p>
              </div>

              <div className={dietaryTags.length > 0 ? 'mb-4' : 'mb-0'}>
                <h3 className="font-semibold text-gray-700">Dietary Info</h3>
                <p className="text-sm text-gray-600">{product.dietary_info || 'No info'}</p>
              </div>

              {dietaryTags.length > 0 && (
                <div className="mb-0">
                  <h3 className="font-semibold text-gray-700">Tags</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {dietaryTags.map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-200/70 bg-white/90 px-6 py-5 backdrop-blur-sm">
              <span className="text-lg font-bold text-black block mb-3">
                {formatPrice(product.price)}
              </span>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={onToggleFavorite}
                  className={`flex-1 cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition-transform duration-200 shadow-sm transform-gpu hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500/40 ${
                    isFavorite(product.id)
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-white border-2 border-red-500 text-red-500 hover:bg-red-50'
                  }`}
                >
                  {isFavorite(product.id) ? 'Added to Favorites' : 'Add to Favorites'}
                </button>
                <button
                  className={`flex-1 cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-slate-900 transition-transform duration-200 shadow-sm transform-gpu hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FFAE00]/40 ${
                    isCartLoading ? 'bg-yellow-300 cursor-not-allowed opacity-80' : 'bg-[#FFAE00] hover:bg-yellow-600'
                  }`}
                  onClick={handleAddToCart}
                  disabled={isCartLoading}
                >
                  {isCartLoading ? 'Adding...' : isAuthenticated ? 'Add to Cart' : 'Login to Add'}
                </button>
              </div>
            </div>          
          </div>
        </div>
      </div>
    </>
  );
};  
