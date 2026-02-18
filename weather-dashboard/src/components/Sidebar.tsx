"use client";

import { 
  LayoutDashboard, 
  CheckSquare, 
  CloudSun, 
  Settings, 
  LogOut, 
  LucideIcon, 
  LayoutTemplate, 
  Target 
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    
    router.push("/login");

    window.location.reload();
  };

  return (
    <div className="flex flex-col h-full p-4 justify-between bg-white border-r-2 border-gray-100 shadow-sm">
      <div>
       
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-blue-600 p-2 rounded-xl inline-flex items-center justify-center shadow-lg shadow-blue-200">
            <LayoutTemplate size={24} className="text-white" />
          </div>
          <span className="font-black text-sm leading-tight text-gray-900 uppercase tracking-tighter">
            Todo & Weather<br /><span className="text-blue-600">Dashboard</span>
          </span>
        </div>

      
        <nav className="space-y-2">
          <Link href="/">
            <NavItem 
              icon={LayoutDashboard} 
              label="Dashboard" 
              active={pathname === "/"} 
            />
          </Link>
         
          <Link href="/aufgaben">
            <NavItem 
              icon={CheckSquare} 
              label="Aufgaben" 
              active={pathname === "/aufgaben"} 
            />
          </Link>
          <Link href="/wetter">
            <NavItem 
              icon={CloudSun} 
              label="Wetter" 
              active={pathname === "/wetter"} 
            />
          </Link>
          <Link href="/ziele">
            <NavItem 
              icon={Target} 
              label="Ziele" 
              active={pathname === "/ziele"} 
            />
          </Link>
        </nav>
      </div>

      <div className="space-y-2">
        <Link href="/settings">
          <NavItem 
            icon={Settings} 
            label="Einstellungen" 
            active={pathname === "/settings"} 
          />
        </Link>
        
        <button 
          onClick={handleLogout} 
          className="w-full text-left outline-none group"
        >
          <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 text-gray-400 hover:bg-red-50 hover:text-red-600 cursor-pointer`}>
            <LogOut size={20} className="group-hover:text-red-500" />
            <span className="text-sm font-bold">Abmelden</span>
          </div>
        </button>
      </div>
    </div>
  );
}


function NavItem({ icon: Icon, label, active }: { icon: LucideIcon, label: string, active: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group cursor-pointer ${
      active 
        ? "bg-blue-600 text-white shadow-blue-100 shadow-lg" 
        : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
    }`}>
      <Icon size={20} className={active ? "text-white" : "group-hover:text-blue-500"} />
      <span className={`text-sm font-bold ${active ? "text-white" : ""}`}>{label}</span>
    </div>
  );
}