"use client";

import { useState } from "react";
import { ArrowRight, X, Target, Trophy, Star,} from "lucide-react";

export default function Banner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrl = "/images/banner.jpg"; 

  return (
    <>
     
      <div className="relative w-full h-56 rounded-[2.5rem] overflow-hidden border-2 border-gray-200/60 shadow-soft group">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: `url('${imageUrl}')`, backgroundColor: '#333' }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative h-full flex flex-col justify-center px-12 text-white">
          <h2 className="text-3xl font-bold mb-2 tracking-tight">Bleib fokussiert, Isabelle</h2>
          <p className="text-white/80 max-w-md text-sm mb-6 leading-relaxed">
            Du hast bereits 75% deiner Ziele erreicht. Dein Dashboard ist fast fertig!
          </p>
          
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="flex items-center gap-2 bg-white text-black w-fit px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all text-sm group shadow-xl active:scale-95"
          >
            Ziele ansehen
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

    
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
         
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsModalOpen(false)}
          />
          
         
          <div className="relative bg-white w-full max-w-lg rounded-[3rem] border-2 border-gray-100 p-8 shadow-2xl animate-in zoom-in slide-in-from-bottom-4 duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition-colors"
              title="Close modal"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h3 className="text-2xl font-black text-gray-900 mb-2">Deine Meilensteine</h3>
              <p className="text-sm text-gray-500 font-medium">Isabelle, du bist fast am Ziel!</p>
            </div>

            <div className="space-y-4">
              <GoalItem 
                icon={<Star className="text-blue-500" />} 
                title="Dashboard Design" 
                progress={90} 
                color="bg-blue-500" 
              />
              <GoalItem 
                icon={<Target className="text-green-500" />} 
                title="Fitness Ziel (März)" 
                progress={65} 
                color="bg-green-500" 
              />
              <GoalItem 
                icon={<Trophy className="text-purple-500" />} 
                title="Next.js Zertifikat" 
                progress={40} 
                color="bg-purple-500" 
              />
            </div>

            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-8 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg"
            >
              Weiterarbeiten
            </button>
          </div>
        </div>
      )}
    </>
  );
}


function GoalItem({ icon, title, progress, color }: { icon: React.ReactNode, title: string, progress: number, color: string }) {
  return (
    <div className="bg-gray-50 border border-gray-100 p-5 rounded-[2rem] flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-xl shadow-sm">{icon}</div>
          <span className="font-bold text-gray-700">{title}</span>
        </div>
        <span className="text-sm font-black text-gray-900">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
        <div 
          className={`${color} h-full rounded-full transition-all duration-1000 ease-out`} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}