"use client";

import React, { useState } from "react";
import { Search, Bell, User } from "lucide-react";
import Link from "next/link";

interface TopHeaderProps {
  name: string;
  onSearch: (query: string) => void;
  notificationCount: number;
}

export default function TopHeader({ name, onSearch, notificationCount }: TopHeaderProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
   
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Hallo, <span className="text-blue-600">{name}</span> 👋
        </h1>
        <p className="text-gray-500 font-bold text-sm uppercase tracking-widest mt-1">
          Dein persönlicher Planer
        </p>
      </div>

      <div className="flex items-center gap-4">
       
        <form onSubmit={handleSubmit} className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Aufgaben suchen..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-white border-2 border-transparent py-3 pl-12 pr-6 rounded-2xl shadow-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 transition-all w-full md:w-64 font-bold text-sm"
          />
        </form>

        <Link href="/aufgaben" className="relative group">
          <button 
            title="Zu deinen offenen Aufgaben"
            aria-label={`${notificationCount} offene Aufgaben`}
            className="bg-white p-3.5 rounded-2xl shadow-sm border-2 border-transparent hover:border-blue-100 hover:bg-blue-50 transition-all active:scale-95"
          >
            <Bell size={22} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
          </button>
          
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-4 border-[#F4F7F6] shadow-lg animate-pulse">
              {notificationCount}
            </span>
          )}
        </Link>

        <div className="bg-blue-800 p-3.5 rounded-2xl shadow-lg border-2 border-gray-800">
          <User size={22} className="text-white" />
        </div>
      </div>
    </div>
  );
}