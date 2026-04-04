"use client";
import { useContext, useState, useId } from "react";
import { WeatherContext } from "../lib/WeatherProvider";

export default function SearchBar() {
  const { city, setCity } = useContext(WeatherContext)!;
  const [citySearch, setCitySearch] = useState<string>("");
  const id = useId();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCity(citySearch);
    }
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
          autoComplete="off"
        />

        <button
          onClick={() => setCity(citySearch)}
          className="px-4 py-2 rounded-xl bg-white/10 text-white/70 text-sm font-medium hover:bg-white/20 hover:text-white transition-colors border border-white/10"
        >
          Search
        </button>
      </div>
    </div>
  );
}
