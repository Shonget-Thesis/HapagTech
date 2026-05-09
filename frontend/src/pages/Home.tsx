import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LeftSidebar from '../components/layout/LeftSidebar';
import RightSidebar from '../components/layout/RightSidebar';
import useAppStore from '../store/HomeUserStore';
import { useProducts } from '../hooks/products/useProducts';
import { CategorySelector } from '../components/products/CatergorySelector';
import { ProductGrid } from '../components/products/ProductGrid';
import SearchBar from '../components/Searchbar';
import UserProfile from '../components/profile/UserProfile';

const Home: React.FC = () => {
  const location = useLocation();
  const { activeSection, setActiveSection } = useAppStore();

  useEffect(() => {
    if (location.pathname.includes('/home/profile')) {
      setActiveSection('profile');
    } else if (location.pathname.includes('/home/checkout')) {
      setActiveSection('checkout');
    } else if (location.pathname === '/home' || location.pathname === '/home/') {
      setActiveSection('home');
    }
  }, [location.pathname, setActiveSection]);

  const {
    categories, products, selectedCategory, handleCategorySelect,
    handleSearch, searchQuery, dietaryOptions, selectedDietaryFilters,
    toggleDietaryFilter, clearDietaryFilters,
    isLoading: productsLoading, isError: productsError, error: productsErrorDetails
  } = useProducts();

  return (
    <div className="flex h-screen overflow-hidden">
      <LeftSidebar />

      <div className="flex-1 overflow-y-auto relative pl-22">
        <div className="bg-gray-50 min-h-screen px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-8">
          {activeSection === 'profile' ? (
            <UserProfile />
          ) : (
            <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6">
              <SearchBar
                className="w-full cursor-pointer"
                onSearch={handleSearch}
                initialValue={searchQuery}
                dietaryOptions={dietaryOptions}
                selectedDietaryFilters={selectedDietaryFilters}
                onToggleDietaryFilter={toggleDietaryFilter}
                onClearDietaryFilters={clearDietaryFilters}
              />
              <div className="cursor-pointer">
                <CategorySelector
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={handleCategorySelect}
                  isLoading={productsLoading}
                  isError={productsError}
                />
              </div>
              <div className="border-b border-slate-200/80" />

              {searchQuery.trim() !== '' && (
                <div className="text-sm font-medium text-slate-600">
                  <span className="text-slate-500">Search results for:</span>{' '}
                  <span className="text-slate-800 font-semibold">"{searchQuery}"</span>
                  {products.length === 0 && !productsLoading && (
                    <span className="ml-2 text-slate-400 text-xs">(no results)</span>
                  )}
                </div>
              )}

              <ProductGrid
                products={products}
                isLoading={productsLoading}
                isError={productsError}
                error={productsErrorDetails}
              />
            </div>
          )}
        </div>
      </div>

      <RightSidebar />
    </div>
  );
};

export default Home;