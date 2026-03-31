"use client";
import { useContext, useState, useId } from "react";
import { WeatherContext } from "../lib/WeatherProvider";

export default function SearchBar() {
  const { city, setCity } = useContext(WeatherContext);
  const [citySearch, setCitySearch]: any = useState("");
  const id = useId();

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      setCity(citySearch);
    } else return null;
  };

  return (
    <div className="w-full flex items-center gap-3">
      {/* Search input wrapper */}
      <div className="flex-1 flex items-center gap-3 bg-[#12121f] border border-white/5 rounded-2xl px-5 py-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        {/* Search icon */}
        <svg
          className="w-5 h-5 text-white/30 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx={11} cy={11} r={8} />
          <path d="m21 21-4.35-4.35" />
        </svg>

        {/* Input */}
        <input
          type="text"
          placeholder="Search city…"
          className="flex-1 bg-transparent text-[#e8e8f0] placeholder-white/20 text-sm outline-none"
          value={citySearch}
          id={id}
          onChange={(e) => setCitySearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={(e) => setCity(citySearch)}>Search</button>

        {/* Location pin chip */}
        <span className="hidden sm:flex items-center gap-1.5 text-xs text-white/30 bg-white/5 rounded-xl px-3 py-1.5">
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7z" />
            <circle cx={12} cy={9} r={2.5} />
          </svg>
          Warsaw, PL
        </span>
      </div>

      {/* Settings / filter button */}
      <button
        type="button"
        className="flex items-center justify-center w-12 h-12 bg-[#12121f] border border-white/5 rounded-2xl text-white/30 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:text-white/60 hover:border-white/10 transition-colors"
        aria-label="Filter"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1={4} y1={6} x2={20} y2={6} />
          <line x1={8} y1={12} x2={16} y2={12} />
          <line x1={11} y1={18} x2={13} y2={18} />
        </svg>
      </button>
    </div>
  );
}
