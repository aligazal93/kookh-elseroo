import type { Metadata } from "next";

import "../globals.css";

export const metadata: Metadata = {
  title: "لوحة التحكم | كوخ السرور",
  description: "إدارة كوخ السرور والحجوزات والمحتوى",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#f6f7f9] font-sans text-[#202225] antialiased">
        {children}
      </body>
    </html>
  );
}
