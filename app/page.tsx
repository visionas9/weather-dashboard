import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CuurentWeather";
import ForecastStrip from "./components/ForecastStrip";
import FavoritesBar from "./components/FavoritesBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0e17] p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        {/* Top bar: search */}
        <SearchBar />

        {/* Main content: hero weather card */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Current weather — spans 2 columns on xl */}
          <div className="xl:col-span-2">
            <CurrentWeather />
          </div>

          {/* Sidebar slot — kept for future stat cards */}
          <div className="hidden xl:flex flex-col gap-5">
            {/* Placeholder preserved for future stat sections */}
            <div className="flex-1 rounded-3xl bg-[#12121f] border border-white/5 card-glow" />
          </div>
        </div>

        {/* Forecast strip */}
        <ForecastStrip />

        {/* Favorites */}
        <FavoritesBar />
      </div>
    </main>
  );
}
