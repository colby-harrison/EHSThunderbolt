"use client";

import type React from "react";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface GlobalData {
  showHeader?: boolean;
  loading?: boolean;
}

interface GlobalContextType {
  globalData: GlobalData;
  setGlobalData: (data: GlobalData) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [globalData, setGlobalData] = useState<GlobalData>({
    showHeader: true,
    loading: false,
  });

  return (
    <GlobalContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </GlobalContext.Provider>
  );
};

/**
 *
 * @returns The current global data
 * @throws {Error} If the GlobalProvider is not used within the component tree
 */
export const useGlobalData = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalData must be used within a GlobalProvider");
  }
  return context;
};

interface GlobalDataUpdaterProps {
  data: GlobalData;
}

export function GlobalDataUpdater({ data }: GlobalDataUpdaterProps) {
  const { setGlobalData } = useGlobalData();

  useEffect(() => {
    setGlobalData(data);
  }, [data, setGlobalData]);

  return null;
}