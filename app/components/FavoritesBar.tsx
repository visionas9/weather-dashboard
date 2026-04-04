"use client";
import { WeatherContext } from "../lib/WeatherProvider";
import { useContext } from "react";

export default function FavoritesBar() {
  const { favorites, setFavorites, setCity, city } =
    useContext(WeatherContext)!;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-xs font-semibold tracking-widest text-white/30 uppercase">
          Your Favorites
        </h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {favorites.map((fav) => (
          <div
            key={fav.city}
            onClick={() => setCity(fav.city)}
            className={`
      flex items-center gap-3 rounded-2xl px-4 py-3
      border cursor-pointer select-none transition-colors
      ${fav.city.toLowerCase() === city.toLowerCase() ? "bg-[#1e2a45] border-[#4fc3f7]/20" : "bg-[#12121f] border-white/5 hover:border-white/10"}
      shadow-[0_2px_12px_rgba(0,0,0,0.3)]
    `}
          >
            <img
              src={`https://openweathermap.org/img/wn/${fav.icon}@2x.png`}
              alt="weather icon"
              className="w-8 h-8"
            />
            <div className="flex flex-col">
              <span
                className={`text-sm font-semibold leading-tight ${fav.city.toLowerCase() === city.toLowerCase() ? "text-[#4fc3f7]" : "text-white/80"}`}
              >
                {fav.city}
              </span>
              <span className="text-[10px] text-white/30">{fav.country}</span>
            </div>
            <span
              className={`text-sm font-bold ml-2 ${fav.city.toLowerCase() === city.toLowerCase() ? "text-white" : "text-white/50"}`}
            >
              {fav.temp}°
            </span>
            <button
              onClick={() =>
                setFavorites(favorites.filter((f) => f.city !== fav.city))
              }
              className="text-white/30 hover:text-white/60 transition-colors ml-1"
            >
              ❤️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
