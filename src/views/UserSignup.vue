<template>
  <v-app>
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col cols="auto" align="center">
          <v-form @submit.prevent="signUp">
            <p class="font-weight-black text-h4 primary--text">Sign up</p>
            <v-text-field
              type="text"
              placeholder="email"
              v-model="email"
              :rules="emailRules"
              required
            />
            <v-text-field
              type="password"
              placeholder="password"
              v-model="password"
              :rules="passwordRules"
              required
            />
            <v-btn block color="secondary" type="submit">sign Up</v-btn>
            <v-col>
              <router-link :to="{ name: 'UserLogin' }"
                >Already have account?</router-link
              >
              <v-col>
                <v-btn outlined small block color="secondary" @click="LogInTest"
                  >try without account</v-btn
                >
              </v-col>
            </v-col>
            <v-col align="left">
              <v-alert v-if="this.error" type="error">{{ this.error }}</v-alert>
            </v-col>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UserSignup",

  data() {
    return {
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 6) || "Password must be more than 5 characters",
      ],
    };
  },

  computed: {
    ...mapGetters(["error"]),
  },

  methods: {
    ...mapActions(["signUpAction", "signInAction"]),

    signUp() {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.signUpAction(user);
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
