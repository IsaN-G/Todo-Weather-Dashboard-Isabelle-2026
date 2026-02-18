"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DailySummary() {
  
  const [userName, setUserName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userName") || "Isabelle";
    }
    return "Isabelle";
  });

  

  useEffect(() => {
  
  }, []);

  const today = new Date();
  const dayName = today.toLocaleDateString("de-DE", { weekday: "long" });
  const dayNumber = today.getDate();
  const monthName = today.toLocaleDateString("de-DE", { month: "long" });

  return (
    <Link href="/kalender" className="block group">
      <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.01]">
        
       
        <div className="absolute inset-0 bg-[#1e252b]">
        
          <div className="absolute top-[-20%] left-[20%] w-32 h-32 bg-blue-500/40 blur-[50px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] left-[10%] w-40 h-40 bg-blue-600/30 blur-[60px] rounded-full" />
          <div className="absolute top-[10%] right-[10%] w-32 h-32 bg-teal-400/20 blur-[50px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[30%] w-32 h-32 bg-teal-500/30 blur-[50px] rounded-full" />
        </div>

        
        <div className="relative z-10 p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
        
          <div className="space-y-6 text-center md:text-left">
           
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-black/20 backdrop-blur-md">
              <div className="p-1 bg-blue-500 rounded-md">
                <Sparkles size={12} className="text-white" />
              </div>
              <span className="text-[10px] font-black text-white uppercase tracking-widest">
                Dein <span className="text-blue-400">Dashboard</span>
              </span>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                Guten Tag, <br />
                <span className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  {userName}
                </span>
              </h2>
              <p className="text-gray-400 text-xl font-medium pt-4">
                Hier geht es direkt zu deinem
              </p>
              <p className="text-teal-400 text-3xl font-black uppercase tracking-tighter group-hover:scale-105 transition-transform origin-left">
                Kalender
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            
            <div className="text-right space-y-1">
              <p className="text-blue-400 text-sm font-black uppercase tracking-[0.2em]">{monthName}</p>
              <p className="text-8xl font-black text-white leading-none tracking-tighter">{dayNumber}</p>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">{dayName}</p>
            </div>

           
            <div className="relative group-hover:rotate-3 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-teal-400 blur-xl opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gradient-to-br from-blue-500 to-teal-400 p-8 rounded-[2.5rem] shadow-2xl flex items-center justify-center">
                <Calendar className="text-white" size={56} strokeWidth={1.5} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
}