"use client";

import { useState, createContext } from "react";

const weatherContext = createContext<any>(null);

export default function WeatherProvider({ children }: { children: any }) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
}

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
