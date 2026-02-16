import { TrendingUp, Target, Users, Calendar } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}

function StatCard({ label, value, icon: Icon, iconColor, bgColor }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-4xl shadow-soft flex items-center gap-4 border border-white/50">
      <div className={`p-3 rounded-2xl ${bgColor}`}>
        <Icon size={24} className={iconColor} />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        label="Leistung" 
        value="+ 12%" 
        icon={TrendingUp} 
        iconColor="text-green-600" 
        bgColor="bg-green-100" 
      />
      <StatCard 
        label="Vorhaben" 
        value="4 Aktiv" 
        icon={Target} 
        iconColor="text-blue-600" 
        bgColor="bg-blue-100" 
      />
      <StatCard 
        label="Kontakte" 
        value="25" 
        icon={Users} 
        iconColor="text-orange-600" 
        bgColor="bg-orange-100" 
      />
      <StatCard 
        label="Termine" 
        value="2 Heute" 
        icon={Calendar} 
        iconColor="text-purple-600" 
        bgColor="bg-purple-100" 
      />
    </div>
  );
}