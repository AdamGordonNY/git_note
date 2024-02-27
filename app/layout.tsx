import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"], weight: ["200"] });

export const metadata: Metadata = {
  title: "GitNote - Personal Git Notebook",
  description:
    "A platform for Software Developers to store information and knowledge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </SessionProvider>
  );
}
