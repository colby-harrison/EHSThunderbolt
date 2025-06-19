import { GlobalDataUpdater } from "@/components/GlobalProvider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <GlobalDataUpdater data={{ showHeader: false }} />
      {children}
    </>
  );
}
