"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Wir speichern die echten Daten aus der MongoDB Cloud im Browser
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", data.user.firstName);
        localStorage.setItem("userLastName", data.user.lastName);
        localStorage.setItem("userEmail", data.user.email);
        
        // Weiterleitung zum Dashboard
        router.push("/");
        // Kurzer Refresh, damit der Header den Namen sofort anzeigt
        setTimeout(() => window.location.reload(), 100);
      } else {
        alert("Fehler: " + data.message);
      }
    } catch  {
      alert("Verbindung zur Datenbank fehlgeschlagen.");
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
            <LogIn className="text-blue-600" size={32} />
          </div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Anmelden</h1>
          <p className="text-gray-500 font-medium text-sm mt-2">Willkommen zurück im Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* E-Mail */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Deine E-Mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                required
                type="email" 
                placeholder="marc@beispiel.de" 
                className="w-full bg-gray-50 py-4 pl-12 pr-6 rounded-2xl border-2 border-transparent outline-none focus:border-blue-400 focus:bg-white transition-all font-bold text-sm"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Passwort */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Dein Passwort</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                required
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-gray-50 py-4 pl-12 pr-6 rounded-2xl border-2 border-transparent outline-none focus:border-blue-400 focus:bg-white transition-all font-bold text-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-gray-900 transition-all shadow-lg active:scale-95 disabled:opacity-50 mt-4"
          >
            {loading ? "Wird geprüft..." : "Einloggen"} 
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Link zur Registrierung */}
        <p className="text-center mt-8 text-sm font-medium text-gray-500">
          Neu hier?{" "}
          <Link href="/register" className="text-blue-600 font-bold hover:underline">
            Konto erstellen
          </Link>
        </p>
      </div>
    </div>
  );
}