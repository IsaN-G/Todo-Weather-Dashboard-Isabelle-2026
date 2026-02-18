import TodoList from "@/components/TodoList";
import TopHeader from "@/components/TopHeader";
import StatCards from "@/components/StatCards";
import WeatherWidget from "@/components/WeatherWidget";
import DailySummary from "@/components/DailySummary";
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<{ search?: string }>;
};

export default async function DashboardPage({ searchParams }: PageProps) {
  const sParams = await searchParams;
  const searchQuery = sParams.search || "";
  
  const cookieStore = await cookies();
  const userName = cookieStore.get("userName")?.value || "Gast";

  const client = await clientPromise;
  const db = client.db("dashboard_db");
  const rawTodos = await db.collection("todos")
    .find({ userId: userName }) 
    .sort({ createdAt: -1 })
    .toArray();

  const todos = rawTodos.map((todo) => ({
    _id: todo._id.toString(),
    text: todo.text || "",
    completed: !!todo.completed,
  }));

  
  const openTodosCount = todos.filter(t => !t.completed).length;

  async function handleSearch(query: string) {
    "use server";
    redirect(`/?search=${encodeURIComponent(query)}`);
  }

  return (
    <main className="p-8 bg-[#F4F7F6] min-h-screen">
      <TopHeader 
        name={userName} 
        onSearch={handleSearch} 
        notificationCount={openTodosCount} 
      />
      
      <StatCards todos={todos} />

      <div className="grid grid-cols-12 gap-8 mt-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div id="aufgaben-liste">
            <TodoList searchTerm={searchQuery} initialTodos={todos} />
          </div>
          <DailySummary userName={userName} />
        </div>
        
        <div className="col-span-12 lg:col-span-4">
          <WeatherWidget />
        </div>
      </div>
    </main>
  );
}