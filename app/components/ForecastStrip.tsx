"use client";
import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../lib/WeatherProvider";

const forecastDays = [
  { day: "Today", icon: "☀️", condition: "Clear", low: 9, high: 13 },
  { day: "Mon", icon: "🌤️", condition: "Partly Cloudy", low: 8, high: 12 },
  { day: "Tue", icon: "🌥️", condition: "Cloudy", low: 7, high: 10 },
  { day: "Wed", icon: "🌦️", condition: "Light Rain", low: 6, high: 9 },
  { day: "Thu", icon: "⛅", condition: "Partly Cloudy", low: 8, high: 11 },
];

export default function ForecastStrip() {
  const { city, coords } = useContext(WeatherContext);
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const controller = new AbortController();

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);

      try {
        if (!city) return;
        if (!coords) return;
        const { lat, lon } = coords;
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`,
        );
        if (!forecastRes.ok) throw new Error("Forecast not found!");
        const forecastData = await forecastRes.json();
        if (!forecastData || forecastData.length === 0) {
          throw new Error("Data fetch is unsuccessful.");
        }
        setForecast(forecastData);
      } catch (error) {
        console.error("Something went wrong:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
    return () => controller.abort();
  }, [city, coords]);

  useEffect(() => {
    const getCurrentForecastData = () => {
      if (!forecast) return;

      const groupedForecastList: any = Object.values(
        forecast.list.reduce((acc: any, item: any) => {
          const key = item.dt_txt.slice(0, 10);
          acc[key] = [...(acc[key] || []), item];
          return acc;
        }, {}),
      ).slice(0, 5);

      const date = new Date().getTime() / 1000;
      const closestForecastTime = groupedForecastList.map((item: any) => {
        const getClosestTimeForEachItem = item.reduce(
          (closest: any, current: any) => {
            const currentDt = Math.abs(date - current.dt);
            const closestDt = Math.abs(date - closest.dt);

            if (currentDt < closestDt) return current;
            else return closest;
          },
          item[0],
        );
        return getClosestTimeForEachItem;
      });
      console.log("closest Forecast times per day:", closestForecastTime);
    };

    getCurrentForecastData();
  }, [forecast]); // updates based on forecast changes

  return (
    <div className="w-full">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-xs font-semibold tracking-widest text-white/30 uppercase">
          5-Day Forecast
        </h3>
        <span className="text-xs text-white/20">Warsaw, PL</span>
      </div>

      {/* Cards row */}
      <div className="grid grid-cols-5 gap-3">
        {forecastDays.map((item, i) => (
          <div
            key={item.day}
            className={`
              flex flex-col items-center gap-2 rounded-2xl px-2 py-4
              border transition-colors
              ${
                i === 0
                  ? "bg-[#ff6b6b]/10 border-[#ff6b6b]/20"
                  : "bg-[#12121f] border-white/5 hover:border-white/10"
              }
              shadow-[0_4px_16px_rgba(0,0,0,0.35)]
            `}
          >
            {/* Day label */}
            <span
              className={`text-xs font-semibold tracking-wide uppercase ${
                i === 0 ? "text-[#ff6b6b]" : "text-white/40"
              }`}
            >
              {item.day}
            </span>

            {/* Weather icon */}
            <span className="text-2xl leading-none">{item.icon}</span>

            {/* Condition */}
            <span className="text-[10px] text-white/30 text-center leading-tight hidden sm:block">
              {item.condition}
            </span>

            {/* Temp range */}
            <div className="flex flex-col items-center gap-0.5">
              <span
                className={`text-sm font-bold ${
                  i === 0 ? "text-white" : "text-white/80"
                }`}
              >
                {item.high}°
              </span>
              <span className="text-xs text-white/30">{item.low}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
