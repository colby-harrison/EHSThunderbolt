"use client";

import type React from "react";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface DashboardData {
  dashboardName?: "Admin" | "Writer";
  subpage?: string;
}

interface DashboardContextType {
  dashboardData: DashboardData;
  setDashboardData: (data: DashboardData) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    dashboardName: "Writer",
    subpage: "Home",
  });

  return (
    <DashboardContext.Provider value={{ dashboardData, setDashboardData }}>
      {children}
    </DashboardContext.Provider>
  );
};

/**
 *
 * @returns The current dashboard data
 * @throws {Error} If the DashboardProvider is not used within the component tree
 */
export const useDashboardData = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardData must be used within a DashbaordProvider");
  }
  return context;
};

interface DashboardDataUpdaterProps {
  data: DashboardData;
}

export function DashboardDataUpdater({ data }: DashboardDataUpdaterProps) {
  const { setDashboardData } = useDashboardData();

  useEffect(() => {
    setDashboardData(data);
  }, [data, setDashboardData]);

  return null;
}
