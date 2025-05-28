import { GlobalDataUpdater } from "@/components/global-provider";


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