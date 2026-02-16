"use client";

import { useState, useEffect } from "react";
import { User, Bell, Lock, Palette, Save, CheckCircle } from "lucide-react";

export default function SettingsPage() {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    
    if (typeof window !== "undefined") {
      const savedFirst = localStorage.getItem("userName") || "Isabelle";
      const savedLast = localStorage.getItem("userLastName") || "Nauber-Geihaar";
      const savedEmail = localStorage.getItem("userEmail") || "isabelle@beispiel.de";
      
      
      setTimeout(() => {
        setFirstName(savedFirst);
        setLastName(savedLast);
        setEmail(savedEmail);
      }, 0);
    }
  }, []);


  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userName", firstName);
      localStorage.setItem("userLastName", lastName);
      localStorage.setItem("userEmail", email);
      
   
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <div className="p-8 bg-[#F4F7F6] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Einstellungen</h1>
          <p className="text-sm text-gray-500 font-medium">Verwalte dein Profil und deine Präferenzen</p>
        </div>
        
     
        {showSuccess && (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
            <CheckCircle size={18} />
            <span className="text-sm font-bold">Änderungen gespeichert!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
      
        <div className="md:col-span-1 space-y-4">
          <div className="bg-gray-100/60 rounded-[2.5rem] border-2 border-gray-200/60 p-4 shadow-inner">
            <nav className="space-y-2">
              <SettingsTab icon={User} label="Profil" active />
              <SettingsTab icon={Bell} label="Benachrichtigungen" />
              <SettingsTab icon={Palette} label="Erscheinungsbild" />
              <SettingsTab icon={Lock} label="Sicherheit" />
            </nav>
          </div>
        </div>

       
        <div className="md:col-span-2">
          <div className="bg-white rounded-[2.5rem] border-2 border-gray-200/60 p-8 shadow-soft transition-all">
            <h2 className="text-xl font-bold mb-6 text-gray-800 tracking-tight">Profil-Einstellungen</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Vorname</label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Vorname"
                    className="bg-gray-50 border-2 border-gray-100 rounded-2xl py-3.5 px-5 text-sm focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-gray-700"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Nachname</label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Nachname"
                    className="bg-gray-50 border-2 border-gray-100 rounded-2xl py-3.5 px-5 text-sm focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-gray-700"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">E-Mail Adresse</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-Mail"
                  className="bg-gray-50 border-2 border-gray-100 rounded-2xl py-3.5 px-5 text-sm focus:border-blue-400 focus:bg-white outline-none transition-all font-bold text-gray-700"
                />
              </div>

              <button 
                onClick={handleSave}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white w-full py-4 rounded-2xl font-black hover:bg-black transition-all shadow-xl shadow-blue-100 mt-4 active:scale-95"
              >
                <Save size={20} />
                Daten lokal speichern
              </button>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mt-4">
                <p className="text-[10px] text-gray-400 text-center uppercase font-black tracking-widest leading-relaxed">
                  Hinweis: Deine Daten werden ausschließlich im LocalStorage deines Browsers gesichert.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


function SettingsTab({ icon: Icon, label, active = false }: { icon: React.ElementType, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-pointer transition-all ${
      active 
        ? "bg-white shadow-md text-blue-600 scale-[1.02]" 
        : "text-gray-500 hover:bg-white/50 hover:text-gray-900"
    }`}>
      <Icon size={18} className={active ? "text-blue-600" : "text-gray-400"} />
      <span className="text-sm font-bold tracking-tight">{label}</span>
    </div>
  );
}