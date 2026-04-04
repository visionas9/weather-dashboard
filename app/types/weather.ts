// all TS interfaces live here
export interface Weather {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  weather: { description: string; icon: string }[];
  wind: { speed: number; deg: number };
  clouds: { all: number };
  visibility: number;
}

export interface Favorite {
  city: string;
  country: string;
  temp: number;
  icon: string;
}

export interface Coords {
  lat: number;
  lon: number;
}

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: { description: string; icon: string }[];
  clouds: { all: number };
  wind: { speed: number; deg: number };
  visibility: number;
  pop: number;
}

export interface WeatherContextType {
  city: string;
  setCity: (city: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  coords: Coords | null;
  setCoords: (coords: Coords | null) => void;
  weather: Weather | null;
  setWeather: (weather: Weather | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
  favorites: Favorite[];
  setFavorites: (favorites: Favorite[]) => void;
}
