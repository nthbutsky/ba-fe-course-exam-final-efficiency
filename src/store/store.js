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

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    status: null,
    error: null,
    weather: null,
    city: null,
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
    setWeather(state, payload) {
      state.weather = payload;
    },
    setCity(state, payload) {
      state.city = payload;
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

    async getWeather({ commit }) {
      let lat = "";
      let lon = "";

      try {
        const ipApiKey =
          "40703b2c595da4fa34a191f37ad363ddb61ab799ed907dcf26d19680";
        const ipUrlBase = "https://api.ipdata.co";
        const ipResponse = await fetch(`${ipUrlBase}?api-key=${ipApiKey}`);
        const ipData = await ipResponse.json();
        console.log(ipData);
        lat = await ipData.latitude;
        lon = await ipData.longitude;
        commit("setCity", ipData.city);
      } catch (error) {
        commit("setError", error.message);
      }

      try {
        const weatherApiKey = "3b1b01bc6be455598f1760293613a3e2";
        const weatherUrlBase =
          "https://api.openweathermap.org/data/2.5/onecall";

        const weatherResponse = await fetch(
          `${weatherUrlBase}?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
        );
        const weatherData = await weatherResponse.json();
        console.log(weatherData);
        commit("setWeather", weatherData);
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

    weather(state) {
      return state.weather;
    },

    city(state) {
      return state.city;
    },
  },

  modules: {},
});
