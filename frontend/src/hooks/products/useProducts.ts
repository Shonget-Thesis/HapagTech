import { useState, useCallback, useMemo } from 'react';
import { useQueryProducts } from './useQueryProducts';
import { Product } from '../../utils/types';
import { DIETARY_FILTER_OPTIONS, matchesDietaryFilters } from '../../utils/dietaryFilters';

export const useProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietaryFilters, setSelectedDietaryFilters] = useState<string[]>([]);
  
  const { categoriesQuery, productsQuery } = useQueryProducts();
  
  const categories = categoriesQuery.data || [];
  const allProducts = productsQuery.data || [];
  const isProductsLoading = productsQuery.isLoading;
  const isError = productsQuery.isError;
  const error = productsQuery.error;

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // Apply category filter
    if (selectedCategory !== 'ALL') {
      result = result.filter((product: Product) => product.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((product: Product) => 
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.dietary_info?.toLowerCase().includes(query)
      );
    }

    if (selectedDietaryFilters.length > 0) {
      result = result.filter((product: Product) => matchesDietaryFilters(product, selectedDietaryFilters));
    }

    return result;
  }, [allProducts, selectedCategory, searchQuery, selectedDietaryFilters]);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query.trim());
    if (query.trim() === '') {
      setSelectedCategory('ALL');
    }
  }, []);

  const toggleDietaryFilter = useCallback((filterValue: string) => {
    setSelectedDietaryFilters((current) => (
      current.includes(filterValue)
        ? current.filter((value) => value !== filterValue)
        : [...current, filterValue]
    ));
  }, []);

  const clearDietaryFilters = useCallback(() => {
    setSelectedDietaryFilters([]);
  }, []);

  return {
    categories,
    products: filteredProducts,
    selectedCategory,
    searchQuery,
    dietaryOptions: DIETARY_FILTER_OPTIONS,
    selectedDietaryFilters,
    isLoading: isProductsLoading,
    isError,
    error,
    handleCategorySelect,
    handleSearch,
    toggleDietaryFilter,
    clearDietaryFilters,
    resetFilters: useCallback(() => {
      setSelectedCategory('ALL');
      setSearchQuery('');
      setSelectedDietaryFilters([]);
    }, [])
  };
};