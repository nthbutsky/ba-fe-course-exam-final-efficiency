<template>
  <router-view />
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
