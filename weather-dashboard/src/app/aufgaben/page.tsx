import TodoWidget from "@/components/TodoWidget";
import { LayoutDashboard, Filter, ArrowLeft } from "lucide-react";
import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";

export default async function AufgabenPage() {
 
  const cookieStore = await cookies();
  const userName = cookieStore.get("userName")?.value || "Gast";

  const client = await clientPromise;
  const db = client.db("dashboard_db");
  const rawTodos = await db.collection("todos")
    .find({ userId: userName }) 
    .sort({ createdAt: -1 })
    .toArray();

  const todos = rawTodos.map(todo => ({
    _id: todo._id.toString(), 
    text: todo.text,
    completed: todo.completed,
  }));

 
  const openCount = todos.filter(t => !t.completed).length;

  return (
    <div className="p-8 bg-[#F4F7F6] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <Link href="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
              <ArrowLeft size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Zurück</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Deine Aufgaben</h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
            Angemeldet als {userName}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
        
          <TodoWidget initialTodos={todos} />
        </div>

        <div className="space-y-6">
          <div className="bg-gray-100/60 rounded-[2.5rem] border-2 border-gray-200/60 p-6 shadow-inner">
            <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-tight">Status</h3>
            <div className="space-y-3">
              <CategoryItem label="Offene Aufgaben" count={openCount} color="bg-blue-500" />
              <CategoryItem label="Erledigt" count={todos.length - openCount} color="bg-green-500" />
            </div>
          </div>

          <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-lg relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Produktivität</h3>
              <p className="text-blue-100 text-sm mb-4">Du hast insgesamt {todos.length - openCount} Aufgaben erledigt.</p>
              <div className="w-full bg-blue-400/30 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-white h-full rounded-full transition-all duration-500" 
                  style={{ width: `${todos.length > 0 ? ((todos.length - openCount) / todos.length) * 100 : 0}%` }}
                />
              </div>
            </div>
            <LayoutDashboard className="absolute -right-4 -bottom-4 text-blue-500/20 w-32 h-32 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryItem({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-sm font-bold text-gray-700">{label}</span>
      </div>
      <span className="text-xs font-black text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">{count}</span>
    </div>
  );
}