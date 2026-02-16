"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutTemplate, User, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() !== "") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", name);
      
      router.push("/");
      
      
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };
  return (
    <div className="min-h-screen bg-[#F4F7F6] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[3rem] border-2 border-gray-100 p-10 shadow-xl">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-blue-600 p-4 rounded-2xl mb-4 shadow-lg shadow-blue-100">
            <LayoutTemplate size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">
            Willkommen zurück
          </h1>
          <p className="text-gray-400 font-bold text-xs mt-2 uppercase tracking-widest">
            Bitte melde dich an
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Dein Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="z.B. Isabelle" 
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold outline-none focus:border-blue-400 transition-all"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg active:scale-95 group"
          >
            Dashboard betreten
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="text-[10px] text-gray-400 text-center mt-8 uppercase font-bold tracking-widest">
          Deine Daten bleiben lokal in deinem Browser
        </p>
      </div>
    </div>
  );
}