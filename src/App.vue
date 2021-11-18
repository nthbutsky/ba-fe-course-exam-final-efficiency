<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import { authService } from "./api/authentication";

export default {
  name: "App",

  data: () => ({
    //
  }),

  mounted() {
    authService.checkUserState();
  },
};
</script>
