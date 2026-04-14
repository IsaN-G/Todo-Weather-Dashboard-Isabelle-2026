"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, LogIn, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", data.user.firstName);
        document.cookie = `isLoggedIn=true; path=/; max-age=86400; SameSite=Lax`;
        router.replace("/");
      } else {
        setError(data.message || "Anmeldung fehlgeschlagen");
      }
    } catch {
      setError("Verbindungsfehler zur Datenbank.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Hintergrund mit animiertem Gradient (über CSS-Animation in globals.css oder Tailwind)
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-900 via-blue-800 to-teal-700">
      
      {/* Glas-Karte */}
      <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] p-10">
        
        {/* Glow-Effekte im Hintergrund der Karte */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-teal-500/30 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex flex-col items-center mb-10">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md border border-white/30 shadow-inner mb-4">
              <LogIn className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">Willkommen</h1>
            <p className="text-blue-100/70 font-bold text-xs uppercase tracking-[0.2em] mt-2">Personal Dashboard</p>
          </div>

          {error && (
            <div className="bg-red-500/20 backdrop-blur-md border border-red-500/50 text-white p-4 rounded-2xl mb-6 flex items-center gap-3">
              <AlertCircle size={20} className="text-red-300" />
              <p className="text-xs font-bold uppercase tracking-wide">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-blue-100/50 ml-4 tracking-wider">E-Mail Adresse</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-100/40 group-focus-within:text-white transition-colors" size={18} />
                <input 
                  required type="email" placeholder="name@beispiel.de"
                  className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-6 rounded-2xl outline-none focus:bg-white/10 focus:border-white/40 transition-all text-white font-medium placeholder:text-blue-100/30"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-blue-100/50 ml-4 tracking-wider">Passwort</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-100/40 group-focus-within:text-white transition-colors" size={18} />
                <input 
                  required type="password" placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-6 rounded-2xl outline-none focus:bg-white/10 focus:border-white/40 transition-all text-white font-medium placeholder:text-blue-100/30"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-white text-blue-900 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-50 hover:scale-[1.02] transition-all shadow-[0_10px_20px_-5px_rgba(255,255,255,0.3)] active:scale-95 disabled:opacity-50 mt-6"
            >
              {loading ? "Wird geprüft..." : "Einloggen"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="text-center mt-10 text-sm font-medium text-blue-100/60">
            Neu hier? <Link href="/register" className="text-white font-black hover:underline underline-offset-4">Konto erstellen</Link>
          </p>
        </div>
      </div>
    </div>
  );
}