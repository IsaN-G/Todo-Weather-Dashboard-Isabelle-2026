"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight, UserPlus, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        
        router.push("/login");
      } else {
        setError(data.message || "Registrierung fehlgeschlagen");
      }
    } catch {
      setError("Verbindungsfehler zur Datenbank.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 border-2 border-white">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-100 mb-4">
            <UserPlus className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Konto erstellen</h1>
          <p className="text-gray-400 font-bold text-sm uppercase tracking-widest mt-2">Join the Dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-100 text-red-600 p-4 rounded-2xl mb-6 flex items-center gap-3">
            <AlertCircle size={20} />
            <p className="text-xs font-black uppercase">{error}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Vorname</label>
              <input 
                required type="text" placeholder="Max"
                className="w-full bg-gray-50 py-4 px-6 rounded-2xl border-2 border-transparent outline-none focus:border-blue-400 transition-all font-bold text-sm"
                value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Nachname</label>
              <input 
                required type="text" placeholder="Mustermann"
                className="w-full bg-gray-50 py-4 px-6 rounded-2xl border-2 border-transparent outline-none focus:border-blue-400 transition-all font-bold text-sm"
                value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-4">E-Mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                required type="email" placeholder="name@beispiel.de"
                className="w-full bg-gray-50 py-4 pl-12 pr-6 rounded-2xl border-2 border-transparent outline-none focus:border-blue-400 transition-all font-bold text-sm"
                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Passwort</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                required type="password" placeholder="••••••••"
                className="w-full bg-gray-50 py-4 pl-12 pr-6 rounded-2xl border-2 border-transparent outline-none focus:border-blue-400 transition-all font-bold text-sm"
                value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-gray-900 transition-all shadow-lg active:scale-95 disabled:opacity-50 mt-4">
            {loading ? "Wird erstellt..." : "Konto erstellen"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="text-center mt-8 text-sm font-medium text-gray-500">
          Bereits ein Konto? <Link href="/login" className="text-blue-600 font-bold hover:underline">Einloggen</Link>
        </p>
      </div>
    </div>
  );
}