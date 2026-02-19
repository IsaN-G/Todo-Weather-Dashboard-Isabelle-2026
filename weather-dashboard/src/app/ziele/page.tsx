"use client";

import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { 
  Star, Target, Trophy, Droplets, Zap, 
  BookOpen, Wallet, Moon, Inbox, Plus, 
  Trash2, Minus, LucideIcon 
} from "lucide-react";

interface Goal {
  title: string;
  progress: number;
  color: string;
  textColor: string;
  icon: LucideIcon;
}

export default function ZielePage() {
  const [goals, setGoals] = useState<Goal[]>([
    { title: "Dashboard fertigstellen", progress: 90, color: "bg-blue-500", textColor: "text-blue-500", icon: Star },
    { title: "Laufen gehen (3x/Woche)", progress: 60, color: "bg-green-500", textColor: "text-green-500", icon: Target },
    { title: "Neues Framework lernen", progress: 30, color: "bg-purple-500", textColor: "text-purple-500", icon: Trophy },
    { title: "2 Liter Wasser täglich", progress: 100, color: "bg-cyan-400", textColor: "text-cyan-400", icon: Droplets },
    { title: "Morgendliche Fokus-Zeit", progress: 45, color: "bg-amber-500", textColor: "text-amber-500", icon: Zap },
    { title: "Buch lesen (15 Min/Tag)", progress: 20, color: "bg-rose-500", textColor: "text-rose-500", icon: BookOpen },
    { title: "Wöchentlicher Budget-Check", progress: 75, color: "bg-emerald-500", textColor: "text-emerald-500", icon: Wallet },
    { title: "Schlaf-Rhythmus optimieren", progress: 55, color: "bg-indigo-400", textColor: "text-indigo-400", icon: Moon },
    { title: "Inbox Zero (Mails klären)", progress: 15, color: "bg-orange-400", textColor: "text-orange-400", icon: Inbox },
  ]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempTitle, setTempTitle] = useState("");

  const adjustProgress = (index: number, amount: number) => {
    setGoals(prev => prev.map((g, i) => i === index ? { ...g, progress: Math.max(0, Math.min(100, g.progress + amount)) } : g));
  };

  const deleteGoal = (index: number) => {
    setGoals(prev => prev.filter((_, i) => i !== index));
  };

  const addNewGoal = () => {
    const newGoal: Goal = { 
      title: "Neues Ziel", progress: 0, color: "bg-slate-800", textColor: "text-slate-800", icon: Target 
    };
    setGoals([newGoal, ...goals]);
  };

  const saveTitle = (index: number) => {
    if (tempTitle.trim() !== "") {
      setGoals(prev => prev.map((g, i) => i === index ? { ...g, title: tempTitle } : g));
    }
    setEditingIndex(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') saveTitle(index);
  };

  return (
    <div className="p-8 bg-[#FAFBFD] min-h-screen">
      <div className="max-w-8xl mx-auto flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Fokus & Ziele</h1>
          <p className="text-[13px] text-slate-400 font-bold uppercase tracking-widest mt-1">Status Quo</p>
        </div>
        <button 
          onClick={addNewGoal}
          title="Neues Ziel hinzufügen"
          aria-label="Neues Ziel hinzufügen"
          className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-black hover:text-white transition-all shadow-sm"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal, index) => {
          const IconComponent = goal.icon;

          return (
            <div key={index} className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300">
              
              <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-black">
                  <IconComponent size={22} strokeWidth={2} />
                </div>
                <button 
                  onClick={() => deleteGoal(index)} 
                  title="Ziel löschen"
                  aria-label="Ziel löschen"
                  className="p-2 text-slate-200 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="mb-6 h-14 flex items-center">
                {editingIndex === index ? (
                  <div className="flex items-center gap-2 w-full">
                    <input 
                      autoFocus
                      title="Ziel-Titel bearbeiten"
                      placeholder="Name des Ziels..."
                      className="text-3xl font-bold text-slate-900 border-b border-blue-500 outline-none w-full bg-transparent"
                      value={tempTitle}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setTempTitle(e.target.value)}
                      onBlur={() => saveTitle(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  </div>
                ) : (
                  <h3 
                    onClick={() => { setEditingIndex(index); setTempTitle(goal.title); }}
                    className="text-xl font-bold text-slate-800 leading-snug cursor-pointer hover:text-blue-600 transition-colors line-clamp-2"
                  >
                    {goal.title}
                  </h3>
                )}
              </div>

              <div className="pt-4 border-t border-slate-50">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[11px] font-black text-slate-800 uppercase tracking-[0.15em]">Progress</span>
                  <span className="text-xs font-bold text-slate-900">{goal.progress}%</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => adjustProgress(index, -5)}
                    title="Fortschritt verringern"
                    aria-label="Fortschritt verringern"
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all active:scale-90"
                  >
                    <Minus size={14} />
                  </button>

                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden p-[1px]">
                    <div 
                      className={`${goal.color} h-full rounded-full transition-all duration-500 ease-out`} 
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>

                  <button 
                    type="button"
                    onClick={() => adjustProgress(index, 5)}
                    title="Fortschritt erhöhen"
                    aria-label="Fortschritt erhöhen"
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all active:scale-90"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}