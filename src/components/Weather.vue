<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-card
            elevation="12"
            class="mx-auto"
            max-width="600"
            v-if="this.currentCityWeather"
          >
            <v-text-field
              ref="searchCityInput"
              max-width="600"
              v-model="cityQuery"
              @click:append="
                searchCityWeather(cityQuery);
                clearSearch();
              "
              @keyup.enter="
                searchCityWeather(cityQuery);
                clearSearch();
              "
              class="pa-3"
              outlined
              label="Search your place"
              append-icon="mdi-map-search-outline"
              :placeholder="'e.g. ' + randomPlaceholder"
              @focus="chooseRandomPlaceholder"
              hide-details
              clearable
            ></v-text-field>

            <v-row justify="space-between">
              <v-col cols="6">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6">{{
                      firstLetterToUpperCase(currentCity)
                    }}</v-list-item-title>
                    <v-list-item-subtitle class="text-h6">{{
                      firstLetterToUpperCase(
                        currentCityWeather.weather[0].description
                      )
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>

              <v-col class="text-end" cols="6">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6"
                      >{{
                        month[new Date(currentCityWeather.dt * 1000).getDay()]
                      }}
                      {{ new Date(currentCityWeather.dt * 1000).getDate() }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-h6">{{
                      weekDay[new Date(currentCityWeather.dt * 1000).getDay()]
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>

            <v-card-text>
              <v-row align="center">
                <v-col class="text-h2 pa-0 ma-0" cols="6" align="center"
                  >{{ Math.floor(currentCityWeather.temp) }}&deg;C</v-col
                >
                <v-col class="pa-0 ma-0" cols="6">
                  <v-img :src="currentWeatherIcon" width="200"></v-img>
                </v-col>
              </v-row>
            </v-card-text>

            <v-row>
              <v-col cols="4">
                <v-list-item>
                  <v-list-item-icon class="ma-0">
                    <v-img
                      width="80"
                      src="../assets/weather-icons/all/thermometer.svg"
                    >
                    </v-img>
                  </v-list-item-icon>
                  <v-list-item-subtitle class="text-h5"
                    >{{ Math.floor(currentCityWeather.feels_like) }}&deg;C
                    <v-row>
                      <v-col>
                        <v-list-item-subtitle>Feels like</v-list-item-subtitle>
                      </v-col>
                    </v-row>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-col>

              <v-col cols="4">
                <v-list-item>
                  <v-list-item-icon class="ma-0">
                    <v-img
                      width="80"
                      src="../assets/weather-icons/all/humidity.svg"
                    >
                    </v-img>
                  </v-list-item-icon>
                  <v-list-item-subtitle class="text-h5"
                    >{{ Math.floor(currentCityWeather.humidity) }}%
                    <v-row>
                      <v-col>
                        <v-list-item-subtitle>Humidity</v-list-item-subtitle>
                      </v-col>
                    </v-row></v-list-item-subtitle
                  >
                </v-list-item>
              </v-col>

              <v-col cols="4">
                <v-list-item>
                  <v-list-item-icon class="ma-0">
                    <v-img
                      width="80"
                      src="../assets/weather-icons/all/windsock.svg"
                    >
                    </v-img>
                  </v-list-item-icon>
                  <v-list-item-subtitle class="text-h5"
                    >{{ Math.floor(currentCityWeather.wind_speed) }} km/h
                    <v-row>
                      <v-col>
                        <v-list-item-subtitle>Wind speed</v-list-item-subtitle>
                      </v-col>
                    </v-row></v-list-item-subtitle
                  >
                </v-list-item>
              </v-col>
            </v-row>

            <v-list class="transparent">
              <v-list-item
                v-for="(dailyWeatherItem, index) in forecast.slice(0, 5)"
                :key="dailyWeatherItem.dt"
              >
                <v-col cols="3">
                  <v-list-item-title>
                    {{
                      weekDay[new Date(dailyWeatherItem.dt * 1000).getDay()]
                    }},
                    {{ new Date(dailyWeatherItem.dt * 1000).getDate() }}
                  </v-list-item-title>
                </v-col>

                <v-list-item-icon class="ma-0">
                  <v-img width="100" :src="weatherForecastIcon[index]"></v-img>
                </v-list-item-icon>

                <v-col cols="auto" class="pa-0 ma-0 text-center">
                  <v-list-item>
                    <v-list-item-icon>
                      <v-img
                        width="80"
                        src="../assets/weather-icons/all/thermometer.svg"
                      >
                      </v-img>
                    </v-list-item-icon>
                    <v-list-item-subtitle
                      >{{ Math.floor(dailyWeatherItem.temp.day) }}&deg;C
                      <v-row>
                        <v-col>
                          <v-list-item-subtitle>Day</v-list-item-subtitle>
                        </v-col>
                      </v-row>
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-col>

                <v-col cols="auto" class="pa-0 ma-0 text-center">
                  <v-list-item>
                    <v-list-item-icon>
                      <v-img
                        width="80"
                        src="../assets/weather-icons/all/thermometer.svg"
                      >
                      </v-img>
                    </v-list-item-icon>
                    <v-list-item-subtitle
                      >{{ Math.floor(dailyWeatherItem.temp.day) }}&deg;C
                      <v-row>
                        <v-col>
                          <v-list-item-subtitle>Night</v-list-item-subtitle>
                        </v-col>
                      </v-row>
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-col>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn text href="https://openweathermap.org/" target="blank">
                More
              </v-btn>
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

    currentWeatherIcon() {
      return require(`../assets/weather-icons/${this.currentCityWeather.weather[0].icon}.svg`);
    },

    weatherForecastIcon() {
      return this.forecast.map(function (dailyWeatherItem) {
        return require(`../assets/weather-icons/${dailyWeatherItem.weather[0].icon}.svg`);
      });
    },
  },

  methods: {
    ...mapActions(["getCurrentCityWeather", "searchCityWeather"]),

    chooseRandomPlaceholder() {
      const placeholdersArrSize = this.placeholders.length;
      const randomNumber = Math.floor(Math.random() * placeholdersArrSize);
      this.randomPlaceholder = this.placeholders[randomNumber];
    },

    clearSearch() {
      this.cityQuery = "";
      this.$refs.searchCityInput.blur();
    },

    firstLetterToUpperCase(e) {
      return e[0].toUpperCase() + e.slice(1);
    },
  },

  mounted() {
    this.getCurrentCityWeather();
  },
};
</script>
