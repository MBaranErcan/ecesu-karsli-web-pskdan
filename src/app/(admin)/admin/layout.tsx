import type { Metadata } from "next";
import "@/app/globals.css";
import { inter, lora } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} ${lora.variable}`}>
      <body className="min-h-screen bg-ink-50 text-ink-800">{children}</body>
    </html>
  );
}
