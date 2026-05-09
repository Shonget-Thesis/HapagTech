import { useQueryCart } from './useQueryCart';
import { useMutationCart } from './useMutationCart';

export const useCart = () => {
  const { cartQuery } = useQueryCart();
  const { 
    addItemMutation, 
    removeItemMutation, 
    updateQuantityMutation 
  } = useMutationCart();

  const items = cartQuery.data || [];
  const isLoading = cartQuery.isLoading;

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.product_price * item.quantity), 0);

  return {
    items,
    isLoading,
    totalItems,
    totalPrice,
    addItem: async (productId: number, quantity: number) => addItemMutation.mutateAsync({ productId, quantity }),
    removeItem: async (productId: number) => removeItemMutation.mutateAsync(productId),
    updateQuantity: async (productId: number, quantity: number) => updateQuantityMutation.mutateAsync({ productId, quantity })
  };
};
