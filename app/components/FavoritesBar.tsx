const favorites = [
  { city: "Warsaw", country: "PL", icon: "☀️", temp: 12 },
  { city: "London", country: "GB", icon: "🌥️", temp: 9 },
  { city: "Berlin", country: "DE", icon: "⛅", temp: 11 },
  { city: "Paris", country: "FR", icon: "🌤️", temp: 14 },
];

export default function FavoritesBar() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-xs font-semibold tracking-widest text-white/30 uppercase">
          Favorites
        </h3>
        <button
          type="button"
          className="flex items-center gap-1 text-xs text-white/20 hover:text-white/40 transition-colors"
        >
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1={12} y1={5} x2={12} y2={19} />
            <line x1={5} y1={12} x2={19} y2={12} />
          </svg>
          Add city
        </button>
      </div>

      {/* Favorites chips row */}
      <div className="flex flex-wrap gap-3">
        {favorites.map((fav, i) => (
          <div
            key={fav.city}
            className={`
              flex items-center gap-3 rounded-2xl px-4 py-3
              border cursor-pointer select-none transition-colors
              ${
                i === 0
                  ? "bg-[#1e2a45] border-[#4fc3f7]/20"
                  : "bg-[#12121f] border-white/5 hover:border-white/10"
              }
              shadow-[0_2px_12px_rgba(0,0,0,0.3)]
            `}
          >
            {/* Icon */}
            <span className="text-xl leading-none">{fav.icon}</span>

            {/* City info */}
            <div className="flex flex-col">
              <span
                className={`text-sm font-semibold leading-tight ${
                  i === 0 ? "text-[#4fc3f7]" : "text-white/80"
                }`}
              >
                {fav.city}
              </span>
              <span className="text-[10px] text-white/30">{fav.country}</span>
            </div>

            {/* Temperature */}
            <span
              className={`text-sm font-bold ml-2 ${
                i === 0 ? "text-white" : "text-white/50"
              }`}
            >
              {fav.temp}°
            </span>
          </div>
        ))}

        {/* Empty "add" slot */}
        <div className="flex items-center justify-center gap-2 rounded-2xl px-6 py-3 border border-dashed border-white/10 text-white/15 text-sm hover:border-white/20 hover:text-white/25 cursor-pointer transition-colors">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1={12} y1={5} x2={12} y2={19} />
            <line x1={5} y1={12} x2={19} y2={12} />
          </svg>
          <span>Add</span>
        </div>
      </div>
    </div>
  );
}
