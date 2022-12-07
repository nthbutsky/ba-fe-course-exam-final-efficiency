import {
  getIP,
  getCurrentWeather,
  getCityWeather,
  getForecast,
} from "@/api/weather";

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

    currentCity(state) {
      return state.currentCity;
    },

    forecast(state) {
      return state.forecast;
    },
  },

  mutations: {
    SET_CURRENT_CITY_WEATHER(state, payload) {
      state.currentCityWeather = payload;
    },

    SET_FORECAST(state, payload) {
      state.forecast = payload;
    },

    SET_CURRENT_CITY(state, payload) {
      state.currentCity = payload;
    },
  },

  actions: {
    async getCurrentCityWeather({ commit }) {
      const ip = await getIP();
      commit("SET_CURRENT_CITY", ip.city);
      const currentWeather = await getCurrentWeather(ip.latitude, ip.longitude);
      commit("SET_CURRENT_CITY_WEATHER", currentWeather);
      console.log(currentWeather);
    },

    async searchCityWeather({ commit }, payload) {
      const cityWeather = await getCityWeather(payload);
      const currentWeather = await getCurrentWeather(
        cityWeather.coord.lat,
        cityWeather.coord.lon
      );
      commit("SET_CURRENT_CITY", payload);
      commit("SET_CURRENT_CITY_WEATHER", currentWeather);
    },

    async getCurrentForecast({ commit }) {
      const ip = await getIP();
      const cityForecast = await getForecast(ip.latitude, ip.longitude);
      commit("SET_FORECAST", cityForecast);
    },
  },
};
