import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/core/dark-mode/theme-provider";
import Navbar from "@/components/core/navbar/page";
import { ModalProvider } from "@/provider/modal-provider";
import { ToastProvider } from "@/provider/toast-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
    <html lang="en">
      <body>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <header>
        </header>
        <ModalProvider/>
       <ToastProvider/>
        <main>
          {children}
        </main>
          </ThemeProvider>
      </body>
    </html>
  </ClerkProvider>
  );
}
