import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CuurentWeather";
import ForecastStrip from "./components/ForecastStrip";
import FavoritesBar from "./components/FavoritesBar";

export default function Home() {
  return (
    <main className="min-h-screen page-bg p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        {/* Top bar: search */}
        <div className="animate-fade-in">
          <SearchBar />
        </div>

        {/* Main content: hero weather card */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 animate-fade-in-delay">
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
        <div className="animate-fade-in-delay-2">
          <ForecastStrip />
        </div>

        {/* Favorites */}
        <div className="animate-fade-in-delay-3">
          <FavoritesBar />
        </div>
      </div>
    </main>
  );
}
