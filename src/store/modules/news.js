import { newsApiKey } from "@/api/news.config";

export default {
  state: { news: null },

  getters: {
    news: (state) => state.news,
  },

  mutations: {
    setNews: (state, payload) => (state.news = payload),
  },

  actions: {
    async getNews({ commit }) {
      try {
        const newsResponse = await fetch(
          "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=" +
            newsApiKey
        );
        const newsData = await newsResponse.json();
        commit("setNews", newsData);
      } catch (error) {
        commit("setError", error.message);
      }
    },
  },
};
