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
            <v-list-item-subtitle class="primary--text">{{
              menuItem.text
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            elevation="12"
            @click="signOutAction"
            block
            :color="currentColor"
            type="submit"
            >logout</v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar elevation="12" :color="currentColor" app dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ this.$router.history.current.name }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-chip @click="nameChange = true" class="ma-2" outlined color="white">
        {{ isUserName }}
        <v-avatar right>
          <v-icon>mdi-account-circle</v-icon>
        </v-avatar>
      </v-chip>

      <v-spacer></v-spacer>

      <v-chip @click="colorPicker = true" class="ma-2" color="white" outlined>
        <v-avatar center>
          <v-icon>mdi-palette</v-icon>
        </v-avatar>
      </v-chip>

      <v-chip @click="themeMode" class="ma-2" outlined color="white">
        <v-avatar center>
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-avatar>
      </v-chip>
    </v-app-bar>

    <v-main>
      <v-container fluid fill-height>
        <v-row
          v-if="this.$router.history.current.name === 'Home'"
          align="center"
          justify="center"
          class="text-center"
        >
          <v-col align="center">
            <v-col class="text-h2">Welcome</v-col>
            <v-col class="text-h4">
              {{ isUserName }}
            </v-col>
          </v-col>
        </v-row>

        <v-row v-show="this.$router.history.current.name !== 'Home'">
          <v-col>
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-container>
      <v-row justify="center">
        <v-dialog v-model="nameChange" max-width="350">
          <v-card>
            <v-card-title class="text-h6">Please add/change name</v-card-title>

            <v-text-field
              @keyup.enter="addUserName(newUserName), (nameChange = false)"
              v-model="newUserName"
              class="pa-6"
              label="Choose any name you want!"
            ></v-text-field>

            <v-card-actions class="px-5">
              <v-spacer></v-spacer>

              <v-btn color="primary" text @click="nameChange = false">
                Cancel
              </v-btn>

              <v-btn
                color="primary"
                text
                @click="addUserName(newUserName), (nameChange = false)"
              >
                Done
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>

    <v-container>
      <v-row justify="center">
        <v-dialog v-model="colorPicker" max-width="350">
          <v-color-picker
            dot-size="50"
            swatches-max-height="200"
            v-model="selectedColor"
          ></v-color-picker>
        </v-dialog>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "Main",

  data: () => ({
    drawer: null,
    menuItems: [
      {
        name: "Todos",
        icon: "mdi-format-list-checks",
        link: "/todos",
      },

      {
        name: "Weather",
        icon: "mdi-weather-partly-cloudy",
        link: "/weather",
      },
      {
        name: "News",
        icon: "mdi-newspaper",
        link: "/news",
      },
      {
        name: "Calendar",
        icon: "mdi-calendar-clock",
        link: "/calendar",
      },
      {
        name: "Clocks",
        icon: "mdi-web-clock",
        //  link: "/clocks"
        text: "coming soon",
        option: "disabled",
      },
      {
        name: "Pomodoro",
        icon: "mdi-av-timer",
        // link: "/pomodoro",
        text: "coming soon",
        option: "disabled",
      },
      {
        name: "Currrency",
        icon: "mdi-currency-usd",
        // link: "/currency",
        text: "coming soon",
        option: "disabled",
      },
      {
        name: "Music",
        icon: "mdi-music",
        // link: "/music",
        text: "coming soon",
        option: "disabled",
      },
      {
        name: "Finances",
        icon: "mdi-finance",
        // link: "/finances",
        text: "coming soon",
        option: "disabled",
      },
    ],
    right: null,
    nameChange: false,
    colorPicker: false,
    newUserName: "",
    selectedColor: null,
  }),

  computed: {
    ...mapGetters(["user", "userName", "userEmail"]),

    currentColor() {
      if (this.selectedColor === null) {
        return "secondary";
      } else {
        localStorage.setItem("color", this.selectedColor.hex);
        return this.selectedColor.hex;
      }
    },

    isUserName() {
      return this.userName ? this.userName : this.userEmail;
    },
  },

  methods: {
    ...mapMutations(["setUser", "setUserName"]),
    ...mapActions(["signOutAction", "addUserName"]),

    themeMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.$vuetify.theme.themes.dark.secondary = "#2a73c5";
    },
  },
};
</script>

<style lang="scss">
#lateral .v-btn--example {
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}
</style>
