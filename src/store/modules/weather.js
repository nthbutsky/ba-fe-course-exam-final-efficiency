import { apiKey } from "../../api/weather.config";

export default {
  state: {
    currentCityWeather: null,
    specificCityWeather: null,
    forecast: null,
    currentCity: null,
  },

  getters: {
    currentCityWeather(state) {
      return state.currentCityWeather;
    },
    specificCityWeather(state) {
      return state.specificCityWeather;
    },
    currentCity(state) {
      return state.currentCity;
    },
    forecast(state) {
      return state.forecast;
    },
  },

  mutations: {
    setCurrentCityWeather(state, payload) {
      state.currentCityWeather = payload;
    },
    setSpecificCityWeather(state, payload) {
      state.specificCityWeather = payload;
    },
    setForecast(state, payload) {
      state.forecast = payload;
    },
    setCurrentCity(state, payload) {
      state.currentCity = payload;
    },
  },

  actions: {
    async getCurrentCityWeather({ commit }) {
      let lat = "";
      let lon = "";

      try {
        const ipApiKey = apiKey.ip;
        const ipUrlBase = "https://api.ipdata.co";
        const ipResponse = await fetch(`${ipUrlBase}?api-key=${ipApiKey}`);
        const ipData = await ipResponse.json();
        console.log(ipData);
        lat = await ipData.latitude;
        lon = await ipData.longitude;
        commit("setCurrentCity", ipData.city);
      } catch (error) {
        commit("setError", error.message);
      }

      try {
        const weatherApiKey = apiKey.weather;
        const weatherUrlBase =
          "https://api.openweathermap.org/data/2.5/onecall";

        const weatherResponse = await fetch(
          `${weatherUrlBase}?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
        );
        const weatherData = await weatherResponse.json();
        commit("setCurrentCityWeather", weatherData.current);
        commit("setForecast", weatherData.daily);
      } catch (error) {
        commit("setError", error.message);
      }
    },

    async searchCityWeather({ commit }, payload) {
      let lat = "";
      let lon = "";

      try {
        const weatherApiKey = apiKey.weather;
        const weatherUrlBase =
          "https://api.openweathermap.org/data/2.5/weather";

        const weatherResponse = await fetch(
          `${weatherUrlBase}?q=${payload}&appid=${weatherApiKey}&units=metric`
        );
        const weatherData = await weatherResponse.json();
        lat = weatherData.coord.lat;
        lon = weatherData.coord.lon;
        console.log(weatherData);
        commit("setCurrentCity", payload);
        commit("setCurrentCityWeather", weatherData);
      } catch (error) {
        commit("setError", error.message);
      }

      try {
        const weatherApiKey = apiKey.weather;
        const weatherUrlBase =
          "https://api.openweathermap.org/data/2.5/onecall";
        const weatherResponse = await fetch(
          `${weatherUrlBase}?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
        );
        const weatherData = await weatherResponse.json();
        // console.log(weatherData);
        commit("setCurrentCityWeather", weatherData.current);
        commit("setForecast", weatherData.daily);
      } catch (error) {
        commit("setError", error.message);
      }
    },
  },
};
