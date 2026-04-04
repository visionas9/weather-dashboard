"use client";

import { useState, useEffect, createContext } from "react";
import {
  Weather,
  Favorite,
  Coords,
  WeatherContextType,
} from "@/app/types/weather";

const WeatherContext = createContext<WeatherContextType | null>(null);

export default function WeatherProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");

  const controller = new AbortController();

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return;
      setLoading(true);
      try {
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`,
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
      } catch (error) {
        console.error("Something went wrong:", error);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();

    return () => controller.abort();
  }, [city]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

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
