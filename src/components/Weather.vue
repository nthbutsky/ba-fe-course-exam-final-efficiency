<template>
  <v-card class="mx-auto" max-width="400">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5">{{ city }}</v-list-item-title>
        <v-list-item-subtitle>{{
          weather.current.weather[0].description
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align="center">
        <v-col class="text-h2" cols="6"
          >{{ Math.floor(weather.current.temp) }}&deg;C</v-col
        >
        <v-col cols="6">
          <v-img :src="currentWeatherIcon" width="92"></v-img>
        </v-col>
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-windsock</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle
        >{{ weather.current.wind_speed }} km/h</v-list-item-subtitle
      >
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-water-percent</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle
        >{{ weather.current.humidity }}%</v-list-item-subtitle
      >
    </v-list-item>

    <!-- <v-slider
      v-model="time"
      :max="6"
      :tick-labels="labels"
      class="mx-4"
      ticks
    ></v-slider> -->

    <v-list class="transparent">
      <v-list-item
        v-for="dailyWeatherItem in weather.daily"
        :key="dailyWeatherItem.dt"
      >
        <v-list-item-title>
          {{ month[new Date(dailyWeatherItem.dt * 1000).getMonth()] }}
          {{ new Date(dailyWeatherItem.dt * 1000).getDate() }}
        </v-list-item-title>

        <v-list-item-icon>
          <v-img
            :src="
              'http://openweathermap.org/img/wn/' +
              dailyWeatherItem.weather[0].icon +
              '@2x.png'
            "
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
</template>

<script>
export default {
  name: "Weather",

  data() {
    return {
      weekDay: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      month: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    };
  },

  computed: {
    weather() {
      return this.$store.getters.weather;
    },

    city() {
      return this.$store.getters.city;
    },

    currentWeatherIcon() {
      const url = "http://openweathermap.org/img/wn/";
      const icon = this.$store.getters.weather.current.weather[0].icon;
      return url + icon + "@2x" + ".png";
    },
  },

  mounted() {
    this.$store.dispatch("getWeather");
  },
};
</script>
