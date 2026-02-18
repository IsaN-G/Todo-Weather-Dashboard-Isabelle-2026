"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight, UserPlus } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Erfolg! Wir speichern den Namen lokal für die Begrüßung
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", formData.firstName);
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userLastName", formData.lastName);
        
        router.push("/");
        // Kurzer Reload, damit das Layout den Login-Status erkennt
        setTimeout(() => window.location.reload(), 100);
      } else {
        alert("Fehler: " + data.message);
      }
    } catch  {
      alert("Ein Fehler ist aufgetreten. Prüfe deine Verbindung.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl border-2 border-gray-100 animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="text-blue-600" size={32} />
          </div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Konto erstellen</h1>
          <p className="text-gray-500 font-medium text-sm mt-2">Werde Teil deines Dashboards</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Vor- und Nachname */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Vorname</label>
              <input 
                required
                placeholder="Marc" 
                className="w-full bg-gray-50 p-4 rounded-2xl border-2 border-transparent outline-none focus:border-blue-400 focus:bg-white transition-all font-bold text-sm"
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Nachname</label>
              <input 
                required
                placeholder="Mustermann" 
                className="w-full bg-gray-50 p-4 rounded-2xl border-2 border-transparent outline-none focus:border-blue-400 focus:bg-white transition-all font-bold text-sm"
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          {/* E-Mail */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-4">E-Mail Adresse</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                required
                type="email" 
                placeholder="name@beispiel.de" 
                className="w-full bg-gray-50 py-4 pl-12 pr-6 rounded-2xl border-2 border-transparent outline-none focus:border-blue-400 focus:bg-white transition-all font-bold text-sm"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* Passwort */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Passwort</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                required
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-gray-50 py-4 pl-12 pr-6 rounded-2xl border-2 border-transparent outline-none focus:border-blue-400 focus:bg-white transition-all font-bold text-sm"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-gray-900 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? "Wird gespeichert..." : "Jetzt Registrieren"} 
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center mt-8 text-sm font-medium text-gray-500">
          Du hast schon ein Konto?{" "}
          <Link href="/login" className="text-blue-600 font-bold hover:underline">
            Einloggen
          </Link>
        </p>
      </div>
    </div>
  );
}