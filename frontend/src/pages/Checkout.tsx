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
    return () => setActiveSection('home');
  }, [setActiveSection]);

  const cartItems = useMemo(() => items.map((item: CartItem) => {
    const product = products.find((p: Product) => p.id === item.product);
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
  }), [items, products]);

  const taxAmount = totalPrice * 0.05;
  const orderTotal = totalPrice + taxAmount;
  const deliveryFee = totalPrice > 0 ? 35 : 0;
  const grandTotal = orderTotal + deliveryFee;

  const handleBackToMenu = () => { setActiveSection('home'); navigate('/home'); };
  const handleQuantityChange = async (productId: number, quantity: number) => {
    if (quantity < 1) return;
    try { await updateQuantity(productId, quantity); } catch { window.alert('Unable to update quantity.'); }
  };
  const handleRemoveItem = async (productId: number) => {
    try { await removeItem(productId); } catch { window.alert('Unable to remove item.'); }
  };
  const handleConfirmOrder = async () => {
    if (!items || items.length === 0) { window.alert('Your cart is empty.'); return; }
    if (!user) { window.alert('Please log in to complete checkout.'); return; }
    setIsSubmitting(true);
    try {
      await createOrder();
      setConfirmationId(`HT-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsConfirmed(true);
    } catch { window.alert('Unable to complete checkout. Please try again.'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="min-h-screen xl:h-screen xl:overflow-hidden bg-gray-50 text-[#2D2D2D]"
    >
      <style>{`
        /* ── Scrollbar hide ── */
        .no-scroll::-webkit-scrollbar { display: none; }
        .no-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        /* ── Layered warm shadows for section cards ── */
        .card-shadow {
          box-shadow:
            0 1px 2px rgba(45, 45, 45, 0.04),
            0 4px 12px rgba(45, 45, 45, 0.06),
            0 12px 28px rgba(45, 45, 45, 0.07);
        }
        .card-shadow-sm {
          box-shadow:
            0 1px 2px rgba(45, 45, 45, 0.04),
            0 3px 8px rgba(45, 45, 45, 0.06);
        }

        /* ── Payment buttons: lift + border + text only on hover, no bg ── */
        .payment-option {
          transition:
            transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
            border-color 0.18s ease,
            color 0.18s ease,
            box-shadow 0.18s ease;
          cursor: pointer;
        }
        .payment-option:not(.is-selected):hover {
          transform: translateY(-3px);
          border-color: #FF5300;
          color: #FF5300;
          box-shadow: 0 6px 18px rgba(255, 83, 0, 0.12);
        }
        .payment-option.is-selected {
          box-shadow: 0 6px 20px rgba(255, 83, 0, 0.25);
        }
        .payment-option:active {
          transform: translateY(0px) scale(0.97);
        }

        /* ── CTA button spring animation ── */
        .cta-btn {
          transition:
            transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
            background-color 0.18s ease,
            box-shadow 0.18s ease;
        }
        .cta-btn:not(:disabled):hover {
          transform: translateY(-3px);
          background-color: #e04800;
          box-shadow: 0 18px 38px rgba(255, 83, 0, 0.3);
        }
        .cta-btn:not(:disabled):active {
          transform: translateY(0px);
          background-color: #c73f00;
          box-shadow: 0 4px 12px rgba(255, 83, 0, 0.18);
        }

        /* ── Back button ── */
        .back-btn {
          transition:
            transform 0.18s ease,
            background-color 0.18s ease,
            box-shadow 0.18s ease;
        }
        .back-btn:hover {
          transform: translateY(-2px);
          background-color: #3a3a3a;
          box-shadow: 0 6px 16px rgba(45, 45, 45, 0.22);
        }
        .back-btn:active {
          transform: translateY(0px);
          background-color: #1a1a1a;
        }

        /* ── Cursor ── */
        button, [role="button"], a { cursor: pointer; }
        textarea, input, select { cursor: text; }
      `}</style>

      {/*
        No max-width cap so both columns expand fully into the viewport.
        Padding provides breathing room without killing column width.
      */}
      <div className="xl:h-full flex flex-col px-4 py-5 sm:px-5 lg:px-6 xl:py-6 max-w-7xl mx-auto">

        {/* ── Top bar ── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6 flex-shrink-0">
          <button
            type="button"
            onClick={handleBackToMenu}
            className="back-btn inline-flex items-center gap-2 rounded-full border border-[#2D2D2D]/20 bg-[#2D2D2D] px-4 py-2.5 text-sm font-semibold text-[#F3E8CC] card-shadow-sm cursor-pointer"
          >
            <ChevronLeft size={16} />
            Back to menu
          </button>

          <div className="rounded-2xl border border-[#2D2D2D]/15 bg-[#2D2D2D] px-5 py-3 card-shadow-sm">
            <p className="text-s uppercase tracking-[0.28em] text-[#FFAE00] font-semibold">Order flow</p>
            <p className="mt-0.5 text-s text-[#F3E8CC]/75">Review cart, choose delivery, and confirm payment.</p>
          </div>
        </div>

        {/* ── Main 2-column grid ── */}
        <div className="grid gap-14 xl:grid-cols-2 xl:flex-1 xl:min-h-0">

          {/* ══ LEFT: Order Summary ══ */}
          <section className="flex flex-col overflow-hidden rounded-[1.75rem] border border-[#FFAE00]/18 bg-[#F3E8CC] card-shadow xl:min-h-0">

            <div className="flex items-center justify-between gap-4 px-6 pt-6 pb-4 flex-shrink-0">
              <div>
                <p className="text-m uppercase tracking-[0.3em] text-[#FFAE00] font-bold">Order summary</p>
                <h1 className="mt-1.5 text-3xl font-bold text-[#FF5300] leading-tight">You're almost there</h1>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5300]/10 px-3 py-1.5 text-xs font-semibold text-[#FF5300]">
                <ShoppingBag size={13} />
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </div>
            </div>

            {/* Scrollable cart list */}
            <div className="xl:flex-1 overflow-y-auto no-scroll px-6 space-y-3 xl:min-h-0 pb-3">
              {cartItems.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#FFAE00]/35 bg-white/50 p-8 text-center">
                  <p className="text-base font-semibold text-[#2D2D2D]">Your cart is empty</p>
                  <p className="mt-1 text-sm text-[#2D2D2D]/55">Browse the menu and add your favorites.</p>
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

            {/* Totals pinned to bottom of left card */}
            <div className="flex-shrink-0 mx-5 mb-5 mt-3 rounded-2xl border border-[#FFAE00]/20 bg-white/65 px-5 py-4">
              <div className="flex justify-between text-sm text-[#2D2D2D]">
                <span>Subtotal</span>
                <span>Php {totalPrice.toFixed(2)}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm text-[#2D2D2D]">
                <span>Tax (5%)</span>
                <span>Php {taxAmount.toFixed(2)}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm text-[#2D2D2D]">
                <span>Delivery fee</span>
                <span>Php {deliveryFee.toFixed(2)}</span>
              </div>
              <div className="mt-2 border-t border-[#2D2D2D]/10 pt-3 flex justify-between text-lg font-bold text-[#FF5300]">
                <span>Grand Total</span>
                <span>Php {grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </section>

          {/* ══ RIGHT: Options + CTA ══ */}
          <aside className="flex flex-col gap-4 xl:overflow-y-auto no-scroll xl:min-h-0">

            {/* Delivery address */}
            <div className="rounded-[1.75rem] border border-[#FFAE00]/18 bg-[#F3E8CC] px-6 py-5 card-shadow flex-shrink-0">
              <div className="mb-3 flex items-center gap-2">
                <MapPin size={15} className="text-[#FF5300] flex-shrink-0" />
                <div>
                  <p className="text-m uppercase tracking-[0.28em] font-bold text-[#FFAE00]">Delivery address</p>
                  <p className="text-[14px] text-[#2D2D2D]/65">Edit below or use the default address.</p>
                </div>
              </div>
              <textarea
                className="w-full resize-none rounded-xl border border-[#2D2D2D]/10 bg-white px-4 py-3 text-m text-[#2D2D2D] outline-none transition
                  focus:border-[#FFAE00]/50 focus:ring-2 focus:ring-[#FFAE00]/15 cursor-text"
                rows={3}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
            </div>

            {/* Payment method */}
            <div className="rounded-[1.75rem] border border-[#FFAE00]/18 bg-[#F3E8CC] px-6 py-5 card-shadow flex-shrink-0">
              <div className="mb-3 flex items-center gap-2">
                <CreditCard size={15} className="text-[#FF5300] flex-shrink-0" />
                <div>
                  <p className="text-m uppercase tracking-[0.28em] font-bold text-[#FFAE00]">Payment method</p>
                  <p className="text-[14px] text-[#2D2D2D]/65">Select how you'd like to pay.</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {(['cash', 'card', 'qr'] as const).map((method) => {
                  const isSelected = selectedPaymentMethod === method;
                  const label = method === 'cash' ? 'Cash' : method === 'card' ? 'Card' : 'QR Pay';
                  return (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setSelectedPaymentMethod(method)}
                      className={`payment-option rounded-xl border py-2.5 text-center text-sm font-semibold
                        ${isSelected
                          ? 'is-selected border-[#FF5300] bg-[#FF5300] text-white'
                          : 'border-[#2D2D2D]/12 bg-white text-[#2D2D2D]'
                        }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Order notes */}
            <div className="rounded-[1.75rem] border border-[#FFAE00]/18 bg-[#F3E8CC] px-6 py-5 card-shadow flex-shrink-0">
              <div className="mb-3 flex items-center gap-2">
                <MessageSquare size={15} className="text-[#FF5300] flex-shrink-0" />
                <div>
                  <p className="text-m uppercase tracking-[0.28em] font-bold text-[#FFAE00]">Order notes</p>
                  <p className="text-[14px] text-[#2D2D2D]/65">Special instructions for the kitchen?</p>
                </div>
              </div>
              <textarea
                rows={3}
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full resize-none rounded-xl border border-[#2D2D2D]/10 bg-white px-4 py-3 text-sm text-[#2D2D2D] outline-none transition
                  focus:border-[#FFAE00]/50 focus:ring-2 focus:ring-[#FFAE00]/15 cursor-text"
              />
            </div>

            {/* Confirm CTA */}
            <button
              type="button"
              onClick={handleConfirmOrder}
              disabled={items.length === 0 || isSubmitting}
              style={{ boxShadow: '0 10px 30px rgba(255, 83, 0, 0.26)' }}
              className="cta-btn flex-shrink-0 w-full rounded-full bg-[#FF5300] px-6 py-4 text-center text-base font-semibold text-white
                disabled:cursor-not-allowed disabled:opacity-55 cursor-pointer"
            >
              {isSubmitting ? 'Confirming order…' : 'Confirm and Pay'}
            </button>
          </aside>
        </div>
      </div>

      {/* ── Confirmation modal ── */}
      {isConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ boxShadow: '0 40px 90px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.1)' }}
            className="w-full max-w-md rounded-[2rem] border border-[#FFAE00]/20 bg-[#F3E8CC] p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.18, duration: 0.42, ease: [0.34, 1.56, 0.64, 1] }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FF5300]/10 text-[#FF5300]"
            >
              <CheckCircle2 size={32} />
            </motion.div>
            <h2 className="text-2xl font-bold text-[#2D2D2D]">Order confirmed!</h2>
            <p className="mt-2 text-m text-[#2D2D2D]/65">
              Your order has been received. Our kitchen is already on it.
            </p>
            <p className="mt-4 rounded-xl border border-[#FFAE00]/30 bg-white py-3 text-m font-semibold text-[#FF5300]">
              Reference: {confirmationId}
            </p>
            <button
              type="button"
              onClick={() => { setIsConfirmed(false); navigate('/home'); }}
              style={{ boxShadow: '0 10px 28px rgba(255, 83, 0, 0.24)' }}
              className="cta-btn mt-5 inline-flex items-center justify-center rounded-full bg-[#FF5300] px-6 py-3 text-sm font-semibold text-white cursor-pointer"
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