import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronLeft, CreditCard, MapPin, MessageSquare, ShoppingBag } from 'lucide-react';
import { useAuthStore } from '../hooks/auth/useauth';
import { useCart } from '../hooks/cart/usecart';
import { useOrders } from '../hooks/orders/useorder';
import { useQueryProducts } from '../hooks/products/useQueryProducts';
import useAppStore from '../store/HomeUserStore';
import CartItemCard from '../components/cart/CartItemCard';
import { CartItem, Product } from '../utils/types';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { setActiveSection } = useAppStore();
  const { user } = useAuthStore();
  const { items, totalPrice, removeItem, updateQuantity } = useCart();
  const { productsQuery } = useQueryProducts();
  const { createOrder } = useOrders();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'cash' | 'card' | 'qr'>('cash');
  const [deliveryAddress, setDeliveryAddress] = useState('123 Pacific Avenue, Taguig City');
  const [orderNotes, setOrderNotes] = useState('Leave it at the front desk if I am not around.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationId, setConfirmationId] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const products = productsQuery.data || [];

  useEffect(() => {
    setActiveSection('checkout');
    return () => {
      setActiveSection('home');
    };
  }, [setActiveSection]);

  const cartItems = useMemo(() => {
    return items.map((item: CartItem) => {
      const product = products.find((productItem: Product) => productItem.id === item.product);
      return {
        item,
        product: product ?? {
          id: item.product,
          name: item.product_name || 'Unknown item',
          description: null,
          price: item.product_price || 0,
          image_url: item.product_image || null,
          available: true,
          category: 'UNKNOWN',
          ingredients: null,
          serving_size: null,
          dietary_info: null,
        }
      };
    });
  }, [items, products]);

  const taxAmount = totalPrice * 0.05;
  const orderTotal = totalPrice + taxAmount;
  const deliveryFee = totalPrice > 0 ? 35 : 0;
  const grandTotal = orderTotal + deliveryFee;

  const handleBackToMenu = () => {
    setActiveSection('home');
    navigate('/home');
  };

  const handleQuantityChange = async (productId: number, quantity: number) => {
    if (quantity < 1) return;
    try {
      await updateQuantity(productId, quantity);
    } catch (error) {
      window.alert('Unable to update quantity. Please try again.');
    }
  };

  const handleRemoveItem = async (productId: number) => {
    try {
      await removeItem(productId);
    } catch (error) {
      window.alert('Unable to remove item. Please try again.');
    }
  };

  const handleConfirmOrder = async () => {
    if (!items || items.length === 0) {
      window.alert('Your cart is empty. Add something tasty before checkout.');
      return;
    }

    if (!user) {
      window.alert('Please log in to complete the checkout.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createOrder();
      const nextRef = `HT-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmationId(nextRef);
      setIsConfirmed(true);
    } catch (error) {
      window.alert('Unable to complete checkout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen bg-[#14141E] text-[#F4E8C3]"
    >
      <style>{`
        .checkout-scroll::-webkit-scrollbar { display: none; }
        .checkout-scroll {-ms-overflow-style:none;scrollbar-width:none;}
        .payment-option { transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease; }
        .payment-option:hover { transform: translateY(-2px); }
      `}</style>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleBackToMenu}
            className="inline-flex items-center gap-2 rounded-3xl border border-[#FF5300]/30 bg-[#1F1F2B]/95 px-4 py-3 text-sm font-semibold text-[#F3E8CC] shadow-[0_14px_40px_rgba(0,0,0,0.24)] transition hover:border-[#FFAE00]/40 hover:bg-[#27293f]"
          >
            <ChevronLeft size={18} /> Back to menu
          </button>

          <div className="rounded-3xl border border-[#FF5300]/15 bg-[#1E1E2F]/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            <p className="text-sm uppercase tracking-[0.28em] text-[#FFAE00]">Order flow</p>
            <p className="mt-2 text-sm text-[#D1C5A1]">
              Review cart items, choose delivery, and confirm your payment method for a premium checkout experience.
            </p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
          <section className="rounded-[2rem] border border-[#ffffff0d] bg-[#1B1B28]/95 p-6 shadow-[0_35px_80px_rgba(0,0,0,0.28)]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#FFAE00]">Order summary</p>
                <h1 className="mt-3 text-3xl font-semibold text-white">You're almost there</h1>
              </div>
              <div className="inline-flex items-center gap-2 rounded-3xl bg-[#FF5300]/10 px-4 py-2 text-sm font-semibold text-[#FFAE00]">
                <ShoppingBag size={18} /> {items.length} items
              </div>
            </div>

            <div className="space-y-4 checkout-scroll max-h-[560px] overflow-y-auto pr-2">
              {cartItems.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-[#FFAE00]/20 bg-[#242635]/90 p-8 text-center text-[#d8cfa2]">
                  <p className="text-lg font-medium text-white">Your cart is empty</p>
                  <p className="mt-2 text-sm text-[#B4A672]">Browse the menu and add your favorites before checkout.</p>
                </div>
              ) : (
                cartItems.map(({ item, product }) => (
                  <CartItemCard
                    key={item.product}
                    item={item}
                    product={product}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-[#ffffff0d] bg-[#1B1B28]/95 p-6 shadow-[0_35px_80px_rgba(0,0,0,0.28)]">
              <div className="mb-5 flex items-center gap-3 text-[#FFAE00]">
                <MapPin size={20} />
                <div>
                  <p className="text-sm uppercase tracking-[0.28em]">Delivery address</p>
                  <p className="text-xs text-[#d8cfa2]">Edit the address below or use the default address.</p>
                </div>
              </div>
              <textarea
                className="w-full resize-none rounded-3xl border border-[#ffffff1a] bg-[#14141E] p-4 text-sm text-[#ECE1C3] outline-none transition focus:border-[#FFAE00]/60 focus:ring-1 focus:ring-[#FFAE00]/20"
                rows={4}
                value={deliveryAddress}
                onChange={(event) => setDeliveryAddress(event.target.value)}
              />
            </div>

            <div className="rounded-[2rem] border border-[#ffffff0d] bg-[#1B1B28]/95 p-6 shadow-[0_35px_80px_rgba(0,0,0,0.28)]">
              <div className="mb-5 flex items-center gap-3 text-[#FFAE00]">
                <CreditCard size={20} />
                <div>
                  <p className="text-sm uppercase tracking-[0.28em]">Payment method</p>
                  <p className="text-xs text-[#d8cfa2]">Select the style that suits your order.</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {['cash', 'card', 'qr'].map((method) => {
                  const isSelected = selectedPaymentMethod === method;
                  const label = method === 'cash' ? 'Cash' : method === 'card' ? 'Card' : 'QR';
                  return (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setSelectedPaymentMethod(method as 'cash' | 'card' | 'qr')}
                      className={`payment-option rounded-3xl border p-4 text-center text-sm font-semibold ${isSelected ? 'border-[#FF5300] bg-[#FF5300]/10 text-[#FFAE00] shadow-[0_18px_40px_rgba(255,83,0,0.22)]' : 'border-white/10 bg-[#14141E] text-[#D1C5A1] hover:border-[#FFAE00]/30 hover:text-[#FFAE00]'}`}
                    >
                      <div className="mb-2 flex items-center justify-center">
                        {method === 'cash' ? <span>💵</span> : method === 'card' ? <span>💳</span> : <span>📱</span>}
                      </div>
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#ffffff0d] bg-[#1B1B28]/95 p-6 shadow-[0_35px_80px_rgba(0,0,0,0.28)]">
              <div className="flex items-center justify-between gap-2 text-sm text-[#D1C5A1]">
                <span>Subtotal</span>
                <span>Php {totalPrice.toFixed(2)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2 text-sm text-[#D1C5A1]">
                <span>Tax (5%)</span>
                <span>Php {taxAmount.toFixed(2)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2 text-sm text-[#D1C5A1]">
                <span>Delivery fee</span>
                <span>Php {deliveryFee.toFixed(2)}</span>
              </div>
              <div className="mt-5 border-t border-white/10 pt-5 text-xl font-semibold text-white">
                <div className="flex items-center justify-between gap-2">
                  <span>Grand Total</span>
                  <span>Php {grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#ffffff0d] bg-[#1B1B28]/95 p-6 shadow-[0_35px_80px_rgba(0,0,0,0.28)]">
              <div className="mb-4 flex items-center gap-3 text-[#FFAE00]">
                <MessageSquare size={20} />
                <div>
                  <p className="text-sm uppercase tracking-[0.28em]">Order notes</p>
                  <p className="text-xs text-[#d8cfa2]">Any special instructions for the kitchen?</p>
                </div>
              </div>
              <textarea
                rows={4}
                value={orderNotes}
                onChange={(event) => setOrderNotes(event.target.value)}
                className="w-full resize-none rounded-3xl border border-[#ffffff1a] bg-[#14141E] p-4 text-sm text-[#ECE1C3] outline-none transition focus:border-[#FFAE00]/60 focus:ring-1 focus:ring-[#FFAE00]/20"
              />
            </div>

            <button
              type="button"
              onClick={handleConfirmOrder}
              disabled={items.length === 0 || isSubmitting}
              className="w-full rounded-full bg-gradient-to-r from-[#FFAE00] to-[#FF5300] px-6 py-4 text-center text-base font-semibold text-[#1F1F29] shadow-[0_24px_50px_rgba(255,174,0,0.22)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Confirming order…' : 'Confirm and Pay'}
            </button>
          </aside>
        </div>
      </div>

      {isConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            className="max-w-lg rounded-[2rem] border border-white/10 bg-[#1B1B28]/95 p-8 text-center shadow-[0_35px_80px_rgba(0,0,0,0.32)]"
          >
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFAE00]/15 text-[#FFAE00]">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-3xl font-semibold text-white">Order confirmed</h2>
            <p className="mt-3 text-sm text-[#D1C5A1]">
              Your order has been received. Our kitchen is already preparing it.
            </p>
            <p className="mt-4 rounded-3xl border border-[#FF5300]/20 bg-[#14141E] py-3 text-sm font-semibold text-[#FFAE00]">
              Reference: {confirmationId}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsConfirmed(false);
                navigate('/home');
              }}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#FFAE00] px-6 py-3 text-sm font-semibold text-[#1F1F29] shadow-[0_18px_40px_rgba(255,174,0,0.22)] transition hover:-translate-y-0.5"
            >
              Return to Menu
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Checkout;
