<template>
  <v-app>
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col cols="auto" align="center">
          <v-form @submit.prevent="logIn">
            <p class="font-weight-black text-h4 primary--text">Login</p>
            <v-text-field type="text" placeholder="email" v-model="email" />
            <v-text-field
              type="password"
              placeholder="password"
              v-model="password"
            />
            <v-btn block color="primary" type="submit">login</v-btn>
            <v-col>
              <router-link :to="{ name: 'UserSignup' }"
                >Need account?</router-link
              >
            </v-col>
            <v-col align="left">
              <v-alert v-if="error" type="error">{{ error }}</v-alert>
            </v-col>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { authService } from "../api/authentication";

export default {
  name: "UserLogin",

  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },

  methods: {
    logIn() {
      authService.logIn(this.email, this.password);
    },
  },
};
</script>
