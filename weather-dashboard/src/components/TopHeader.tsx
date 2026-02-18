"use client";

import { useState, useEffect } from "react";
import { Search, Bell, CheckCircle2, AlertCircle, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TopHeaderProps {
  name: string;
  onSearch: (value: string) => void;
}

export default function TopHeader({ name, onSearch }: TopHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [userName, setUserName] = useState(name);

  // Synchronisiere den Namen, falls er sich im Dashboard ändert
  useEffect(() => {
    setUserName(name);
  }, [name]);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight text-left">
          Guten Tag, {userName}!
        </h1>
        <p className="text-gray-500 text-sm font-medium mt-1 text-left">Montag, 16. Februar 2026</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Suchleiste */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Aufgaben suchen..." 
            onChange={(e) => onSearch(e.target.value)}
            className="bg-white border-2 border-transparent rounded-full py-3 pl-12 pr-6 text-sm shadow-soft focus:ring-4 focus:ring-blue-100 focus:border-blue-200 transition-all outline-none w-64 font-medium"
          />
        </div>

        {/* GLOCKE & BENACHRICHTIGUNGEN */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            title="Benachrichtigungen"
            aria-label="Benachrichtigungen anzeigen"
            className={`relative p-3 rounded-full shadow-soft transition-all group ${
              showNotifications ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Bell size={20} className={showNotifications ? 'text-white' : 'group-hover:text-blue-500'} />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-4 w-72 bg-white rounded-[2rem] shadow-2xl border border-gray-100 z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* ... Benachrichtigungs-Inhalt (wie zuvor) ... */}
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest text-left">Benachrichtigungen</h3>
                <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">Neu</span>
              </div>
              <div className="space-y-2">
                <Link href="/aufgaben" onClick={() => setShowNotifications(false)} className="flex items-start gap-3 p-3 hover:bg-blue-50 rounded-2xl transition-colors group text-left">
                  <AlertCircle size={16} className="text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-gray-700 leading-snug">Du hast heute 3 offene Aufgaben</p>
                    <p className="text-[10px] text-blue-400 font-bold mt-1">Jetzt erledigen →</p>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* DYNAMISCHES PROFIL-BADGE */}
        <div className="flex items-center gap-3 ml-2 bg-white p-1.5 pr-5 rounded-full border border-gray-100 shadow-sm">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-50 shadow-inner bg-blue-100 flex items-center justify-center">
            {/* Wenn der Name Isabelle ist, zeigen wir dein Bild, sonst ein Icon oder Initialen */}
            {userName.toLowerCase().includes("isabelle") ? (
              <Image 
                src="/images/profil.jpg" 
                alt="Profil" 
                fill
                className="object-cover"
                priority 
              />
            ) : (
              <span className="text-blue-600 font-black text-sm uppercase">
                {userName.substring(0, 2)}
              </span>
            )}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-black text-gray-900 leading-none">{userName}</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">
              {userName.toLowerCase().includes("isabelle") ? "Webentwicklerin" : "Benutzer"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}