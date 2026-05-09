import { create } from 'zustand';

type AppSection = 'home' | 'checkout' | 'profile';

interface AppState {
  activeSection: AppSection;
  isMobileMenuOpen: boolean;
  isCartSidebarOpen: boolean;
  isRightSidebarCollapsed: boolean;
  setActiveSection: (section: AppSection) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  setIsCartSidebarOpen: (open: boolean) => void;
  toggleCartSidebar: () => void;
  setRightSidebarCollapsed: (collapsed: boolean) => void;
  toggleRightSidebarCollapsed: () => void;
}

const useAppStore = create<AppState>((set) => ({
  activeSection: 'home',
  isMobileMenuOpen: false,
  isCartSidebarOpen: false,
  isRightSidebarCollapsed: true,
  setActiveSection: (section) => set({ activeSection: section }),
  setIsMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setIsCartSidebarOpen: (open) => set({ isCartSidebarOpen: open }),
  toggleCartSidebar: () => set((state) => ({ isCartSidebarOpen: !state.isCartSidebarOpen })),
  setRightSidebarCollapsed: (collapsed) => set({ isRightSidebarCollapsed: collapsed }),
  toggleRightSidebarCollapsed: () => set((state) => ({ isRightSidebarCollapsed: !state.isRightSidebarCollapsed })),
}));

export default useAppStore;