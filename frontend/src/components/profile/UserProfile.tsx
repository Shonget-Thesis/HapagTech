import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../../hooks/auth/useauth";
import { useFavorites } from '../../hooks/favorites/usefavorites';
import { useOrders } from '../../hooks/orders/useorder';
import { ProfileEditModal } from './ProfileEdit';
import { Product, Order } from '../../utils/types';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const {
    user,
    isLoading: profileLoading,
    isAuthenticated,
    hasCheckedAuth,
    refreshUserData
  } = useAuthStore();

  const { favorites, isLoading: favoritesLoading } = useFavorites();
  const { orders, isLoading: ordersLoading } = useOrders();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [shouldRefreshUser, setShouldRefreshUser] = useState(false);
  const [activeTooltipOrderId, setActiveTooltipOrderId] = useState<number | null>(null);
  const favoritesScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldRefreshUser && isAuthenticated) {
      const doRefresh = async () => {
        try { await refreshUserData(); }
        catch { setShouldRefreshUser(false); }
      };
      doRefresh();
    }
  }, [shouldRefreshUser, refreshUserData, isAuthenticated]);

  const handleModalClose = useCallback(() => {
    setIsEditModalOpen(false);
    setShouldRefreshUser(true);
  }, []);

  const scrollFavorites = (dir: 'prev' | 'next') => {
    if (!favoritesScrollRef.current) return;
    favoritesScrollRef.current.scrollBy({
      left: dir === 'next' ? 192 : -192,
      behavior: 'smooth',
    });
  };

  const getActiveDietaryPreferences = () => {
    if (!user) return [];
    const map: Record<string, string> = {
      is_vegetarian: 'Vegetarian', is_vegan: 'Vegan', is_pescatarian: 'Pescatarian',
      is_flexitarian: 'Flexitarian', is_paleo: 'Paleolithic', is_ketogenic: 'Ketogenic',
      is_halal: 'Halal', is_kosher: 'Kosher', is_fruitarian: 'Fruitarian',
      is_gluten_free: 'Gluten-Free', is_dairy_free: 'Dairy-free', is_organic: 'Organic',
    };
    return Object.entries(map)
      .filter(([key]) => {
        const value = user[key as keyof typeof user];
        return typeof value === 'boolean' && value === true;
      })
      .map(([, label]) => label);
  };

  const activeDietary = getActiveDietaryPreferences();

  const formatDate = (date?: string) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  /* ── Loading / auth guards ── */
  if (!hasCheckedAuth || profileLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3E8CC]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#FF5300]" />
        <p className="mt-4 text-[#2D2D2D]">Loading profile...</p>
      </div>
    );
  }
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3E8CC] px-4">
        <h1 className="text-3xl font-bold text-[#2D2D2D] mb-4">Please log in to view your profile</h1>
        <button
          onClick={() => navigate('/login')}
          className="cursor-pointer rounded-full bg-[#FF5300] px-6 py-3 text-sm font-semibold text-white hover:bg-[#e14a00] transition"
        >Go to Login</button>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3E8CC] px-4">
        <h1 className="text-3xl font-bold text-[#2D2D2D] mb-4">Error loading profile</h1>
        <button
          onClick={() => refreshUserData()}
          className="cursor-pointer rounded-full bg-[#FF5300] px-6 py-3 text-sm font-semibold text-white hover:bg-[#e14a00] transition"
        >Retry</button>
      </div>
    );
  }

  const getProfilePicture = () => {
    if (!user?.profile_picture) return null;
    return user.profile_picture.startsWith('http')
      ? user.profile_picture
      : `http://res.cloudinary.com/dlp4jsibt/${user.profile_picture}`;
  };
  const profilePictureUrl = getProfilePicture();

  /* ─────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{`
        /* hide scrollbars */
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        /* card shadows */
        .c-shadow {
          box-shadow:
            0 0 0 1px rgba(45,45,45,0.04),
            0 2px 4px rgba(45,45,45,0.04),
            0 8px 20px -4px rgba(45,45,45,0.09),
            0 24px 48px -8px rgba(45,45,45,0.07);
        }
        .c-shadow-sm {
          box-shadow:
            0 0 0 1px rgba(45,45,45,0.04),
            0 2px 6px rgba(45,45,45,0.05),
            0 8px 18px -4px rgba(45,45,45,0.07);
        }
        .inner-shadow { box-shadow: inset 0 1px 3px rgba(45,45,45,0.05); }

        /* popup spring */
        .popup-in {
          animation: popIn 0.16s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        @keyframes popIn {
          from { opacity:0; transform: translateX(-6px) translateY(-50%); }
          to   { opacity:1; transform: translateX(0)    translateY(-50%); }
        }

        /* cursor */
        button,[role="button"],a { cursor: pointer; }
      `}</style>

      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-6xl space-y-6">

          {/* ── Header ── */}
          <div className="rounded-[30px] border border-[#F0D0A2] bg-white/90 p-6 c-shadow backdrop-blur-sm">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#2D2D2D]/55">Profile dashboard</p>
                <h1 className="mt-2.5 text-3xl font-bold tracking-tight text-[#FF5300] sm:text-4xl">
                  Welcome back, {user?.full_name || 'there'}.
                </h1>
                <p className="mt-2 text-base leading-7 text-[#2D2D2D]/75">
                  Manage your account, update preferences, and review recent activity.
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="self-start lg:self-auto inline-flex cursor-pointer items-center justify-center rounded-full bg-[#FF5300] px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white shadow-lg shadow-[#FF5300]/20 transition hover:bg-[#e14a00] active:scale-[0.98]"
              >
                Edit profile
              </button>
            </div>
          </div>

          {/* ── Two-column grid ── */}
          {/*
            KEY FIX: Both columns are inside ONE grid container.
            The right column (Recent Orders) is a sibling of the left column,
            NOT a child — this is what was causing the detached floating layout.
          */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.45fr_1fr] xl:items-start">

            {/* ════ LEFT COLUMN ════ */}
            <div className="space-y-6 min-w-0">

              {/* Identity card */}
              <div className="rounded-[28px] border border-[#E7D1A1] bg-white p-6 c-shadow">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="group relative h-24 w-24 overflow-hidden rounded-full border-4 border-[#FFAE00] bg-[#F3E8CC] shadow-inner transition hover:scale-[1.03] cursor-pointer">
                      {profilePictureUrl ? (
                        <img
                          src={profilePictureUrl}
                          alt={user?.full_name || ''}
                          className="h-full w-full object-cover"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-[#2D2D2D]">
                          {(user?.full_name || user?.username || '?').charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-[#FFAE00]/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                    </div>
                  </div>

                  {/* Name / email / phone */}
                  <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-semibold text-[#2D2D2D] truncate">
                      {user?.full_name || user?.username || 'No name set'}
                    </h2>
                    <p className="mt-1.5 text-sm text-[#2D2D2D]/70 truncate">{user?.email || 'No email'}</p>
                    <p className="mt-0.5 text-sm text-[#2D2D2D]/70 truncate">{user?.phone_number || 'No phone number'}</p>
                  </div>
                </div>

                {/* Account / Member-since chips */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-[#F3E8CC] border border-[#F2DEC0] p-4 inner-shadow">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#2D2D2D]/55">Account</p>
                    <p className="mt-2 text-sm font-semibold text-[#2D2D2D] truncate">{user?.username || '—'}</p>
                  </div>
                  <div className="rounded-2xl bg-[#F3E8CC] border border-[#F2DEC0] p-4 inner-shadow">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#2D2D2D]/55">Member since</p>
                    <p className="mt-2 text-sm font-semibold text-[#2D2D2D]">{formatDate(user?.created_at)}</p>
                  </div>
                </div>
              </div>

              {/* Contact + Dietary — side by side, equal height */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Contact */}
                <div className="rounded-[28px] border border-[#E7D1A1] bg-white p-5 c-shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-[#2D2D2D]">Contact details</h3>
                    <span className="rounded-full bg-[#FFAE00]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2D2D2D]">
                      Primary
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-2xl bg-[#F3E8CC] border border-[#F2DEC0] p-3.5 inner-shadow">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#2D2D2D]/55">Email</p>
                      <p className="mt-1.5 text-sm font-medium text-[#2D2D2D] truncate">{user?.email || 'Not set'}</p>
                    </div>
                    <div className="rounded-2xl bg-[#F3E8CC] border border-[#F2DEC0] p-3.5 inner-shadow">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#2D2D2D]/55">Phone</p>
                      <p className="mt-1.5 text-sm font-medium text-[#2D2D2D]">{user?.phone_number || 'Not set'}</p>
                    </div>
                  </div>
                </div>

                {/* Dietary */}
                <div className="rounded-[28px] border border-[#E7D1A1] bg-white p-5 c-shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-[#2D2D2D]">Preferences</h3>
                    <span className="rounded-full bg-[#FF5300]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FF5300]">
                      Dietary
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeDietary.length > 0 ? (
                      activeDietary.map((pref, i) => (
                        <span key={i} className="rounded-full bg-[#FFAE00]/15 px-3 py-1 text-xs font-medium text-[#2D2D2D]">
                          {pref}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-[#2D2D2D]/55">No dietary preferences set yet.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Favorite Meals ── fixed height, horizontal scroll, never grows */}
              <div className="rounded-[28px] border border-[#E7D1A1] bg-white p-5 c-shadow-sm">
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-[#2D2D2D]">Favorite meals</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#2D2D2D]/55 font-medium">{favorites.length} saved</span>
                    {favorites.length > 2 && (
                      <>
                        <button
                          type="button"
                          onClick={() => scrollFavorites('prev')}
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-[#D8B57C] bg-white text-[#2D2D2D] text-sm leading-none transition hover:border-[#FF5300] hover:text-[#FF5300]"
                          style={{ boxShadow: '0 1px 4px rgba(45,45,45,0.08)' }}
                        >‹</button>
                        <button
                          type="button"
                          onClick={() => scrollFavorites('next')}
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-[#D8B57C] bg-white text-[#2D2D2D] text-sm leading-none transition hover:border-[#FF5300] hover:text-[#FF5300]"
                          style={{ boxShadow: '0 1px 4px rgba(45,45,45,0.08)' }}
                        >›</button>
                      </>
                    )}
                  </div>
                </div>

                {/* Fixed-height scroll track — NEVER grows regardless of item count */}
                <div className="h-[88px]">
                  {favoritesLoading ? (
                    <div className="flex h-full items-center justify-center rounded-2xl bg-[#F3E8CC] text-sm text-[#2D2D2D]/70">
                      Loading favorites...
                    </div>
                  ) : favorites.length === 0 ? (
                    <div className="flex h-full items-center justify-center rounded-2xl bg-[#F3E8CC] text-sm text-[#2D2D2D]/60 text-center px-4">
                      No favorites yet — add picks from the menu.
                    </div>
                  ) : (
                    <div
                      ref={favoritesScrollRef}
                      className="flex h-full gap-2.5 overflow-x-auto hide-scroll scroll-smooth"
                    >
                      {favorites.map((meal: Product) => (
                        <div
                          key={meal.id}
                          className="flex min-w-[176px] max-w-[176px] flex-shrink-0 items-center gap-2.5 rounded-2xl border border-[#F2DEC0] bg-[#F3E8CC] px-3 transition hover:border-[#FF5300] hover:bg-[#FFF2E6] cursor-pointer inner-shadow"
                        >
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
                            {meal.image_url
                              ? <img src={meal.image_url} alt={meal.name} className="h-full w-full object-cover" />
                              : <span className="text-[10px] text-[#2D2D2D]/40">No img</span>
                            }
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#2D2D2D] truncate leading-tight">{meal.name}</p>
                            <p className="mt-0.5 text-xs text-[#2D2D2D]/60">₱{Number(meal.price || 0).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ════ RIGHT COLUMN ════ */}
            {/*
              This div is a DIRECT child of the grid — same level as LEFT COLUMN.
              It will align to the top of the grid row via xl:items-start.
            */}
            <div className="min-w-0">
              <div className="rounded-[28px] border border-[#E7D1A1] bg-white p-6 c-shadow">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-semibold text-[#2D2D2D]">Recent orders</h3>
                  <span className="text-sm font-medium text-[#2D2D2D]/55">{orders.length} orders</span>
                </div>

                {/* Scrollable order list */}
                <div className="max-h-[680px] overflow-y-auto hide-scroll scroll-smooth">
                  {ordersLoading ? (
                    <div className="rounded-2xl bg-[#F3E8CC] p-6 text-center text-sm text-[#2D2D2D]/70">
                      Loading orders...
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="rounded-2xl bg-[#F3E8CC] p-6 text-center text-sm text-[#2D2D2D]/60">
                      No recent orders yet. Start ordering your favorite meals.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((order: Order) => (
                        <div
                          key={order.id}
                          className="relative rounded-2xl border border-[#F2DEC0] bg-[#F3E8CC] p-4 transition hover:border-[#FF5300] hover:bg-[#FFF2E6] inner-shadow"
                        >
                          {/* Date + total */}
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-[#2D2D2D]">{formatDate(order.created_at)}</p>
                            <p className="text-sm font-semibold text-[#FF5300]">₱{Number(order.total_amount).toFixed(2)}</p>
                          </div>

                          {/* Item count */}
                          <p className="mt-1 text-xs text-[#2D2D2D]/55">
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </p>

                          {/* Item names */}
                          {order.items.length > 0 && (
                            <div className="mt-2 space-y-0.5">
                              {order.items.slice(0, 2).map((item, i) => (
                                <p key={i} className="text-sm text-[#2D2D2D]/75 truncate">{item.product_name}</p>
                              ))}

                              {/* +more tooltip */}
                              {order.items.length > 2 && (
                                <div
                                  className="relative inline-block mt-1"
                                  onMouseEnter={() => setActiveTooltipOrderId(order.id)}
                                  onMouseLeave={() => setActiveTooltipOrderId(null)}
                                >
                                  <button
                                    type="button"
                                    onClick={() => setActiveTooltipOrderId(
                                      activeTooltipOrderId === order.id ? null : order.id
                                    )}
                                    className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-[#FF5300] transition hover:bg-[#FFF2E6]"
                                    style={{ boxShadow: '0 1px 3px rgba(45,45,45,0.09)' }}
                                  >
                                    +{order.items.length - 2} more
                                  </button>

                                  {/* Minimal list popup — right side, no heavy container */}
                                  {activeTooltipOrderId === order.id && (
                                    <div
                                      className="popup-in absolute left-full top-1/2 z-30 ml-2.5 w-48"
                                      style={{
                                        transform: 'translateY(-50%)',
                                        background: '#ffffff',
                                        borderRadius: '12px',
                                        padding: '8px 12px',
                                        boxShadow: '0 2px 8px rgba(45,45,45,0.08), 0 12px 28px rgba(45,45,45,0.10)',
                                      }}
                                    >
                                      <ul className="space-y-1">
                                        {order.items.slice(2).map((item, i) => (
                                          <li key={i} className="truncate text-xs text-[#2D2D2D]/80 leading-snug">
                                            {item.product_name}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>{/* end grid */}
        </div>{/* end max-w-6xl */}
      </div>{/* end page wrapper */}

      {user && (
        <ProfileEditModal
          isOpen={isEditModalOpen}
          onClose={handleModalClose}
          initialData={{
            full_name: user.full_name || '',
            email: user.email || '',
            phone_number: user.phone_number || '',
            profile_picture: user.profile_picture,
            dietaryPreferences: user.dietary_preferences || {
              is_vegetarian: false, is_vegan: false, is_pescatarian: false,
              is_flexitarian: false, is_paleo: false, is_ketogenic: false,
              is_halal: false, is_kosher: false, is_fruitarian: false,
              is_gluten_free: false, is_dairy_free: false, is_organic: false,
            },
          }}
        />
      )}
    </>
  );
};

export default UserProfilePage;