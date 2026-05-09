import { Product } from './types';

export interface DietaryFilterOption {
  value: string;
  label: string;
}

export const DIETARY_FILTER_OPTIONS: DietaryFilterOption[] = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'pescatarian', label: 'Pescatarian' },
  { value: 'flexitarian', label: 'Flexitarian' },
  { value: 'paleo', label: 'Paleo' },
  { value: 'ketogenic', label: 'Keto' },
  { value: 'halal', label: 'Halal' },
  { value: 'kosher', label: 'Kosher' },
  { value: 'fruitarian', label: 'Fruitarian' },
  { value: 'gluten_free', label: 'Gluten Free' },
  { value: 'dairy_free', label: 'Dairy Free' },
  { value: 'organic', label: 'Organic' },
  { value: 'high_protein', label: 'High-Protein' },
  { value: 'spicy', label: 'Spicy' }
];

export const DIETARY_KEYWORDS: Record<string, string[]> = {
  vegetarian: ['vegetarian', 'veggie'],
  vegan: ['vegan'],
  pescatarian: ['pescatarian', 'fish'],
  flexitarian: ['flexitarian'],
  paleo: ['paleo', 'paleolithic'],
  ketogenic: ['ketogenic', 'keto'],
  halal: ['halal'],
  kosher: ['kosher'],
  fruitarian: ['fruitarian'],
  gluten_free: ['gluten free', 'gluten-free', 'glutenfree'],
  dairy_free: ['dairy free', 'dairy-free', 'lactose free', 'lactose-free'],
  organic: ['organic'],
  high_protein: ['high protein', 'protein-rich', 'protein rich', 'chicken', 'beef', 'pork', 'steak', 'egg', 'salmon', 'tuna', 'shrimp', 'tofu', 'beans', 'lentils'],
  spicy: ['spicy', 'hot', 'chili', 'chilli', 'sriracha', 'pepper', 'jalapeno', 'habanero']
};

const normalizeText = (value: string) => value.toLowerCase().replace(/[_-]/g, ' ').trim();

export const matchesDietaryFilters = (product: Product, selectedFilters: string[]) => {
  if (selectedFilters.length === 0) {
    return true;
  }

  const dietaryText = normalizeText(product.dietary_info ?? '');

  if (!dietaryText) {
    return false;
  }

  return selectedFilters.every((filterValue) => {
    const keywords = DIETARY_KEYWORDS[filterValue] ?? [filterValue];
    return keywords.some((keyword) => dietaryText.includes(keyword));
  });
};