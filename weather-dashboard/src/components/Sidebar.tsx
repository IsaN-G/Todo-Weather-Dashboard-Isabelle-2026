"use client";

import { useEffect, useState } from "react";
import { 
  LayoutDashboard, CheckSquare, CloudSun, Settings, 
  LogOut, LucideIcon, LayoutTemplate, Target, Calendar 
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getUserAction } from "@/actions/userActions";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  
  
  const [userData, setUserData] = useState<{name: string, job: string, initial: string} | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const email = localStorage.getItem("userEmail");
      if (email) {
        const result = await getUserAction(email);
        if (result.success && result.data) {
          setUserData({
            name: `${result.data.firstName} ${result.data.lastName}`,
            job: result.data.jobTitle || "Mitglied",
            initial: result.data.firstName.charAt(0).toUpperCase() 
          });
        }
      }
    }
    loadProfile();
  }, [pathname]);

  const handleLogout = () => {
    document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    localStorage.clear();
    router.push("/login");
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <div className="flex flex-col h-full p-6 justify-between bg-gray-300 border-r border-gray-300 shadow-[20px_0_40px_rgba(0,0,0,0.02)]">
      <div className="space-y-12">
        
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="w-18 h-10 bg-black rounded-lg flex items-center justify-center shadow-2xl">
              <LayoutTemplate size={18} className="text-white" />
            </div>
            <span className="font-black text-sm tracking-tighter text-black uppercase">
              TODO & WEATHER<span className="text-blue-600"> DASHBOARD</span>
            </span>
          </div>

          {userData && (
            <div className="group px-2 py-4 rounded-[2rem] hover:bg-gray-50 transition-all duration-500 cursor-default">
              <div className="flex items-center gap-4">
                
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-black font-medium text-xl border border-gray-200 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all duration-500">
                  {userData.initial}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-gray-900 tracking-tight leading-none mb-1.5">
                    {userData.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                      {userData.job}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        
        <nav className="space-y-1">
          <Link href="/"><NavItem icon={LayoutDashboard} label="Übersicht" active={pathname === "/"} /></Link>
          <Link href="/aufgaben"><NavItem icon={CheckSquare} label="Aufgaben" active={pathname === "/aufgaben"} /></Link>
          <Link href="/kalender"><NavItem icon={Calendar} label="Kalender" active={pathname === "/kalender"} /></Link>
          <Link href="/wetter"><NavItem icon={CloudSun} label="Wetter" active={pathname === "/wetter"} /></Link>
          <Link href="/ziele"><NavItem icon={Target} label="Ziele" active={pathname === "/ziele"} /></Link>
        </nav>
      </div>

      <div className="space-y-1">
        <Link href="/settings">
          <NavItem icon={Settings} label="Einstellungen" active={pathname === "/settings"} />
        </Link>
        <button onClick={handleLogout} className="w-full text-left outline-none pt-2">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-400 hover:text-red-500 transition-colors">
            <LogOut size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Abmelden</span>
          </div>
        </button>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, active }: { icon: LucideIcon, label: string, active: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group cursor-pointer ${
      active 
        ? "bg-gray-900 text-white" 
        : "text-gray-600 hover:text-black hover:bg-gray-50"
    }`}>
      <Icon size={18} />
      <span className="text-sm font-bold tracking-tight">{label}</span>
    </div>
  );
}