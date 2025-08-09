import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { Layout } from "@/components/site/layout";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { GlobalProvider } from "@/components/GlobalProvider";

export const metadata: Metadata = {
  title: "EHS Thunderbolt",
  description: "Cheyenne East High School's Student news website",
  icons: [{ rel: "icon", url: "/CheyenneEast.png" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <GlobalProvider>
        <html lang='en' className={`${geist.variable} dark`}>
          <body className='h-dvh w-dvw max-w-dvw'>
            <ConvexClientProvider>
              <Layout>{children}</Layout>
            </ConvexClientProvider>
          </body>
        </html>
      </GlobalProvider>
    </ConvexAuthNextjsServerProvider>
  );
}
