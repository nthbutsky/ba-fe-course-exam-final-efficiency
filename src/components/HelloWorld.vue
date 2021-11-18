<template>
  <v-container>
    <v-row>
      <v-col align="end">
        <v-btn @click.prevent="logOut" color="primary">Log Out</v-btn>
      </v-col>
    </v-row>
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col>
          <v-img
            :src="require('../assets/logo.svg')"
            class="my-3"
            contain
            height="200"
        /></v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { authService } from "../api/authentication";
export default {
  name: "HelloWorld",

  data: () => ({}),

  methods: {
    logOut() {
      authService.logOut();
      this.$router.push("/login");
    },
  },
};
</script>
