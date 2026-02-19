"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Plus, Trash2 } from "lucide-react";
import { addTodoAction, deleteTodoAction, toggleTodoAction } from "@/actions/todoActions";


interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  searchTerm: string;
  initialTodos: Todo[];
}

export default function TodoList({ searchTerm, initialTodos = [] }: TodoListProps) {
  const [inputValue, setInputValue] = useState("");

  
  const todosToFilter = initialTodos || [];

  const filteredTodos = todosToFilter.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-[2.5rem] border-2 border-gray-200/60 p-8 shadow-soft">
      <div className="mb-8">
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight text-left">Deine Aufgaben</h2>
        <p className="text-xs text-gray-400 font-bold mt-1 text-left">
          {filteredTodos.length} Aufgaben gefunden
        </p>
      </div>

   
      <form 
        action={async (formData) => {
          setInputValue(""); 
          await addTodoAction(formData); 
        }}
        className="relative mb-6 group"
      >
        <input 
          name="todoText"
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Neue Aufgabe hinzufügen..." 
          className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-6 pr-14 text-sm font-semibold outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner"
        />
        
        <button 
          type="submit"
          title="Aufgabe hinzufügen"
          aria-label="Aufgabe hinzufügen"
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
            inputValue ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-gray-400"
          }`}
        >
          <Plus size={20} />
        </button>
      </form>

     
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredTodos.map((todo) => (
          <div 
            key={todo._id} 
            className={`flex items-center justify-between p-5 rounded-[1.5rem] border-2 transition-all group ${
              todo.completed 
              ? "bg-gray-100 border-transparent opacity-60" 
              : "bg-gray-100 border-gray-200 hover:border-blue-200 shadow-sm"
            }`}
          >
         
      <div 
          role="button"
          tabIndex={0}
          onClick={() => toggleTodoAction(`${todo._id}`, todo.completed)}
          onKeyDown={(e) => e.key === 'Enter' && toggleTodoAction(`${todo._id}`, todo.completed)}
          className="flex items-center gap-4 text-left flex-1 cursor-pointer group outline-none"
      >
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
              onClick={() => deleteTodoAction(todo._id)}
              className="text-gray-300 hover:text-red-500 transition-colors p-1"
              title="Aufgabe löschen"
              aria-label="Aufgabe löschen"
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