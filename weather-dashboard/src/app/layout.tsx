"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Wir prüfen nur, ob wir auf einer Auth-Seite sind
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <html lang="de" suppressHydrationWarning> 
      <body className="bg-[#F4F7F6]" suppressHydrationWarning>
        {isAuthPage ? (
          children
        ) : (
          <div className="flex min-h-screen">
            <aside className="w-64 fixed inset-y-0 z-50">
              <Sidebar />
            </aside>
            <main className="flex-1 ml-64 p-0">{children}</main>
          </div>
        )}
      </body>
    </html>
  );
}