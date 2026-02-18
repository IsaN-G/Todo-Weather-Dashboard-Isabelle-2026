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

  useEffect(() => {
    const savedCity = localStorage.getItem("lastWeatherCity");
    if (savedCity) {
      setCity(savedCity);
    }
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
      localStorage.setItem("lastTemp", Math.round(data.main.temp).toString()); 
localStorage.setItem("lastWeatherCondition", data.weather[0].description);
    } catch (err) {
      
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ein unbekannter Fehler ist aufgetreten");
      }
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
      case "Clear": return <Sun size={80} strokeWidth={1.5} className="text-orange-400" />;
      case "Rain": return <CloudRain size={80} strokeWidth={1.5} className="text-blue-400" />;
      case "Snow": return <CloudSnow size={80} strokeWidth={1.5} className="text-blue-200" />;
      case "Clouds": return <Cloud size={80} strokeWidth={1.5} className="text-gray-400" />;
      default: return <CloudSun size={80} strokeWidth={1.5} className="text-blue-500" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-gray-100/60 rounded-[2.5rem] border-2 border-gray-200/60 p-6 shadow-inner flex flex-col justify-between min-h-[450px]">
        
        <div className="flex justify-between items-center mb-6 px-2">
          <h3 className="font-bold text-gray-900 text-lg uppercase tracking-tight">Wetter</h3>
          <form onSubmit={handleSearch} className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input 
              type="text" 
              placeholder="Stadt suchen..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border border-gray-200 rounded-full py-2.5 pl-9 pr-4 text-xs outline-none w-32 focus:w-48 transition-all shadow-sm focus:ring-2 focus:ring-blue-100"
            />
          </form>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="animate-spin text-blue-500" size={40} />
          </div>
        ) : error ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <AlertTriangle className="text-red-500 mb-2" size={32} />
            <p className="text-xs text-gray-600 font-bold uppercase">{error}</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="mb-4 drop-shadow-xl animate-in fade-in zoom-in duration-700">
                {getWeatherIcon(weatherData?.weather[0].main || "")}
              </div>
              
              <div className="flex items-center gap-2 mb-1">
                <Navigation size={12} className="text-blue-500 rotate-45" />
                <span className="text-sm font-black text-gray-500 uppercase tracking-widest">
                  {weatherData?.name}
                </span>
              </div>
              
              <h2 className="text-7xl font-black text-gray-900 leading-none">
                {Math.round(weatherData?.main?.temp ?? 0)}°
              </h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-3 bg-white/50 px-4 py-1 rounded-full">
                {weatherData?.weather[0].description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-white border border-gray-100 rounded-[1.5rem] p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-all">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-500"><Droplets size={20} /></div>
                <div>
                  <p className="text-[10px] uppercase font-black text-gray-400 leading-none mb-1">Feuchte</p>
                  <p className="text-sm font-bold text-gray-800">{weatherData?.main?.humidity}%</p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-[1.5rem] p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-all">
                <div className="p-2.5 bg-orange-50 rounded-xl text-orange-500"><Navigation size={20} className="rotate-180" /></div>
                <div>
                  <p className="text-[10px] uppercase font-black text-gray-400 leading-none mb-1">Wind</p>
                  <p className="text-sm font-bold text-gray-800">{Math.round((weatherData?.wind?.speed ?? 0) * 3.6)} <span className="text-[10px]">km/h</span></p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}