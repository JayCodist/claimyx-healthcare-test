import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Healthcare Claims Dashboard",
  description: "A dashboard for managing and analyzing healthcare claims",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-[#eaf0f1] dark:bg-background`}>
        <ThemeProvider>
          <div className="relative">
            <div className="absolute right-4 top-4 z-50">
              <ThemeSwitcher />
            </div>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
