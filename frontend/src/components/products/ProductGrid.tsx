import React from 'react';
import { ProductGridProps } from '../../utils/types';
import { ProductCard } from './ProductCard';

const SkeletonCard = () => (
  <div className="w-full overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.07)]">
    <div className="w-full animate-pulse bg-slate-200" style={{ aspectRatio: '4/3' }} />
    <div className="p-3">
      <div className="mb-1.5 h-4 w-3/4 animate-pulse rounded-full bg-slate-200" />
      <div className="mb-3 h-3 w-1/3 animate-pulse rounded-full bg-slate-100" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-9 animate-pulse rounded-full bg-slate-200" />
        <div className="h-9 animate-pulse rounded-full bg-slate-100" />
      </div>
    </div>
  </div>
);

export const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading, isError, error }) => {
  if (isError) {
    return (
      <div className="rounded-xl bg-red-50 p-4 text-red-600">
        <p>Error: {error?.message || 'Failed to fetch products'}</p>
      </div>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <div className="rounded-xl bg-yellow-50 p-4 text-yellow-600">
        <p>No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-5">
      {isLoading
        ? [...Array(10)].map((_, i) => <SkeletonCard key={i} />)
        : products.map((product) => <ProductCard key={product.id} product={product} />)
      }
    </div>
  );
};