import { weatherConfig } from "@/api/weather.config";

export async function getIP() {
  try {
    const response = await fetch(weatherConfig.ip.url);
    return response.json();
  } catch (error) {
    return error;
  }
}

export async function getCurrentWeather(lat, lon) {
  try {
    const response = await fetch(
      `${weatherConfig.weather.url}weather?lat=${lat}&lon=${lon}&appid=${weatherConfig.weather.api}&units=metric`
    );
    return response.json();
  } catch (error) {
    return error;
  }
}

export async function getCityWeather(city) {
  try {
    const response = await fetch(
      `${weatherConfig.weather.url}weather?q=${city}&appid=${weatherConfig.weather.api}&units=metric`
    );
    return response.json();
  } catch (error) {
    return error;
  }
}

export async function getForecast(lat, lon) {
  try {
    const response = await fetch(
      `${weatherConfig.weather.url}forecast?lat=${lat}&lon=${lon}&appid=${weatherConfig.weather.api}&units=metric`
    );
    return response.json();
  } catch (error) {
    return error;
  }
}
