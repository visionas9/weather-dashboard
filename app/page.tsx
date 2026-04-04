import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
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
        <div className="animate-fade-in-delay">
          <CurrentWeather />
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
