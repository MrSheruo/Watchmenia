import { createContext, useContext, useEffect, useState } from "react";

type sidebarProviderProps = {
  children: React.ReactNode;
};

type sidebarContextProps = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};
const sidebarContext = createContext<sidebarContextProps | null>(null);

export function useSidebarContext() {
  const value = useContext(sidebarContext);
  if (value == null)
    throw Error("useSidebarContext must be used inside a SidebarProvider");

  return value;
}
export function SidebarProvider({ children }: sidebarProviderProps) {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);
  const isSmallScreen = () => window.innerWidth < 1024;

  useEffect(() => {
    const handler = () => {
      if (!isSmallScreen()) setIsSmallOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  function toggle() {
    if (isSmallScreen()) {
      setIsSmallOpen((v) => !v);
    } else {
      setIsLargeOpen((v) => !v);
    }
  }
  function close() {
    if (isSmallScreen()) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  }
  return (
    <sidebarContext.Provider
      value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
        close,
      }}
    >
      {children}
    </sidebarContext.Provider>
  );
}
