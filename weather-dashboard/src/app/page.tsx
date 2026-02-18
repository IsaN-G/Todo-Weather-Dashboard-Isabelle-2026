"use client";

import { useState, useEffect } from "react";
import TopHeader from "@/components/TopHeader";
import DailySummary from "@/components/DailySummary";
import TodoList from "@/components/TodoList";
import WeatherWidget from "@/components/WeatherWidget";
import StatCards from "@/components/StatCards";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const [userName, setUserName] = useState("Gast");

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
   
      const timeoutId = setTimeout(() => {
        setUserName(savedName);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  return (
    <main className="p-8 bg-[#F4F7F6] min-h-screen">
      <TopHeader name={userName} onSearch={setSearchQuery} />
      <StatCards />
      <div className="grid grid-cols-12 gap-8 mt-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div id="aufgaben-liste">
            <TodoList searchTerm={searchQuery} />
          </div>
          <DailySummary />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <WeatherWidget />
        </div>
      </div>
    </main>
  );
}