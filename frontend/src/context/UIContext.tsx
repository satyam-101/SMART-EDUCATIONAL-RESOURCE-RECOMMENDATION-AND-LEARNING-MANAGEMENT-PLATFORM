import { type ReactNode, createContext, useContext, useState } from 'react';

interface UIContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

const UIContext = createContext<UIContextType>({ sidebarOpen: false, setSidebarOpen: () => {} });

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return <UIContext.Provider value={{ sidebarOpen, setSidebarOpen }}>{children}</UIContext.Provider>;
};

export const useUIContext = () => useContext(UIContext);
