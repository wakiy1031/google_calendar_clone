import type { Metadata } from "next";
import "./globals.css";
import { UIProvider } from "@yamada-ui/react";

export const metadata: Metadata = {
  title: "Calendar App",
  description: "Calendar application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="font-sans">
        <UIProvider>
          <main className="min-h-screen bg-gray-100">{children}</main>
        </UIProvider>
      </body>
    </html>
  );
}
