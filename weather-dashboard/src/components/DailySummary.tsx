"use client";

import React, { useState } from "react";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";

export default function DailySummary() {
  const [userName] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("userName") || "Isabelle";
    return "Isabelle";
  });

  const nextEvent = {
    title: "Team-Call: Projekt Dashboard",
    time: "14:00 - 15:30",
    location: "Zoom Meeting"
  };

  const days = ["M", "D", "M", "D", "F", "S", "S"];
  const activeDay = 1; 

  return (
    /* h-auto statt fester Höhe, damit nichts gequetscht wirkt */
    <div className="relative w-full max-w-4xl mx-auto min-h-[240px] rounded-[3rem] overflow-hidden shadow-2xl group border-4 border-white/5 transition-all duration-500 hover:shadow-blue-500/10">
      
      {/* Hintergrundbild */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0f172a]/85 to-[#1e293b]/40" />
      </div>

      <div className="relative z-10 h-full p-10 flex flex-col justify-between text-white">
        
        {/* HEADER: Begrüßung & Heatmap */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-1">
            <h2 className="text-4xl font-black tracking-tight drop-shadow-lg">
              Hallo, <span className="text-blue-400">{userName}</span>
            </h2>
            <div className="flex items-center gap-2 opacity-70">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[11px] font-black uppercase tracking-[0.3em]">Status: Dein Tag ist geplant</p>
            </div>
          </div>

          {/* Mini-Kalender Heatmap - Mehr Abstand zwischen den Tagen */}
          <div className="flex gap-3 bg-black/30 backdrop-blur-xl p-4 rounded-[1.5rem] border border-white/10 shadow-2xl">
            {days.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-[9px] font-bold text-blue-200/40 uppercase">{day}</span>
                <div className={`w-4 h-4 rounded-md transition-all duration-500 ${i === activeDay ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] scale-110' : 'bg-white/5'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* CENTER: Nächster Termin - Großzügiges Layout */}
        <div className="mt-10 flex items-center gap-6 group/item cursor-pointer">
          <Link href="/kalender" className="flex items-center gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-[1.8rem] shadow-xl shadow-blue-500/20 group-hover/item:scale-110 transition-transform">
                <Calendar className="text-white" size={28} />
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                <Clock size={12} /> Nächstes Event • {nextEvent.time}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                {nextEvent.title}
                </h3>
                <p className="text-sm text-white/40 font-medium flex items-center gap-1.5">
                    <MapPin size={14} /> {nextEvent.location}
                </p>
            </div>
          </Link>
        </div>

        {/* FOOTER: Button */}
        <div className="mt-8 flex justify-end">
          <Link href="/kalender">
            <button className="bg-blue-600 hover:bg-white backdrop-blur-md text-white hover:text-[#0f172a] px-8 py-3 rounded-2xl font-black text-[11px] flex items-center gap-3 transition-all shadow-2xl active:scale-95 group/btn border border-blue-400/20">
              VOLLSTÄNDIGER KALENDER
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}