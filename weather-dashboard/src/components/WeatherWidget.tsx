"use client";

import { useState, useEffect } from "react";
import { Search, CloudSun, AlertTriangle, Droplets, Loader2, Sun, CloudRain, CloudSnow, Cloud, Navigation } from "lucide-react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

export default function WeatherWidget() {
  const [city, setCity] = useState("Berlin");
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
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
      
    }
  };
  useEffect(() => {
    const savedCity = localStorage.getItem("lastWeatherCity");
    if (savedCity) setCity(savedCity);
  }, []);

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=de&appid=${API_KEY}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Stadt nicht gefunden");
      setWeatherData(data as WeatherData);
      localStorage.setItem("lastWeatherCity", cityName);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler");
    } finally {
      setLoading(false);
    }
  };

  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      setCity(search);
      setSearch("");
    }
  };

  const getWeatherIcon = (main: string) => {
    switch (main) {
      case "Clear": return <Sun size={60} strokeWidth={1.5} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />;
      case "Rain": return <CloudRain size={60} strokeWidth={1.5} className="text-blue-300" />;
      case "Snow": return <CloudSnow size={60} strokeWidth={1.5} className="text-blue-100" />;
      case "Clouds": return <Cloud size={60} strokeWidth={1.5} className="text-gray-200" />;
      default: return <CloudSun size={60} strokeWidth={1.5} className="text-blue-200" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="relative flex-1 rounded-[2.5rem] overflow-hidden border-2 border-white/10 shadow-2xl flex flex-col justify-between min-h-[450px] group">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-105"
          style={{ backgroundImage: `url('${getBackgroundImage(weatherData?.weather[0].main || "")}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 p-6 flex flex-col h-full justify-between">
          <div className="flex justify-between items-center mb-6 px-2">
            <h3 className="font-bold text-white text-lg uppercase tracking-widest drop-shadow-md">Wetter</h3>
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" size={14} />
              <input 
                type="text" 
                placeholder="Stadt..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-2 px-8 text-xs text-white outline-none w-24 focus:w-36 transition-all placeholder:text-white/50"
              />
            </form>
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="animate-spin text-white" size={40} />
            </div>
          ) : error ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              <AlertTriangle className="text-red-400 mb-2" size={32} />
              <p className="text-xs text-white font-bold uppercase">{error}</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center py-4 text-white">
                <div className="mb-4 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
                  {getWeatherIcon(weatherData?.weather[0].main || "")}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Navigation size={12} className="text-blue-400 rotate-45" />
                  <span className="text-sm font-black uppercase tracking-[0.3em]">{weatherData?.name}</span>
                </div>
                <h2 className="text-8xl font-black leading-none drop-shadow-2xl">{Math.round(weatherData?.main?.temp ?? 0)}°</h2>
                <p className="text-white/90 text-[10px] font-black uppercase tracking-[0.3em] mt-4 bg-black/40 backdrop-blur-md px-6 py-1.5 rounded-full border border-white/10 italic">
                  {weatherData?.weather[0].description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-[1.8rem] p-4 flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-xl text-blue-300"><Droplets size={20} /></div>
                  <div>
                    <p className="text-[9px] uppercase font-black text-white/50 mb-1 tracking-tighter">Feuchte</p>
                    <p className="text-sm font-bold text-white">{weatherData?.main?.humidity}%</p>
                  </div>
                </div>
                <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-[1.8rem] p-4 flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-xl text-white"><Navigation size={20} className="rotate-180" /></div>
                  <div>
                    <p className="text-[9px] uppercase font-black text-white/50 mb-1 tracking-tighter">Wind</p>
                    <p className="text-sm font-bold text-white">{Math.round((weatherData?.wind?.speed ?? 0) * 3.6)} <span className="text-[10px]">km/h</span></p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}