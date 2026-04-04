"use client";
import { useContext } from "react";
import { WeatherContext } from "../lib/WeatherProvider";

export default function CurrentWeather() {
  const { weather, setWeather } = useContext(WeatherContext);
  console.log(weather);

  if (!weather) return <p>Search for a city to see the current weather.</p>;

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.6)] p-6 md:p-8"
      style={{
        background:
          "linear-gradient(135deg, #161625 0%, #12121f 50%, #0f0f1c 100%)",
      }}
    >
      {/* Background radial glow — coral top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, #ff6b6b 0%, transparent 70%)",
        }}
      />
      {/* Background radial glow — sky bottom-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-16 w-60 h-60 rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #4fc3f7 0%, transparent 70%)",
        }}
      />

      {/* Top row: city + condition badge */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-medium tracking-widest text-white/30 uppercase mb-1">
            Current Weather
          </p>
          <h2 className="text-2xl font-bold text-white leading-tight">
            {weather.name}
            <span className="ml-2 text-base font-normal text-white/40">
              {weather.sys.country}
            </span>
          </h2>
        </div>

        {/* Condition badge */}
        <span className="flex items-center gap-1.5 bg-white/5 border border-white/5 rounded-full px-3 py-1.5 text-xs text-white/60 shrink-0">
          {/* Create emojis array for each weather condition and match with the weather */}
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="w-6 h-6"
          />
          {weather.weather[0].description}
        </span>
      </div>

      {/* Hero temperature row */}
      <div className="flex items-end gap-6 mb-8">
        {/* Big temperature */}
        <div className="flex items-start leading-none">
          <span className="text-8xl md:text-9xl font-black text-white tracking-tighter">
            {Math.round(weather.main.temp)}
          </span>
          <span className="text-3xl font-light text-white/50 mt-4">°C</span>
        </div>

        {/* Vertical divider + min/max */}
        <div className="flex flex-col gap-1 pb-2 border-l border-white/10 pl-6">
          <span className="text-xs text-white/30 uppercase tracking-widest">
            Range
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#4fc3f7]">
              ↓ {Math.round(weather.main.temp_min)}
            </span>
            <span className="text-white/20">/</span>
            <span className="text-sm font-medium text-[#ff6b6b]">
              ↑ {Math.round(weather.main.temp_max)}
            </span>
          </div>
          <p className="text-xs text-white/30 mt-1">
            Clouds: {weather.clouds.all}%
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Feels like */}
        <div className="flex flex-col gap-1 bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-3">
          <span className="text-xs text-white/30 uppercase tracking-wider">
            Feels like
          </span>
          <span className="text-lg font-semibold text-white">
            {Math.round(weather.main.feels_like)}°C
          </span>
        </div>

        {/* Humidity */}
        <div className="flex flex-col gap-1 bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-3">
          <span className="text-xs text-white/30 uppercase tracking-wider">
            Humidity
          </span>
          <div className="flex items-end gap-1">
            <span className="text-lg font-semibold text-white">
              {Math.round(weather.main.humidity)}
            </span>
            <span className="text-sm text-white/40 mb-0.5">%</span>
          </div>
        </div>

        {/* Wind */}
        <div className="flex flex-col gap-1 bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-3">
          <span className="text-xs text-white/30 uppercase tracking-wider">
            Wind
          </span>
          <div className="flex items-end gap-1">
            <span className="text-lg font-semibold text-white">
              {weather.wind.speed.toFixed(1)}
            </span>
            <span className="text-sm text-white/40 mb-0.5">m/s</span>
          </div>
        </div>

        {/* Visibility */}
        <div className="flex flex-col gap-1 bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-3">
          <span className="text-xs text-white/30 uppercase tracking-wider">
            Visibility
          </span>
          <div className="flex items-end gap-1">
            <span className="text-lg font-semibold text-white">
              {weather.visibility / 1000}
            </span>
            <span className="text-sm text-white/40 mb-0.5">km</span>
          </div>
        </div>
      </div>

      {/* Bottom: pressure + sunrise/sunset row */}
      <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-2 text-sm text-white/40">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v6M12 16v6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" />
          </svg>
          <span>
            Pressure{" "}
            <strong className="text-white/70">
              {weather.main.pressure} hPa
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-white/40">
          <svg
            className="w-4 h-4 text-[#f5a623]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx={12} cy={12} r={5} />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
          <span>
            Sunrise{" "}
            <strong className="text-white/70">
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-white/40">
          <svg
            className="w-4 h-4 text-[#ff6b6b]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 18a5 5 0 0 0-10 0" />
            <line x1={12} y1={2} x2={12} y2={9} />
            <line x1={4.22} y1={10.22} x2={5.64} y2={11.64} />
            <line x1={1} y1={18} x2={3} y2={18} />
            <line x1={21} y1={18} x2={23} y2={18} />
            <line x1={18.36} y1={11.64} x2={19.78} y2={10.22} />
          </svg>
          <span>
            Sunset{" "}
            <strong className="text-white/70">
              {" "}
              {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-white/40">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
          </svg>
          <span>
            Wind dir{" "}
            <strong className="text-white/70">{weather.wind.deg}°</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
