import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItemCard from '../cart/CartItemCard';
import { useCart } from '../../hooks/cart/usecart';
import { useAuthStore } from '../../hooks/auth/useauth';
import { useProducts } from '../../hooks/products/useProducts';
import useAppStore from '../../store/HomeUserStore';
import { CartItem, Product } from '../../utils/types';

const RightSidebar = () => {
    const navigate = useNavigate();
    const { isCartSidebarOpen, toggleCartSidebar, setActiveSection } = useAppStore();
    const { user, isAuthenticated } = useAuthStore();
    const [isCollapsed, setIsCollapsed] = useState(true);

    const { items, isLoading, removeItem, updateQuantity } = useCart();
    const { products } = useProducts();
    const cartOrderRef = useRef<Map<number, number>>(new Map());
    const nextCartOrderRef = useRef(0);

    const handleQuantityChange = useCallback(async (productId: number, newQuantity: number) => {
        try {
            await updateQuantity(productId, newQuantity);
        } catch (error) {
            window.alert('Failed to update quantity');
        }
    }, [updateQuantity]);

    const handleRemoveItem = useCallback(async (productId: number) => {
        try {
            await removeItem(productId);
        } catch (error) {
            window.alert('Failed to remove item');
        }
    }, [removeItem]);

    const handlePlaceOrder = useCallback(() => {
        if (!isAuthenticated) {
            window.alert('Please log in to view the checkout page');
            return;
        }
        if (!items || items.length === 0) {
            window.alert('Your cart is empty');
            return;
        }
        setActiveSection('checkout');
        navigate('/home/checkout');
        if (isCartSidebarOpen) toggleCartSidebar();
    }, [isAuthenticated, items, navigate, setActiveSection, toggleCartSidebar, isCartSidebarOpen]);

    const orderedItems = useMemo(() => {
        const orderMap = cartOrderRef.current;
        const currentProductIds = new Set((items ?? []).map((item) => item.product));

        Array.from(orderMap.keys()).forEach((productId) => {
            if (!currentProductIds.has(productId)) {
                orderMap.delete(productId);
            }
        });

        (items ?? []).forEach((item) => {
            if (!orderMap.has(item.product)) {
                orderMap.set(item.product, nextCartOrderRef.current);
                nextCartOrderRef.current += 1;
            }
        });

        return [...(items ?? [])].sort((left, right) => {
            const leftOrder = orderMap.get(left.product) ?? Number.MAX_SAFE_INTEGER;
            const rightOrder = orderMap.get(right.product) ?? Number.MAX_SAFE_INTEGER;

            return leftOrder - rightOrder;
        });
    }, [items]);

    const cartItems = useMemo(() => (
        <div className="space-y-2">
            {orderedItems.map((item: CartItem) => {
                const product = products.find(p => p.id === item.product);
                const fallbackProduct: Product = {
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
                };
                return (
                    <CartItemCard
                        key={item.product}
                        item={item}
                        product={product ?? fallbackProduct}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemoveItem}
                    />
                );
            })}
        </div>
    ), [orderedItems, products, handleQuantityChange, handleRemoveItem]);

    const toggleSidebar = useCallback(() => toggleCartSidebar(), [toggleCartSidebar]);

    return (
        <>
            <style>{`
                .cart-content {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .cart-content::-webkit-scrollbar {
                    width: 0;
                    height: 0;
                }

                /* ── Collapse toggle arrow button ── */
                .kain-btn {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 10px 32px 10px 20px;
                    background: transparent;
                    color: white;
                    font-size: 15px;
                    font-weight: 600;
                    letter-spacing: 0.01em;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    white-space: nowrap;
                    z-index: 1;
                    animation: kain-breathe 1.6s ease-in-out infinite;
                    width: 100%;
                }
                .kain-btn:hover {
                    animation: kain-nudge 0.7s ease-in-out infinite;
                }
                .kain-shape {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                    overflow: visible;
                    pointer-events: none;
                }
                .kain-shape path {
                    fill: #FF5300;
                    transition: fill 0.2s ease;
                }
                .kain-btn:hover .kain-shape path {
                    fill: #e64500;
                }
                .kain-ghost {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                    opacity: 0;
                }
                .kain-ghost path {
                    fill: rgba(255, 83, 0, 0.3);
                }
                .kain-text {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                /* collapsed: arrow points left (into page) */
                @keyframes kain-breathe {
                    0%, 100% { transform: translateX(0px); }
                    50%       { transform: translateX(3px); }
                }
                @keyframes kain-nudge {
                    0%, 100% { transform: translateX(0px); }
                    50%       { transform: translateX(6px); }
                }

                /* Sidebar slide transition */
                .right-sidebar {
                    transition: width 0.35s cubic-bezier(0.4,0,0.2,1),
                                min-width 0.35s cubic-bezier(0.4,0,0.2,1);
                }
            `}</style>

            {/* Sidebar */}
            <div className={`
                right-sidebar
                fixed inset-y-0 right-0 bg-[#F3E8CC] h-full overflow-hidden flex flex-col shadow-lg
                transform transition-transform duration-300 ease-in-out z-50
                ${isCartSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
                md:translate-x-0 md:relative
                ${isCollapsed ? 'w-[64px] min-w-[64px]' : 'w-full md:w-[320px]'}
            `}>

                {/* ── Collapsed view ── */}
                {isCollapsed && (
                    <div className="flex flex-col items-center justify-center h-full w-full px-1">
                        <button
                            onClick={() => setIsCollapsed(false)}
                            className="kain-btn"
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(0deg)', padding: '20px 10px', width: 'auto' }}
                        >
                            <svg
                                className="kain-shape"
                                viewBox="0 10 42 50"
                                preserveAspectRatio="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ position: 'absolute', inset: 0, width: '100%', height: '110%' }}
                            >
                                <path d="M0 10 V42 Q0 52 21 60 Q42 52 42 42 V10 Q42 0 21 10 Q0 0 0 10 Z" />
                            </svg>
                            <svg
                                className="kain-ghost"
                                viewBox="0 10 42 50"
                                preserveAspectRatio="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ position: 'absolute', inset: 0, width: '100%', height: '110%' }}
                            >
                                <path d="M0 10 V42 Q0 58 21 74 Q42 58 42 42 V10 Q42 0 21 10 Q0 0 0 10 Z" />
                            </svg>
                            <span className="kain-text" style={{ fontSize: 16, letterSpacing: '0.04em' }}>
                                Hapag mo, {user?.username || 'Guest'}!
                            </span>
                        </button>
                    </div>
                )}

                {/* ── Expanded view ── */}
                {!isCollapsed && (
                    <div className="flex flex-col h-full p-4 md:p-6">

                        {/* Top row: close (mobile) + collapse button */}
                        <div className="flex items-center justify-between mb-1">
                            <button
                                onClick={toggleSidebar}
                                className="text-gray-600 hover:text-gray-900 block md:hidden"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Collapse arrow — same arrow style, points right to collapse */}
                            <button
                                onClick={() => setIsCollapsed(true)}
                                className="ml-auto flex cursor-pointer items-center gap-1.5 text-[#FF5300] text-sm font-semibold hover:opacity-70 transition-opacity"
                            >
                                <span>Collapse</span>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 3 H12 L16 9 L12 15 H4 Q1 15 1 9 Q1 3 4 3 Z" fill="#FF5300"/>
                                </svg>
                            </button>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#FF5300] mb-4 mt-4 md:mt-2">
                            Kain na, {user?.username || 'Guest'}!
                        </h2>
                        <hr className="border-t border-black my-2" />

                        {/* Cart items */}
                        <div className="flex-grow flex flex-col min-h-0">
                            <h3 className="text-[#2D2D2D] mb-4 font-normal text-lg">Here's what's on your cart:</h3>
                            <div className="overflow-y-auto scrollbar-hidden flex-grow pr-1 -mr-1 cart-content">
                                {isLoading && (!items || items.length === 0) ? (
                                    <div className="flex items-center justify-center h-32">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF5300]"></div>
                                    </div>
                                ) : !items || items.length === 0 ? (
                                    <div className="flex items-center justify-center h-32">
                                        <p className="text-[#2D2D2D] text-lg">Your cart is empty...</p>
                                    </div>
                                ) : (
                                    <div className="bg-[#F3E8CC] rounded-2xl p-3">
                                        {cartItems}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 flex-shrink-0">
                            <button
                                className="w-full cursor-pointer bg-[#FF5300] text-[#1F1F29] py-3 rounded-full font-semibold hover:bg-[#ffd14d] transition-all duration-300 shadow-[0_18px_40px_rgba(255,174,0,0.24)] hover:-translate-y-0.5"
                                onClick={handlePlaceOrder}
                                disabled={!isAuthenticated || !items || items.length === 0}
                                type="button"
                            >
                                See Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile overlay */}
            {isCartSidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black opacity-50 z-40 block md:hidden cursor-pointer"
                />
            )}
        </>
    );
};

export default RightSidebar;