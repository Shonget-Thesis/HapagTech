// src/api/productApi.ts
import api from '../../lib/api';
import { Product, CategoryOption } from '../../utils/types';

const handleApiError = (action: string, error: unknown): never => {
  console.error(`Product API error during ${action}:`, error);
  throw new Error(`Unable to ${action}. Please try again later.`);
};

// Product-related API calls
export const getCategories = async (): Promise<CategoryOption[]> => {
  try {
    const { data } = await api.get<CategoryOption[]>('/categories/');
    return data;
  } catch (error) {
    return handleApiError('load categories', error);
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const { data } = await api.get<Product[]>(`/products/category/${category}/`);
    return data;
  } catch (error) {
    return handleApiError(`load products for category ${category}`, error);
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const { data } = await api.get<Product[]>(`/products/search?q=${encodeURIComponent(query)}`);
    return data;
  } catch (error) {
    return handleApiError(`search products for query "${query}"`, error);
  }
};