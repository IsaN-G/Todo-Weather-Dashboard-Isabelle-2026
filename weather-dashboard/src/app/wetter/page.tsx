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


interface ForecastDay {
  dt_txt: string;
  main: { temp: number };
  weather: { description: string; main: string }[];
}

export default function WetterPage() {
  const [city, setCity] = useState("Berlin");
  const [search, setSearch] = useState("");
  interface WeatherData {
    name: string;
    main: { temp: number; humidity: number };
    weather: { description: string; main: string }[];
    wind: { speed: number };
  }

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const savedCity = localStorage.getItem("lastWeatherCity") || "Berlin";
    setCity(savedCity);
    fetchFullWeather(savedCity);
  }, []);

  const fetchFullWeather = async (cityName: string) => {
    setLoading(true);
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    
    try {
      
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=de&appid=${API_KEY}`
      );
      const currentData = await currentRes.json();

     
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&lang=de&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();

      if (currentRes.ok && forecastRes.ok) {
        setWeatherData(currentData);
      
        const dailyForecast = forecastData.list.filter((_: ForecastDay, index: number) => index % 8 === 0);
        setForecast(dailyForecast);
        localStorage.setItem("lastWeatherCity", cityName);
      }
    } catch (err) {
      console.error("Fehler beim Laden", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      fetchFullWeather(search);
      setCity(search);
      setSearch("");
    }
  };

  const getWeatherIcon = (main: string, size = 120) => {
    const props = { size, strokeWidth: 1.5, className: "drop-shadow-lg" };
    switch (main) {
      case "Clear": return <Sun {...props} className="text-orange-400" />;
      case "Rain": return <CloudRain {...props} className="text-blue-400" />;
      case "Snow": return <CloudSnow {...props} className="text-blue-200" />;
      case "Clouds": return <Cloud {...props} className="text-gray-400" />;
      default: return <CloudSun {...props} className="text-blue-500" />;
    }
  };

  return (
    <div className="p-8 bg-[#F4F7F6] min-h-screen">
      
      <div className="flex justify-between items-center mb-10">
        <div>
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors mb-2">
            <ArrowLeft size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Zurück Dashboard</span>
          </Link>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Wetter Hub</h1>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Stadt suchen..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white border-2 border-gray-200/60 rounded-3xl py-4 pl-12 pr-6 outline-none w-64 focus:w-80 transition-all shadow-sm focus:ring-4 focus:ring-blue-100 font-medium"
          />
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border-2 border-gray-200/60 p-10 shadow-soft relative overflow-hidden">
          {loading ? (
             <div className="h-64 flex items-center justify-center">Lade Wetterdaten...</div>
          ) : weatherData && (
            <div className="flex flex-col md:flex-row justify-between items-center h-full">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="text-blue-500" size={20} />
                  <span className="text-xl font-bold text-gray-400 uppercase tracking-widest">{weatherData.name}</span>
                </div>
                <h2 className="text-9xl font-black text-gray-900 mb-4">{Math.round(weatherData.main.temp)}°</h2>
                <p className="text-2xl font-bold text-gray-500 capitalize">{weatherData.weather[0].description}</p>
                
                <div className="flex gap-6 mt-10">
                  <div className="flex items-center gap-2">
                    <Droplets className="text-blue-500" size={24} />
                    <span className="font-bold">{weatherData.main.humidity}% <span className="text-gray-400 text-xs block uppercase">Feuchte</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="text-blue-500" size={24} />
                    <span className="font-bold">{Math.round(weatherData.wind.speed * 3.6)} km/h <span className="text-gray-400 text-xs block uppercase">Wind</span></span>
                  </div>
                </div>
              </div>
              <div className="mt-10 md:mt-0">
                {getWeatherIcon(weatherData.weather[0].main, 200)}
              </div>
            </div>
          )}
        </div>

       
        <div className="bg-gray-100/60 rounded-[2.5rem] border-2 border-gray-200/60 p-8 shadow-inner">
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="text-gray-400" size={20} />
            <h3 className="font-bold text-gray-900 uppercase tracking-tight">5-Tage Vorschau</h3>
          </div>
          
          <div className="space-y-4">
            {forecast.map((day, idx) => (
              <div key={idx} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                <span className="font-bold text-gray-500 text-sm">
                  {new Date(day.dt_txt).toLocaleDateString('de-DE', { weekday: 'short' })}
                </span>
                <div className="flex items-center gap-2">
                   {getWeatherIcon(day.weather[0].main, 32)}
                   <span className="text-xs font-bold text-gray-400">{day.weather[0].description}</span>
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