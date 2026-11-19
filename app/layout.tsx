import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";

export const metadata: Metadata = {
  title: "ViceCloud | Play GTA VI on Any Low-End PC & Laptop (4K 60FPS)",
  description:
    "Instant cloud gaming access to real PlayStation 5 hardware running Grand Theft Auto VI. Zero downloads, ultra-low latency, full keyboard & mouse and controller support.",
  keywords: [
    "GTA 6 Cloud Gaming",
    "Play GTA VI on PC",
    "PS5 Cloud Rental",
    "GTA 6 Low Spec PC",
    "Cloud Gaming Platform",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#08080f] text-slate-100 antialiased selection:bg-pink-500 selection:text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
