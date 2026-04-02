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
  const { city, coords } = useContext(WeatherContext); // I destructured context data that I need in here.
  const [forecast, setForecast] = useState<any>(null); // I created a local state to save forecast data

  const controller = new AbortController(); // abort controller to prevent fetch issues for cities

  useEffect(() => {
    const fetchForecast = async () => {
      // async function because since I fetch data from API and I need to wait for both city and coords as they are in my dependencies array
      if (!city) return; // if city is null this prevents the null return
      if (!coords) return; // if coords is null this prevents the null return
      const { lat, lon } = coords; // I destructured the coords that I get from WeatherContext, coords state is an object so I destructured as object

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`,
      ); // API call for 5 day forecast data that return an object with list array, for 5 days, for each day 8 object that updates the weather in every 3 hour.
      if (!forecastRes.ok) throw new Error("Forecast not found!"); // checks if data fetch were succesfull, if not throws an error.
      const forecastData = await forecastRes.json(); // if data fetvh is succesfull saves the data into variable
      setForecast(forecastData); // saves the fetched data to forecast local state
    };
    fetchForecast(); // I need to call the function to run it

    return () => controller.abort(); // cancels stale requests on city change
  }, [city, coords]); // This useEffect triggers as long as city and coords states gets update

  useEffect(() => {
    const getCurrentForecastData = () => {
      // I dont need an async function here so casual arrow function
      console.log("forecast:", forecast); // to check whether forecast state is null or not
      if (!forecast) return; // first render has a null forecast so to prevent it we put this guard to avoid null returns
      const date = new Date().getTime() / 1000; // I created new date and convert the time into seconds to make it comparable with the dt seconds that my fetched data returns
      const initialForecast = forecast.list.reduce(
        /*In here I am using reduce because I need to check a specific object inside list array.
         applies a specific function to each element inside the array, which is what we want in here, to compare each object with the current seconds to closest seconds.*/
        (closest: any, current: any) => {
          // reduce takes a fallback function and an initialValue as a start point, For the fallback function I am using closest and current parameeter cus I want to compare current and closest values from dt seconds to my date seconds
          const currentDt = Math.abs(date - current.dt); // gap for current entry
          const closestDt = Math.abs(date - closest.dt); // gap for closest entry

          if (currentDt < closestDt)
            return current; // if my current seconds is smaller than closest seconds I am returning the current
          else return closest; // otherwise the closest, and in my understanding in both cases I can return the object that I am looking for with this reduce.
        },
        forecast.list[0], // my start point to check is the first item inside my list array
      );
      console.log(initialForecast); // checking if everything is right outsiide of my reduce method but still inside the function
    };

    getCurrentForecastData(); // running function to trigger it
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
