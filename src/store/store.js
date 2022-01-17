import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import todos from "./modules/todos";
import weather from "./modules/weather";
import news from "./modules/news";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    todos,
    weather,
    news,
  },
});
