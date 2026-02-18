"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isLoggedIn") === "true";
      
      setIsLoggedIn(authStatus);

      if (!authStatus && pathname !== "/login" && pathname !== "/register") {
        router.replace("/login");
      }
    };

    checkAuth();
  }, [pathname, router]);

  
  return (
    <html lang="de" suppressHydrationWarning> 
      <body className="bg-[#F4F7F6]" suppressHydrationWarning>
        {isLoggedIn === null ? (
          <div className="flex items-center justify-center min-h-screen">Laden...</div>
        ) : pathname === "/login" || pathname === "/register" ? (
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