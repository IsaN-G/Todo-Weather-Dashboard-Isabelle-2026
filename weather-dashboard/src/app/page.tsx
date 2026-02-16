"use client";

import { useState } from "react";
import TopHeader from "@/components/TopHeader";
import Banner from "@/components/Banner";
import TodoList from "@/components/TodoList";
import WeatherWidget from "@/components/WeatherWidget";
import StatCards from "@/components/StatCards";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="p-8 bg-[#F4F7F6] min-h-screen">
    
      <TopHeader name="Isabelle" onSearch={setSearchQuery} />
      
    
      <StatCards />

      <div className="grid grid-cols-12 gap-8 mt-8">
    
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          <TodoList searchTerm={searchQuery} />

          <Banner />
          
        </div>
        
      
        <div className="col-span-12 lg:col-span-4">
          <WeatherWidget />
        </div>
      </div>
    </main>
  );
}