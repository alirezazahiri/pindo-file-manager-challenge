import type React from "react";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { RootLayout } from "@/components/layout";
import { FileSystemProvider } from "@/providers";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export const metadata: Metadata = {
  title: "File Manager",
  description: "Pindo - Code challenge",
};

const figtree = Figtree({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-figtree",
});

const Layout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className={figtree.variable} suppressHydrationWarning>
      <body className="min-h-screen grid grid-rows-[80px_1fr]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RootLayout.Header />
          <FileSystemProvider>
            <main>{children}</main>
            <Toaster position="bottom-right" richColors closeButton />
          </FileSystemProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
