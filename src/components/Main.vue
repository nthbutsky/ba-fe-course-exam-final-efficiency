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
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Your list of to-dos</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid> </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { authService } from "../api/authentication";

export default {
  name: "Main",

  data: () => ({
    drawer: null,
    items: [
      { title: "To-dos", icon: "mdi-format-list-checks" },
      { title: "Notes", icon: "mdi-notebook-edit-outline" },
      { title: "Pomodoro", icon: "mdi-av-timer" },
      { title: "Weather", icon: "mdi-weather-partly-cloudy" },
      { title: "News", icon: "mdi-newspaper" },
      { title: "Clocks", icon: "mdi-web-clock" },
      { title: "Currrency", icon: "mdi-currency-usd" },
      { title: "Music", icon: "mdi-music" },
      { title: "Finances", icon: "mdi-finance" },
    ],
    right: null,
  }),

  methods: {
    logOut() {
      authService.logOut();
      this.$router.push("/login");
    },
  },
};
</script>
