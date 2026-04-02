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
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherContext };

/* data returns: 
{
"coord":{"lon":21.0118,"lat":52.2298},
"weather":[
{"id":800,
"main":"Clear",
"description":"clear sky",
"icon":"01n"}
],
"base":"stations",
"main":{
"temp":11.55,
"feels_like":9.96,
"temp_min":9.26,
"temp_max":12.74,
"pressure":1014,
"humidity":46,
"sea_level":1014,
"grnd_level":1004
},
"visibility":10000,
"wind":{"speed":2.06,"deg":220},
"clouds":{"all":0},
"dt":1774378611,
"sys":{
"type":2,
"id":2032856,
"country":"PL",
"sunrise":1774326585,
"sunset":1774371283
},
"timezone":3600,
"id":756135,
"name":"Warsaw",
"cod":200
}
*/
