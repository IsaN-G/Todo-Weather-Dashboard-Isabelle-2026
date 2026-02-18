"use client";

import { useState } from "react";
import { Plus, CheckCircle2, Circle, Trash2 } from "lucide-react";
import { addTodoAction, toggleTodoAction, deleteTodoAction } from "@/actions/todoActions";

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

export default function TodoWidget({ initialTodos }: { initialTodos: Todo[] }) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = async () => {
    if (!inputValue.trim()) return;
    const formData = new FormData();
    formData.append("todoText", inputValue);
    await addTodoAction(formData);
    setInputValue("");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-gray-100/60 rounded-[2.5rem] border-2 border-gray-200/60 p-6 shadow-inner flex flex-col">
        
        <div className="flex justify-between items-start mb-6 px-2">
          <div>
            <h3 className="font-bold text-gray-900 text-lg uppercase tracking-tight">To-Do Liste</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              {initialTodos.filter(t => !t.completed).length} Aufgaben verbleibend
            </p>
          </div>
        </div>

        <div className="relative mb-5">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Neue Aufgabe..."
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-5 pr-14 text-sm shadow-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none"
          />
       
          <button 
            onClick={handleAdd}
            title="Aufgabe hinzufügen"
            aria-label="Aufgabe hinzufügen"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto max-h-[500px] pr-1 custom-scrollbar">
          {initialTodos.map((todo) => (
            <div 
              key={todo._id}
              className={`group flex items-center justify-between p-4 rounded-2xl transition-all ${
                todo.completed 
                  ? "bg-white/40 opacity-50 border border-transparent" 
                  : "bg-white border border-gray-100 shadow-sm hover:shadow-md"
              }`}
            >
              <div 
                className="flex items-center gap-4 cursor-pointer flex-1"
                onClick={() => toggleTodoAction(todo._id, todo.completed)}
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
              
       
              <button 
                onClick={() => deleteTodoAction(todo._id)}
                title="Aufgabe löschen"
                aria-label="Aufgabe löschen"
                className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-2"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}