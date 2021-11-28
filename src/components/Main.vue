<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Efficiency </v-list-item-title>
          <v-list-item-subtitle> Save your time </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="(menuItem, index) in menuItems"
          :key="index"
          :to="menuItem.link"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ menuItem.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click="logOut" block color="primary" type="submit"
            >logout</v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ this.$router.history.current.name }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-chip class="ma-2">
        {{ currentUser }}
        <v-avatar right>
          <v-icon>mdi-account-circle</v-icon>
        </v-avatar>
      </v-chip>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
import authService from "../api/authentication";

export default {
  name: "Main",

  data: () => ({
    drawer: null,
    menuItems: [
      {
        name: "To-dos",
        icon: "mdi-format-list-checks",
        link: "/todos",
        title: "Your to-do list",
      },
      {
        name: "Notes",
        icon: "mdi-notebook-edit-outline",
        link: "/notes",
        title: "Your notes",
      },
      {
        name: "Pomodoro",
        icon: "mdi-av-timer",
        link: "/pomodoro",
        title: "Your",
      },
      {
        name: "Weather",
        icon: "mdi-weather-partly-cloudy",
        link: "/weather",
        title: "Your",
      },
      { name: "News", icon: "mdi-newspaper", link: "/news", title: "Your" },
      { name: "Clocks", icon: "mdi-web-clock", link: "/clocks", title: "Your" },
      {
        name: "Currrency",
        icon: "mdi-currency-usd",
        link: "/currency",
        title: "Your",
      },
      { name: "Music", icon: "mdi-music", link: "/music", title: "Your" },
      {
        name: "Finances",
        icon: "mdi-finance",
        link: "/finances",
        title: "Your",
      },
    ],
    right: null,
  }),

  computed: {
    currentUser: function () {
      return this.$store.state.user;
    },
  },

  methods: {
    ...mapMutations(["setUser"]),
    logOut() {
      authService.logOut();
    },
  },

  mounted() {
    if (localStorage.getItem("user")) {
      this.setUser(JSON.parse(localStorage.getItem("user")).uid);
    }
  },
};
</script>

