"use client";

import { useState, useEffect } from "react";
import { Target, Trophy, Star, ArrowLeft, Plus, X, Send } from "lucide-react";
import Link from "next/link";

export default function ZielePage() {
  const [goals, setGoals] = useState([
    { title: "Dashboard fertigstellen", progress: 90, color: "bg-blue-500", icon: Star },
    { title: "Laufen gehen (3x/Woche)", progress: 60, color: "bg-green-500", icon: Target },
    { title: "Neues Framework lernen", progress: 30, color: "bg-purple-500", icon: Trophy },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");

 
  const saveGoal = () => {
    if (newGoalTitle.trim() !== "") {
      const newGoal = {
        title: newGoalTitle,
        progress: 0,
        color: "bg-orange-500",
        icon: Target,
      };
      setGoals([newGoal, ...goals]);
      setNewGoalTitle("");
      setIsAdding(false); 
    }
  };

  const deleteGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8 bg-[#F4F7F6] min-h-screen">
      <div className="flex justify-between items-end mb-10">
        <div>
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-all mb-2 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Zurück</span>
          </Link>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Deine Ziele 2026</h1>
        </div>
        
      
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`${isAdding ? 'bg-red-500' : 'bg-gray-900'} text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-95`}
        >
          {isAdding ? <X size={20} /> : <Plus size={20} />}
          {isAdding ? "Abbrechen" : "Neues Ziel"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       
        {isAdding && (
          <div className="bg-blue-50 rounded-[2.5rem] border-2 border-dashed border-blue-200 p-8 flex flex-col justify-center animate-in zoom-in-95 duration-200">
            <label className="text-[10px] font-black uppercase text-blue-400 tracking-widest mb-4">Neues Ziel definieren</label>
            <input 
              autoFocus
              type="text" 
              value={newGoalTitle}
              onChange={(e) => setNewGoalTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveGoal()}
              placeholder="Was hast du vor?"
              className="bg-white border-2 border-blue-100 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:border-blue-500 transition-all shadow-sm"
            />
            <button 
              onClick={saveGoal}
              className="mt-4 bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              <Send size={18} /> Ziel anlegen
            </button>
          </div>
        )}

      
        {goals.map((goal, idx) => (
          <div key={idx} className="relative bg-white rounded-[2.5rem] border-2 border-gray-200/60 p-8 shadow-soft hover:shadow-xl transition-all group">
            <button 
              onClick={() => deleteGoal(idx)}
              className="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition-colors"
              title="Ziel löschen"
            >
              <X size={18} />
            </button>

            <div className={`w-14 h-14 ${goal.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform`}>
              <goal.icon size={28} />
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2">{goal.title}</h3>
            
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Fortschritt</span>
              <span className="text-lg font-black text-gray-900">{goal.progress}%</span>
            </div>
            
            <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden border border-gray-50">
              <div 
                className={`${goal.color} h-full rounded-full transition-all duration-1000`} 
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}