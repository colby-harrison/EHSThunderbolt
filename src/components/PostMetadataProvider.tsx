"use client";

import type React from "react";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface MetadataData {
  title: string;
  date: string;
  categories: string[];
  coverImage?: string;
  excerpt?: string;
  legacy?: boolean;
  author?: {
    name: string;
    role: string;
  } | string;
}

interface MetadataContextType {
  metadataData: MetadataData;
  setMetadataData: (data: MetadataData) => void;
}

const MetadataContext = createContext<MetadataContextType | undefined>(undefined);

export const MetadataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [metadataData, setMetadataData] = useState<MetadataData>({
    title: "",
    date: "",
    categories: [],
    legacy: false,
  });

  return (
    <MetadataContext.Provider value={{ metadataData, setMetadataData }}>
      {children}
    </MetadataContext.Provider>
  );
};

/**
 *
 * @returns The current Metadata data
 * @throws {Error} If the MetadataProvider is not used within the component tree
 */
export const useMetadataData = (): MetadataContextType => {
  const context = useContext(MetadataContext);
  if (!context) {
    throw new Error("useMetadataData must be used within a MetadataProvider");
  }
  return context;
};

interface MetadataDataUpdaterProps {
  data: MetadataData;
}

export function MetadataDataUpdater({ data }: MetadataDataUpdaterProps) {
  const { setMetadataData } = useMetadataData();

  useEffect(() => {
    setMetadataData(data);
  }, [data, setMetadataData]);

  return null;
}