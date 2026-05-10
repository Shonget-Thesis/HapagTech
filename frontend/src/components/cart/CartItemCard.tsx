import { memo, useEffect, useRef, useState } from 'react';
import { CartItem, Product } from '../../utils/types';

interface CartItemCardProps {
  item: CartItem;
  product: Product;
  onQuantityChange: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

const CartItemCard = memo(({ item, product, onQuantityChange, onRemove }: CartItemCardProps) => {
  if (!item || !product) return null;

  const price = Number(product.price) || 0;
  const quantity = item.quantity || 1;
  const itemTotal = price * quantity;

  const [localQuantity, setLocalQuantity] = useState(quantity);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastUpdateRef = useRef(quantity);

  const handleQuantityChange = (newQuantity: number) => {
    const nextQuantity = Math.max(1, Number.isFinite(newQuantity) ? newQuantity : quantity);
    setLocalQuantity(nextQuantity);
  };

  useEffect(() => {
    if (localQuantity === lastUpdateRef.current) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      lastUpdateRef.current = localQuantity;
      if (item.product) onQuantityChange(item.product, localQuantity);
    }, 600);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [localQuantity, item.product, onQuantityChange]);

  useEffect(() => {
    const currentQuantity = item.quantity || quantity;
    if (currentQuantity !== lastUpdateRef.current) {
      setLocalQuantity(currentQuantity);
      lastUpdateRef.current = currentQuantity;
    }
  }, [item.quantity, quantity]);

 return (
  <div className="rounded-3xl bg-[#FFAE00] px-4 py-3 shadow-md">
    
    {/* Row 1: Name + Total */}
    <div className="flex items-start justify-between gap-2">
      <p className="text-md font-semibold text-[#1F1F29] leading-snug">{product.name}</p>
      <p className="text-md font-bold text-[#1F1F29] whitespace-nowrap">₱ {itemTotal.toFixed(2)}</p>
    </div>

    {/* Row 1.5: Per-item price (single line, tight spacing) */}
    <p className="text-xs text-[#2D2D2D] mb-2">₱ {price.toFixed(2)} each</p>

    {/* Row 2: Quantity + Remove */}
    <div className="flex items-center justify-between mt-1 gap-2">
      <div className="flex items-center rounded-full bg-[#F3E8CC] overflow-hidden">
        <button
          type="button"
          onClick={() => handleQuantityChange(localQuantity - 1)}
          disabled={localQuantity <= 1}
          className="w-7 h-7 flex items-center justify-center text-[#FF5300] font-bold text-base disabled:opacity-40 hover:bg-white/10 transition-colors cursor-pointer"
        >
          −
        </button>
        <span className="w-6 text-center text-xs font-bold text-[#2D2D2D] select-none">
          {localQuantity}
        </span>
        <button
          type="button"
          onClick={() => handleQuantityChange(localQuantity + 1)}
          className="w-7 h-7 flex items-center justify-center text-[#FF5300] font-bold text-base hover:bg-white/10 transition-colors cursor-pointer"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => item.product && onRemove(item.product)}
        className="h-7 px-3 rounded-full bg-[#FF5300] text-[10px] font-semibold text-white hover:bg-[#FF5300]/80 transition-colors cursor-pointer"
      >
        Remove
      </button>
    </div>
  </div>
);

});

CartItemCard.displayName = 'CartItemCard';

export default CartItemCard;