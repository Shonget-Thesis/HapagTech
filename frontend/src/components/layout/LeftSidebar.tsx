import { useState, useEffect } from 'react';
import { Home, User, ShoppingCart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../hooks/auth/useauth';
import useAppStore from '../../store/HomeUserStore';
import LogoOrange from '../ui/LogoOrange';
import WordmarkLeft from '../../assets/WordmarkLeft.png';

type SectionKey = 'home' | 'checkout' | 'profile';

const navigationItems: Array<{ key: SectionKey; label: string; Icon: typeof Home }> = [
    { key: 'home', label: 'Menu', Icon: Home },
    { key: 'checkout', label: 'Cart', Icon: ShoppingCart },
    { key: 'profile', label: 'Profile', Icon: User }
];

const LeftSidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuthStore();
    const { activeSection, setActiveSection } = useAppStore();
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (location.pathname.includes('/home/checkout')) {
            setActiveSection('checkout');
        }
    }, [location.pathname, setActiveSection]);

    const handleButtonClick = (section: SectionKey) => {
        if (section === 'checkout') {
            setActiveSection('checkout');
            navigate('/home/checkout');
            return;
        }

        setActiveSection(section);
        if (section === 'home') {
            navigate('/home');
        }
    };

    const handleLogout = async () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 900);
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            <style>{`
                /* ── Logout arrow button ── */
                .logout-btn {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    padding: 10px 16px;
                    background: transparent;
                    color: white;
                    font-size: 18px;
                    font-weight: 600;
                    letter-spacing: 0.01em;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    white-space: nowrap;
                    z-index: 1;
                    animation: logout-breathe 1.6s ease-in-out infinite;
                }
                .logout-btn:hover {
                    animation: logout-nudge 0.7s ease-in-out infinite;
                }
                .logout-btn.clicked {
                    animation: logout-shoot 0.75s cubic-bezier(0.4, 0, 1, 1) forwards !important;
                }
                .logout-btn.clicked .logout-ghost {
                    animation: logout-ghost-trail 0.75s cubic-bezier(0.4, 0, 1, 1) forwards;
                }
                .logout-shape {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                    overflow: visible;
                    pointer-events: none;
                }
                .logout-shape path {
                    fill: #FF5300;
                    transition: fill 0.2s ease;
                }
                .logout-btn:hover .logout-shape path {
                    fill: #e64500;
                }
                .logout-ghost {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                    opacity: 0;
                }
                .logout-ghost path {
                    fill: rgba(255, 83, 0, 0.3);
                }
                .logout-text {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    max-width: 0;
                    overflow: hidden;
                    opacity: 0;
                    transition: max-width 0.3s ease-in-out, opacity 0.3s ease-in-out;
                    white-space: nowrap;
                }
                .sidebar-group:hover .logout-text {
                    max-width: 120px;
                    opacity: 1;
                }
                @keyframes logout-breathe {
                    0%, 100% { transform: translateX(0px); }
                    50%       { transform: translateX(-3px); }
                }
                @keyframes logout-nudge {
                    0%, 100% { transform: translateX(0px); }
                    50%       { transform: translateX(-6px); }
                }
                @keyframes logout-shoot {
                    0%   { transform: translateX(0px);    opacity: 1; }
                    55%  { transform: translateX(-140px); opacity: 0; }
                    56%  { transform: translateX(60px);   opacity: 0; }
                    100% { transform: translateX(0px);    opacity: 1; }
                }
                @keyframes logout-ghost-trail {
                    0%   { transform: translateX(0px);    opacity: 0.45; }
                    100% { transform: translateX(-110px); opacity: 0; }
                }

                /* ── Nav buttons ── */
                .nav-btn {
                    display: flex;
                    width: 100%;
                    align-items: center;
                    justify-content: center;
                    border-radius: 1.5rem;
                    padding: 1rem;
                    font-size: 1rem;
                    font-weight: 500;
                    transition: all 0.3s ease-in-out;
                    cursor: pointer;
                    border: none;
                    outline: none;
                    gap: 0;
                    background: none;
                }
                /* Expanded: align left */
                .sidebar-group:hover .nav-btn {
                    justify-content: flex-start;
                    padding-left: 1.25rem;
                }
                .nav-btn .nav-label {
                    max-width: 0;
                    overflow: hidden;
                    opacity: 0;
                    transition: max-width 0.3s ease-in-out,
                                opacity 0.3s ease-in-out,
                                margin 0.3s ease-in-out;
                    white-space: nowrap;
                    margin-left: 0;
                }
                .sidebar-group:hover .nav-btn .nav-label {
                    max-width: 120px;
                    opacity: 1;
                    margin-left: 0.75rem;
                }
                .nav-btn svg {
                    flex-shrink: 0;
                    min-width: 20px;
                }
            `}</style>

            {/* Desktop collapsed sidebar */}
            <aside className="sidebar-group hidden lg:flex group fixed top-0 left-0 h-full w-20 overflow-hidden transition-all duration-300 ease-in-out hover:w-64 z-40">
                <div className="flex h-full w-full flex-col justify-between rounded-tr-3xl rounded-br-3xl bg-[#F3E8CC] border-r border-[#FF5300]/20 shadow-[12px_0_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out">

                    {/* Top: Logo + Nav */}
                    <div className="flex flex-col gap-4 px-2 py-5">

                        {/* Logo */}
                        <div className="flex items-center justify-center gap-3 rounded-3xl px-3 py-3 transition-all duration-300 ease-in-out lg:group-hover:justify-start">
                            <LogoOrange className="h-10 w-10 flex-shrink-0" />
                            <div className="hidden lg:group-hover:flex lg:items-center lg:justify-start overflow-hidden">
                                <img src={WordmarkLeft} alt="HapagTech wordmark" className="h-8 w-auto object-contain" />
                            </div>
                        </div>

                        {/* Nav items */}
                        <div className="flex flex-col gap-3">
                            {navigationItems.map(({ key, label, Icon }) => {
                                const isActive = activeSection === key;
                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => handleButtonClick(key)}
                                        className={`nav-btn ${
                                            isActive
                                                ? 'bg-[#FF5300]/15 text-[#FF5300] shadow-[0_18px_40px_rgba(255,83,0,0.12)] ring-1 ring-[#FF5300]/20'
                                                : 'text-[#2D2D2D] hover:bg-[#FF5300]/10 hover:text-[#FF5300]'
                                        }`}
                                        aria-pressed={isActive}
                                    >
                                        <Icon size={20} />
                                        <span className="nav-label">{label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bottom: Logout */}
                    <div className="px-3 pb-6">
                        {/* Expanded: full left-pointing arrow button */}
                        <button
                            type="button"
                            onClick={handleLogout}
                            className={`logout-btn hidden lg:group-hover:inline-flex ${clicked ? 'clicked' : ''}`}
                            aria-label="Log Out"
                        >
                            <svg className="logout-shape" viewBox="0 0 160 42" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M146 0 H42 Q25 0 10 21 Q25 42 42 42 H146 Q160 42 136 21 Q160 0 146 0 Z" />
                            </svg>
                            <svg className="logout-ghost" viewBox="0 0 160 42" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M146 0 H42 Q25 0 10 21 Q25 42 42 42 H146 Q160 42 136 21 Q160 0 146 0 Z" />
                            </svg>
                            <span className="logout-text hidden lg:group-hover:flex">Log Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile / Tablet bottom navigation */}
            <nav className="lg:hidden fixed inset-x-0 bottom-0 z-50 border-t border-[#FF5300]/10 bg-[#F3E8CC]/95 px-4 py-3 backdrop-blur-xl shadow-[0_-18px_40px_rgba(0,0,0,0.12)]">
                <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
                    {navigationItems.map(({ key, label, Icon }) => {
                        const isActive = activeSection === key;
                        return (
                            <button
                                key={key}
                                type="button"
                                onClick={() => handleButtonClick(key)}
                                aria-label={label}
                                className={`flex h-14 w-14 items-center justify-center rounded-3xl transition-all duration-300 ease-in-out ${
                                    isActive
                                        ? 'bg-[#FF5300]/15 text-[#FF5300] shadow-[0_0_18px_rgba(255,83,0,0.18)]'
                                        : 'text-[#FFAE00] hover:bg-[#FF5300]/10 hover:text-[#FF5300]'
                                }`}
                            >
                                <Icon size={24} />
                            </button>
                        );
                    })}

                    {/* Mobile logout */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        aria-label="Log Out"
                        className="flex h-14 px-5 items-center justify-center rounded-3xl bg-[#FF5300] text-white font-semibold text-sm shadow-[0_0_22px_rgba(255,83,0,0.32)] transition-all duration-300 ease-in-out hover:scale-[1.02]"
                    >
                        Log Out
                    </button>
                </div>
            </nav>
        </>
    );
};

export default LeftSidebar;