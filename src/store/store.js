import Vue from "vue";
import Vuex from "vuex";
import { app } from "../api/firebase";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import router from "../router/router";
import { apiKey } from "../api/weather.config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    status: null,
    error: null,
    currentCityWeather: null,
    specificCityWeather: null,
    forecast: null,
    currentCity: null,
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    removeUser(state) {
      state.user = null;
    },
    setStatus(state, payload) {
      state.status = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
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
    signUpAction({ commit }, payload) {
      commit("setStatus", "loading");
      createUserWithEmailAndPassword(
        getAuth(app),
        payload.email,
        payload.password
      )
        .then((response) => {
          commit("setUser", response.user.uid);
          commit("setStatus", "success");
          commit("setError", null);
          router.replace("/login");
          console.log(
            `USER ${response.user.email} HAS BEEN SUCCESSFULLY CREATED!`
          );
        })
        .catch((error) => {
          commit("setStatus", "failure");
          commit("setError", error.message);
        });
    },

    signInAction({ commit }, payload) {
      signInWithEmailAndPassword(getAuth(app), payload.email, payload.password)
        .then((response) => {
          commit("setUser", response.user.uid);
          commit("setStatus", "success");
          commit("setError", null);
          console.log(
            `USER ${response.user.email} HAS BEEN SUCCESFULLY LOGGED IN!`
          );
          localStorage.setItem(
            "user",
            JSON.stringify({
              uid: response.user.uid,
              jwt: response.user.accessToken,
            })
          );
          router.push("/");
        })
        .catch((error) => {
          commit("setStatus", "failure");
          commit("setError", error.message);
        });
    },

    signOutAction({ commit }) {
      signOut(getAuth(app))
        .then(() => {
          commit("setUser", null);
          commit("setStatus", "success");
          commit("setError", null);
          localStorage.clear("user");
          console.log("logged out");
          router.push("/login");
        })
        .catch((error) => {
          commit("setStatus", "failure");
          commit("setError", error.message);
        });
    },

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
        console.log(weatherData);
        console.log(weatherData.daily);
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
        console.log(weatherData);
        commit("setCurrentCityWeather", weatherData.current);
        commit("setForecast", weatherData.daily);
      } catch (error) {
        commit("setError", error.message);
      }
    },
  },

  getters: {
    user(state) {
      return state.user;
    },
    status(state) {
      return state.status;
    },
    error(state) {
      return state.error;
    },
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

  modules: {},
});
