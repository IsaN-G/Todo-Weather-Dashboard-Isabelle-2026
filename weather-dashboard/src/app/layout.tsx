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

      if (!authStatus && pathname !== "/login") {
        router.replace("/login");
      }
    };

    checkAuth();
  }, [pathname, router]);

  
  if (isLoggedIn === null) {
    return (
      <html lang="de">
        <body className="bg-[#F4F7F6]" />
      </html>
    );
  }
  if (pathname === "/login") {
    return (
      <html lang="de">
        <body className="bg-[#F4F7F6]">{children}</body>
      </html>
    );
  }

  return (
    <html lang="de">
      <body className="bg-[#F4F7F6]">
        <div className="flex min-h-screen">
          <aside className="w-64 fixed inset-y-0 z-50">
            <Sidebar />
          </aside>
          <main className="flex-1 ml-64 p-0"> 
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}