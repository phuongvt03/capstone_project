import type { Metadata } from "next";
import { Geist, Geist_Mono, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Provider from "@/providers";
import { WarningProvider } from "@/context/warning-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  variable: "--font-be-vietnam-pro",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LamThuePLC",
  description: "Ứng dụng quản lý",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${beVietnam.variable} antialiased min-h-screen`}
      >
        <WarningProvider>
          <Provider>
            <NextTopLoader color="#000" height={3} />
            {children}
          </Provider>
        </WarningProvider>
      </body>
    </html>
  );
}
