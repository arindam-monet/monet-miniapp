"use client";

import localFont from 'next/font/local';
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Root } from "@/components/Root/Root";
import { LayoutProvider, useLayout } from "@/context/layout-context";


const minecraftFont = localFont({ src: './fonts/Minecraft.ttf' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={cn(minecraftFont.className)}>
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
        {children}
        {/* {state.showBottomBar && <BottomMenu />} */}
      </Root>
    </ThemeProvider>
  );
};
