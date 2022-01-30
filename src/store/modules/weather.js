import { getIP, getCurrentWeather, getCityWeather } from "@/api/weather";

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
      if (ip.message) console.log(ip);
      commit("SET_CURRENT_CITY", ip.city);
      const currentWeather = await getCurrentWeather(ip.latitude, ip.longitude);
      commit("SET_CURRENT_CITY_WEATHER", currentWeather.current);
      commit("SET_FORECAST", currentWeather.daily);
    },

    async searchCityWeather({ commit }, payload) {
      const cityWeather = await getCityWeather(payload);
      const currentWeather = await getCurrentWeather(
        cityWeather.coord.lat,
        cityWeather.coord.lon
      );

      commit("SET_CURRENT_CITY", payload);
      commit("SET_CURRENT_CITY_WEATHER", currentWeather.current);
      commit("SET_FORECAST", currentWeather.daily);
    },
  },
};
