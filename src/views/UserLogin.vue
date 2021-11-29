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
            <v-btn block color="secondary" type="submit">login</v-btn>
            <v-col>
              <router-link :to="{ name: 'UserSignup' }"
                >Need account?</router-link
              >
              <v-col>
                <v-btn outlined small block color="secondary" @click="LogInTest"
                  >try without account</v-btn
                >
              </v-col>
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
import { mapActions } from "vuex";
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
    ...mapActions(["signInAction"]),

    logIn() {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.signInAction(user);
    },

    LogInTest() {
      const user = {
        email: "test@account.com",
        password: 123456,
      };
      this.signInAction(user);
    },
  },
};
</script>
