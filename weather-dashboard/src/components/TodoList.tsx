"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Plus, Trash2, } from "lucide-react";

interface TodoListProps {
  searchTerm: string;
}

export default function TodoList({ searchTerm }: TodoListProps) {
  const [todos, setTodos] = useState([
    { id: 1, text: "Dashboard Suche implementieren", completed: true },
    { id: 2, text: "Wetter API finalisieren", completed: false },
    { id: 3, text: "Profilbild Pfad korrigieren", completed: true },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos([newTodo, ...todos]);
      setInputValue(""); 
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const deleteTodo = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setTodos(todos.filter(t => t.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-[2.5rem] border-2 border-gray-200/60 p-8 shadow-soft">
      <div className="mb-8">
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Deine Aufgaben</h2>
        <p className="text-xs text-gray-400 font-bold mt-1">{filteredTodos.length} Aufgaben gefunden</p>
      </div>

      <div className="relative mb-6 group">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Neue Aufgabe hinzufügen..." 
          className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-6 pr-14 text-sm font-semibold outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner"
        />
        <button 
          onClick={handleAddTodo}
          title="Aufgabe hinzufügen"
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
            inputValue ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-gray-400"
          }`}
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredTodos.map((todo) => (
          <div 
            key={todo.id} 
            onClick={() => toggleTodo(todo.id)}
            className={`flex items-center justify-between p-5 rounded-[1.5rem] border-2 transition-all cursor-pointer group ${
              todo.completed 
              ? "bg-gray-50 border-transparent opacity-60" 
              : "bg-white border-gray-100 hover:border-blue-200 shadow-sm"
            }`}
          >
            <div className="flex items-center gap-4 text-left">
              {todo.completed ? (
                <CheckCircle2 className="text-emerald-500" size={24} />
              ) : (
                <Circle className="text-gray-300 group-hover:text-blue-400" size={24} />
              )}
              <span className={`font-bold break-all ${todo.completed ? "line-through text-gray-400" : "text-gray-700"}`}>
                {todo.text}
              </span>
            </div>
            <button 
              onClick={(e) => deleteTodo(e, todo.id)}
              className="text-gray-300 hover:text-red-500 transition-colors p-1"
              title="Aufgabe löschen"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}

        {filteredTodos.length === 0 && (
          <div className="py-12 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold italic">
              {searchTerm ? `Keine Aufgaben für "${searchTerm}"` : "Schreib oben deine erste Aufgabe!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}