<template>
  <v-app>
    <v-row class="pa-5">
      <v-card
        elevation="12"
        v-for="(item, index) in news.results"
        :key="index"
        class="mx-auto my-5 align-end"
        max-width="344"
      >
        <v-img :src="item.multimedia[0].url" height="200px" class="align-end">
          <v-card-title>
            <v-chip
              class="ma-0"
              color="secondary"
              text-color="white"
              v-text="item.section"
            >
            </v-chip>
          </v-card-title>
        </v-img>

        <v-card-title>
          {{ item.title }}
        </v-card-title>

        <v-card-subtitle>
          {{ item.abstract }}
        </v-card-subtitle>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
          <v-btn
            class="mx-auto"
            outlined
            color="secondary"
            text
            :href="item.url"
          >
            Explore
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Notes",

  computed: {
    ...mapGetters(["news"]),
  },

  methods: {
    ...mapActions(["getNews"]),
  },

  mounted() {
    this.getNews();
  },
};
</script>
