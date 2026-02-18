"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Wind, 
  Droplets, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Cloud, 
  CloudSun, 
  ArrowLeft, 
  MapPin,
  Calendar
} from "lucide-react";
import Link from "next/link";

interface WeatherData {
  name: string;
  main: { temp: number; humidity: number };
  weather: { description: string; main: string }[];
  wind: { speed: number };
}

interface ForecastDay {
  dt_txt: string;
  main: { temp: number };
  weather: { description: string; main: string }[];
}

export default function WetterPage() {
  const [city, setCity] = useState("Berlin");
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  
  const getBackgroundImage = (main: string, temp: number = 0) => {
    switch (main) {
      case "Clear": 
        if (temp >= 28) return "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"; 
        return "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?auto=format&fit=crop&w=1200&q=80"; 
      case "Thunderstorm":return "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1200&q=80";
      case "Rain": return "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1200&q=80";
      case "Snow": return "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?auto=format&fit=crop&w=1200&q=80";
      case "Clouds": return "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80";
      default: return "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80";
    }
  };


  useEffect(() => {
    const savedCity = localStorage.getItem("lastWeatherCity") || "Berlin";
    fetchFullWeather(savedCity);
  }, []);

  const fetchFullWeather = async (cityName: string) => {
    setLoading(true);
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    try {
      const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=de&appid=${API_KEY}`);
      const currentData = await currentRes.json();
      
      const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&lang=de&appid=${API_KEY}`);
      const forecastData = await forecastRes.json();

      if (currentRes.ok && forecastRes.ok) {
        setWeatherData(currentData);
        setCity(currentData.name); 
        
      
        const dailyForecast = forecastData.list.filter((_: ForecastDay, index: number) => index % 8 === 0);
        setForecast(dailyForecast);
        localStorage.setItem("lastWeatherCity", cityName);
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      fetchFullWeather(search);
      setSearch("");
    }
  };

  const getWeatherIcon = (main: string, size = 120, colorClass = "") => {
    const props = { size, strokeWidth: 1.5, className: `drop-shadow-lg ${colorClass}` };
    switch (main) {
      case "Clear": return <Sun {...props} className={colorClass || "text-orange-400"} />;
      case "Rain": return <CloudRain {...props} className={colorClass || "text-blue-400"} />;
      case "Snow": return <CloudSnow {...props} className={colorClass || "text-blue-200"} />;
      case "Clouds": return <Cloud {...props} className={colorClass || "text-gray-400"} />;
      default: return <CloudSun {...props} className={colorClass || "text-blue-500"} />;
    }
  };

  return (
    <div className="p-8 bg-[#F4F7F6] min-h-screen">
    
      <div className="flex justify-between items-center mb-10">
        <div>
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors mb-2">
            <ArrowLeft size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Dashboard</span>
          </Link>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Wetter Hub <span className="text-blue-500/30 ml-2">| {city}</span>
          </h1>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Stadt..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white border-2 border-gray-200 rounded-3xl py-4 pl-12 pr-6 outline-none w-64 focus:w-80 transition-all font-medium"
          />
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
        <div className="lg:col-span-2 relative rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[500px] border-2 border-white">
          {loading ? (
             <div className="absolute inset-0 flex items-center justify-center bg-white font-bold">Lade Wetter...</div>
          ) : weatherData && (
            <>
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{ backgroundImage: `url('${getBackgroundImage(weatherData.weather[0].main, weatherData.main.temp)}')` }}
              >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
              </div>

              <div className="relative z-10 p-10 flex flex-col justify-between h-full text-white">
                <div>
                  <div className="flex items-center gap-2 mb-4 bg-black/30 backdrop-blur-md w-fit px-4 py-2 rounded-2xl border border-white/10">
                    <MapPin className="text-blue-400" size={20} />
                    <span className="text-xl font-black uppercase tracking-widest">{weatherData.name}</span>
                  </div>
                  <h2 className="text-[10rem] font-black leading-none drop-shadow-2xl">{Math.round(weatherData.main.temp)}°</h2>
                  <p className="text-3xl font-bold capitalize drop-shadow-md ml-2">{weatherData.weather[0].description}</p>
                </div>
                
                <div className="flex gap-6 mt-10">
                  <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10 flex items-center gap-4">
                    <Droplets className="text-blue-300" size={32} />
                    <div>
                      <span className="text-2xl font-black block">{weatherData.main.humidity}%</span>
                      <span className="text-white/50 text-xs uppercase font-bold tracking-widest">Feuchte</span>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10 flex items-center gap-4">
                    <Wind className="text-blue-300" size={32} />
                    <div>
                      <span className="text-2xl font-black block">{Math.round(weatherData.wind.speed * 3.6)} km/h</span>
                      <span className="text-white/50 text-xs uppercase font-bold tracking-widest">Wind</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-white rounded-[2.5rem] border-2 border-gray-100 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="text-blue-500" size={20} />
            <h3 className="font-bold text-gray-900 uppercase tracking-tight">Vorschau</h3>
          </div>
          
          <div className="space-y-3">
            {forecast.map((day, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                <span className="font-bold text-gray-400 group-hover:text-blue-500">
                  {new Date(day.dt_txt).toLocaleDateString('de-DE', { weekday: 'short' })}
                </span>
                <div className="flex flex-col items-center">
                   {getWeatherIcon(day.weather[0].main, 32)}
                </div>
                <span className="font-black text-gray-900">{Math.round(day.main.temp)}°</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}