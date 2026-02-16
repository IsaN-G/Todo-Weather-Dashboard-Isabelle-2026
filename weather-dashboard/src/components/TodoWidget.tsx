"use client";

import { useState } from "react";
import { Plus, MoreVertical, CheckCircle2, Circle } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoWidget() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Projekt-Präsentation vorbereiten", completed: false },
    { id: 2, text: "E-Mails beantworten", completed: true },
    { id: 3, text: "Team-Meeting um 13 Uhr", completed: false },
  ]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
   
    <div className="h-full flex flex-col">
   
      <div className="flex-1 bg-gray-100/60 rounded-[2.5rem] border-2 border-gray-200/60 p-6 shadow-inner flex flex-col">
        
        <div className="flex justify-between items-start mb-6 px-2">
          <div>
            <h3 className="font-bold text-gray-900 text-lg uppercase tracking-tight">To-Do Liste</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              {todos.filter(t => !t.completed).length} Aufgaben verbleibend
            </p>
          </div>
          <button 
            className="text-gray-400 hover:text-gray-600 bg-white/50 p-1 rounded-lg" 
            title="More options"
          >
            <MoreVertical size={18} />
          </button>
        </div>

        
        <div className="relative mb-5">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Neue Aufgabe..."
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-5 pr-14 text-sm shadow-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none"
          />
          <button 
            onClick={addTodo}
            title="Aufgabe hinzufügen"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg"
          >
            <Plus size={20} />
          </button>
        </div>

        
        <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1 custom-scrollbar">
          {todos.map((todo) => (
            <div 
              key={todo.id}
              onClick={() => toggleTodo(todo.id)}
              className={`group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${
                todo.completed 
                  ? "bg-white/40 opacity-50 border border-transparent" 
                  : "bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100"
              }`}
            >
              {todo.completed ? (
                <CheckCircle2 className="text-blue-500 shrink-0" size={20} />
              ) : (
                <Circle className="text-gray-300 group-hover:text-blue-400 shrink-0" size={20} />
              )}
              <span className={`text-sm font-semibold transition-all ${
                todo.completed ? "text-gray-400 line-through" : "text-gray-700"
              }`}>
                {todo.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}