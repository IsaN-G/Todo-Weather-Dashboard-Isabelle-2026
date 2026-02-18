"use client";

import React, { useState, useEffect } from "react";
import { 
  User, Bell, Lock, Palette, Save, CheckCircle, 
  MapPin, Phone, Globe, Briefcase, Loader2,
  LucideIcon 
} from "lucide-react";
import { updateUserAction, getUserAction, UserData } from "@/actions/userActions";

export default function SettingsPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    async function init() {
     
      const storedEmail = localStorage.getItem("userEmail");
      
      if (storedEmail) {
        setEmail(storedEmail);
        
       
        const result = await getUserAction(storedEmail);
        
        if (result.success && result.data) {
          const d = result.data;
          setFirstName(d.firstName || "");
          setLastName(d.lastName || "");
          setJobTitle(d.jobTitle || "");
          setLocation(d.location || "");
          setPhone(d.phone || "");
          setWebsite(d.website || "");
          setBio(d.bio || "");
        }
      }
      setIsInitialLoading(false);
    }
    init();
  }, []);

  const handleSave = async () => {
    if (!email) return; 

    setIsPending(true);
    const result = await updateUserAction({
      firstName, lastName, email, jobTitle, location, phone, website, bio
    });

    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
    setIsPending(false);
  };

  if (isInitialLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F4F7F6]">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#F4F7F6] min-h-screen">
     
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Profil</h1>
          <p className="text-sm text-gray-500 font-medium font-bold uppercase tracking-widest">
            Konto: <span className="text-blue-600">{email}</span>
          </p>
        </div>
        {showSuccess && (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 shadow-sm animate-in fade-in slide-in-from-top-2">
            <CheckCircle size={18} />
            <span className="text-sm font-bold">In MongoDB gespeichert!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-1 space-y-4">
          <div className="bg-gray-100/60 rounded-[2.5rem] border-2 border-gray-200/60 p-4 shadow-inner">
            <nav className="space-y-2">
              <SettingsTab icon={User} label="Profil" active />
              <SettingsTab icon={Briefcase} label="Beruf" />
              <SettingsTab icon={Palette} label="Design" />
            </nav>
          </div>
        </div>

     
        <div className="md:col-span-2">
          <div className="bg-white rounded-[2.5rem] border-2 border-gray-200/60 p-8 shadow-sm">
            <div className="space-y-8">
              <section>
                <h2 className="text-lg font-bold mb-4 text-gray-800">Persönlich</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputGroup label="Vorname" value={firstName} onChange={setFirstName} />
                  <InputGroup label="Nachname" value={lastName} onChange={setLastName} />
                </div>
              </section>

              <section>
                <h2 className="text-lg font-bold mb-4 text-gray-800">Kontakt</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputGroup label="Jobtitel" icon={Briefcase} value={jobTitle} onChange={setJobTitle} />
                  <InputGroup label="Website" icon={Globe} value={website} onChange={setWebsite} />
                  <InputGroup label="Telefon" icon={Phone} value={phone} onChange={setPhone} />
                  <InputGroup label="Standort" icon={MapPin} value={location} onChange={setLocation} />
                </div>
              </section>

              <section className="flex flex-col gap-2">
                <label htmlFor="bio" className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Bio</label>
                <textarea 
                  id="bio"
                  title="Biografie"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full mt-2 bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm outline-none focus:border-blue-400 transition-all font-bold text-gray-700 min-h-[120px]"
                />
              </section>

              <button 
                onClick={handleSave}
                disabled={isPending}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white w-full py-4 rounded-2xl font-black hover:bg-black transition-all shadow-lg active:scale-95 disabled:bg-gray-300"
              >
                {isPending ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                {isPending ? "Sende..." : "Profil aktualisieren"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function InputGroup({ label, value, onChange, icon: Icon, placeholder }: InputGroupProps) {
  const inputId = `id-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">{label}</label>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />}
        <input 
          id={inputId}
          title={label}
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || label}
          className={`bg-gray-50 border-2 border-gray-100 rounded-2xl py-3.5 ${Icon ? 'pl-12' : 'px-5'} pr-5 text-sm focus:border-blue-400 outline-none transition-all font-bold text-gray-700 w-full`}
        />
      </div>
    </div>
  );
}

function SettingsTab({ icon: Icon, label, active = false }: SettingsTabProps) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all ${active ? "bg-white shadow-md text-blue-600" : "text-gray-500 hover:bg-white/50"}`}>
      <Icon size={18} />
      <span className="text-sm font-bold">{label}</span>
    </div>
  );
}

interface InputGroupProps { label: string; value: string; onChange: (v: string) => void; icon?: LucideIcon; placeholder?: string; }
interface SettingsTabProps { icon: LucideIcon; label: string; active?: boolean; }