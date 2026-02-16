"use client";

import TodoWidget from "@/components/TodoWidget";
import { LayoutDashboard, Filter, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AufgabenPage() {
  return (
    <div className="p-8 bg-[#F4F7F6] min-h-screen">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <Link href="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
              <ArrowLeft size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Zurück</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Deine Aufgaben</h1>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border-2 border-gray-200/60 px-4 py-2 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
     
        <div className="lg:col-span-2">
          <TodoWidget />
        </div>

 
        <div className="space-y-6">
          <div className="bg-gray-100/60 rounded-[2.5rem] border-2 border-gray-200/60 p-6 shadow-inner">
            <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-tight">Kategorien</h3>
            <div className="space-y-3">
              <CategoryItem label="Arbeit" count={5} color="bg-blue-500" />
              <CategoryItem label="Privat" count={2} color="bg-purple-500" />
              <CategoryItem label="Einkauf" count={0} color="bg-orange-500" />
            </div>
          </div>

          <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-lg relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Produktivität</h3>
              <p className="text-blue-100 text-sm mb-4">Du hast diese Woche 12 Aufgaben erledigt. Weiter so!</p>
              <div className="w-full bg-blue-400/30 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full w-[75%] rounded-full" />
              </div>
            </div>
            <LayoutDashboard className="absolute -right-4 -bottom-4 text-blue-500/20 w-32 h-32 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryItem({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-sm font-bold text-gray-700">{label}</span>
      </div>
      <span className="text-xs font-black text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">{count}</span>
    </div>
  );
}