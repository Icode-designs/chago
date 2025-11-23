"use client";
import { usePathname } from "next/navigation";
import { createContext, useState, ReactNode, useEffect } from "react";

interface NavContextType {
  navOpen: boolean;
  toggleNav: () => void;
  openNav: () => void;
  closeNav: () => void;
}

export const NAV_CONTEXT = createContext<NavContextType | undefined>(undefined);

interface NavContextProviderProps {
  children: ReactNode;
}

export function NavContextProvider({ children }: NavContextProviderProps) {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  const toggleNav = () => setNavOpen((prev) => !prev);
  const openNav = () => setNavOpen(true);
  const closeNav = () => setNavOpen(false);

  const value: NavContextType = {
    navOpen,
    toggleNav,
    openNav,
    closeNav,
  };

  return <NAV_CONTEXT.Provider value={value}>{children}</NAV_CONTEXT.Provider>;
}
