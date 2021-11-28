<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-card
            class="mx-auto"
            max-width="600"
            v-if="this.currentCityWeather"
          >
            <v-text-field
              ref="searchCityInput"
              max-width="600"
              v-model="cityQuery"
              @click:append="searchCityWeather(cityQuery), clearSearch()"
              @keyup.enter="searchCityWeather(cityQuery), clearSearch()"
              class="pa-3"
              outlined
              label="Search city"
              append-icon="mdi-map-search-outline"
              :placeholder="'e.g. ' + randomPlaceholder"
              @focus="chooseRandomPlaceholder"
              hide-details
              clearable
            ></v-text-field>

            <v-row justify="space-between">
              <v-col cols="auto">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h5">{{
                      firstLetterToUpperCase(currentCity)
                    }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      firstLetterToUpperCase(
                        currentCityWeather.weather[0].description
                      )
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>

              <v-col cols="auto" class="text-end">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h5"
                      >{{
                        month[new Date(currentCityWeather.dt * 1000).getDay()]
                      }}
                      {{ new Date(currentCityWeather.dt * 1000).getDate() }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{
                      weekDay[new Date(currentCityWeather.dt * 1000).getDay()]
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>

            <v-card-text>
              <v-row align="center">
                <v-col class="text-h2" cols="6"
                  >{{ Math.floor(currentCityWeather.temp) }}&deg;C</v-col
                >
                <v-col cols="6">
                  <v-img
                    :src="`http://openweathermap.org/img/wn/${this.currentCityWeather.weather[0].icon}@2x.png`"
                    width="92"
                  ></v-img>
                </v-col>
              </v-row>
            </v-card-text>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-windsock</v-icon>
              </v-list-item-icon>
              <v-list-item-subtitle
                >{{
                  Math.floor(currentCityWeather.wind_speed)
                }}
                km/h</v-list-item-subtitle
              >
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-water-percent</v-icon>
              </v-list-item-icon>
              <v-list-item-subtitle
                >{{
                  Math.floor(currentCityWeather.humidity)
                }}%</v-list-item-subtitle
              >
            </v-list-item>

            <v-list class="transparent">
              <v-list-item
                v-for="dailyWeatherItem in forecast.slice(0, 3)"
                :key="dailyWeatherItem.dt"
              >
                <v-list-item-title>
                  {{ weekDay[new Date(dailyWeatherItem.dt * 1000).getDay()] }},
                  {{ new Date(dailyWeatherItem.dt * 1000).getDate() }}
                </v-list-item-title>

                <v-list-item-icon>
                  <v-img
                    :src="`http://openweathermap.org/img/wn/${dailyWeatherItem.weather[0].icon}@2x.png`"
                  ></v-img>
                </v-list-item-icon>

                <v-list-item-subtitle class="text-right">
                  {{ Math.floor(dailyWeatherItem.temp.eve) }}&deg;C
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn text> Full Report </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Weather",

  data() {
    return {
      weekDay: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      month: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      cityQuery: "",
      randomPlaceholder: "",
      placeholders: [
        "London",
        "Paris",
        "New York",
        "Tokyo",
        "Warsaw",
        "Berlin",
        "Oslo",
      ],
    };
  },

  computed: {
    ...mapGetters(["currentCityWeather", "currentCity", "forecast"]),
  },

  methods: {
    ...mapActions(["getCurrentCityWeather", "searchCityWeather"]),

    chooseRandomPlaceholder() {
      const placeholdersArrSize = this.placeholders.length;
      const randomNumber = Math.floor(
        Math.random() * (placeholdersArrSize - 0) + 0
      );
      this.randomPlaceholder = this.placeholders[randomNumber];
    },

    clearSearch() {
      this.cityQuery = "";
      this.$refs.searchCityInput.blur();
    },

    firstLetterToUpperCase(e) {
      const result = e[0].toUpperCase() + e.slice(1);
      return result;
    },
  },

  mounted() {
    this.getCurrentCityWeather();
  },
};
</script>
