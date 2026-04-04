"use client";

import { useState, useEffect, createContext } from "react";

const WeatherContext = createContext<any>(null);

export default function WeatherProvider({ children }: { children: any }) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const controller = new AbortController();

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return;
      const geoRes = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`,
        { signal: controller.signal },
      );
      if (!geoRes.ok) throw new Error("City not found!");

      const geoData = await geoRes.json();
      const { lat, lon } = geoData[0];
      setCoords({ lat, lon });

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`,
      );
      if (!weatherRes.ok) throw new Error("Coordinates not found!");
      const weatherData = await weatherRes.json();
      setWeather(weatherData);
    };
    fetchWeather();

    return () => controller.abort(); // cancels stale requests on city change
  }, [city]);

  // Read from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // Save to localStorage when favorites changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        loading,
        setLoading,
        weather,
        setWeather,
        error,
        setError,
        coords,
        setCoords,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherContext };
