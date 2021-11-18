<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="auto" align="center">
        <v-form @submit.prevent="signUp">
          <p class="font-weight-black text-h4 primary--text">Sign up</p>
          <v-text-field type="text" placeholder="email" v-model="email" />
          <v-text-field
            type="password"
            placeholder="password"
            v-model="password"
          />
          <v-btn block color="primary" type="submit">sign Up</v-btn>
          <v-col>
            <router-link :to="{ name: 'UserLogin' }"
              >Already have account?</router-link
            >
          </v-col>
          <v-col align="left">
            <v-alert v-if="error" type="error">{{ error }}</v-alert>
          </v-col>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { authService } from "../api/authentication";

export default {
  name: "UserSignup",

  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },

  methods: {
    signUp() {
      authService.signUp(this.email, this.password);
      this.$router.push("/");
    },
  },
};
</script>
