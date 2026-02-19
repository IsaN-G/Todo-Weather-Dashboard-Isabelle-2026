import { TrendingUp, Target, CheckCircle2, Calendar, LucideIcon } from "lucide-react";


interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}

function StatCard({ label, value, icon: Icon, iconColor, bgColor }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm flex items-center gap-4 border border-gray-300 transition-all hover:shadow-md">
      <div className={`p-3 rounded-2xl ${bgColor}`}>
        <Icon size={24} className={iconColor} />
      </div>
      <div className="text-left">
        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-black text-gray-900 leading-none mt-1">{value}</p>
      </div>
    </div>
  );
}


export default function StatCards({ todos = [] }: { todos: Todo[] }) {
  const totalTasks = todos.length;
  const completedTasks = todos.filter(t => t.completed).length;
  const openTasks = totalTasks - completedTasks;
  const successRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  ">
      <StatCard 
        label="Erfolgsquote" 
        value={`${successRate}%`} 
        icon={TrendingUp} 
        iconColor="text-green-600" 
        bgColor="bg-green-200" 
      />
      <StatCard 
        label="Offen" 
        value={`${openTasks}`} 
        icon={Target} 
        iconColor="text-blue-600" 
        bgColor="bg-blue-200" 
      />
      <StatCard 
        label="Erledigt" 
        value={`${completedTasks}`} 
        icon={CheckCircle2} 
        iconColor="text-orange-600" 
        bgColor="bg-orange-200" 
      />
      <StatCard 
        label="Gesamt" 
        value={`${totalTasks}`} 
        icon={Calendar} 
        iconColor="text-purple-600" 
        bgColor="bg-purple-200" 
      />
    </div>
  );
}