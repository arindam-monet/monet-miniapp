"use client";

import { Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Root } from "@/components/Root/Root";
import Navbar from "@/components/navbar";
import { LayoutProvider, useLayout } from "@/context/layout-context";
import BottomMenu from "@/components/bottom-menu";

const pixelify_sans = Pixelify_Sans({
  weight: "400",
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={cn(pixelify_sans.className)}>
        <LayoutProvider>
          <LayoutContent>{children}</LayoutContent>
        </LayoutProvider>
      </body>
    </html>
  );
}

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { state } = useLayout();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={false}
      disableTransitionOnChange
    >
      <Root>
        <Navbar />
        {children}
        {state.showBottomBar && <BottomMenu />}
      </Root>
    </ThemeProvider>
  );
};
