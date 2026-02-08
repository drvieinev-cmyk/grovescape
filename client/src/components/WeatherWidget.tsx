/**
 * Merged Weather & Time Widget
 * Design: Matches reference with unified weather/time display in glassmorphic card
 */

import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, CloudSnow } from "lucide-react";

interface WeatherData {
  temp: number;
  condition: string;
  location: string;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [dateTime, setDateTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    // Get geolocation and fetch weather
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Using Open-Meteo API (free, no API key required)
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`
            );
            const data = await response.json();

            // Get location name using reverse geocoding
            const geoResponse = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const geoData = await geoResponse.json();

            const weatherCode = data.current.weather_code;
            let condition = "Clear";
            if (weatherCode >= 61 && weatherCode <= 67) condition = "Rainy";
            else if (weatherCode >= 71 && weatherCode <= 77) condition = "Snowy";
            else if (weatherCode >= 51 && weatherCode <= 57) condition = "Drizzle";
            else if (weatherCode >= 1 && weatherCode <= 3) condition = "Cloudy";
            else if (weatherCode === 0) condition = "Sunny";

            setWeather({
              temp: Math.round(data.current.temperature_2m),
              condition,
              location: geoData.address.city || geoData.address.town || "Unknown",
            });
            setLoading(false);
          } catch (error) {
            console.error("Weather fetch error:", error);
            // Fallback data
            setWeather({
              temp: 22,
              condition: "Sunny",
              location: "Toronto",
            });
            setLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Fallback to Toronto
          setWeather({
            temp: 22,
            condition: "Sunny",
            location: "Toronto",
          });
          setLoading(false);
        }
      );
    } else {
      // Fallback if geolocation not available
      setWeather({
        temp: 22,
        condition: "Sunny",
        location: "Toronto",
      });
      setLoading(false);
    }

    return () => clearInterval(timeInterval);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "Sunny":
      case "Clear":
        return <Sun className="w-6 h-6 md:w-7 md:h-7 text-yellow-500" />;
      case "Cloudy":
        return <Cloud className="w-6 h-6 md:w-7 md:h-7 text-gray-400" />;
      case "Rainy":
      case "Drizzle":
        return <CloudRain className="w-6 h-6 md:w-7 md:h-7 text-blue-500" />;
      case "Snowy":
        return <CloudSnow className="w-6 h-6 md:w-7 md:h-7 text-blue-300" />;
      default:
        return <Cloud className="w-6 h-6 md:w-7 md:h-7 text-gray-400" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
        <div className="animate-pulse flex items-center gap-3">
          <div className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      {/* Weather Icon & Info */}
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">{weather && getWeatherIcon(weather.condition)}</div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 tabular-nums">
              {weather?.temp}°C
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{weather?.condition}</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            {weather?.location}
          </div>
        </div>
      </div>

      {/* Time & Date */}
      <div className="flex flex-col items-end border-l border-gray-300 dark:border-gray-600 pl-4">
        <div className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 tabular-nums">
          {formatTime(dateTime)}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
          {formatDate(dateTime)}
        </div>
      </div>
    </div>
  );
}
