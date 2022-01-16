<template>
  <v-app>
    <v-row v-if="this.news" class="pa-5">
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

        <v-card-subtitle class="mb-4">
          {{ item.abstract }}
        </v-card-subtitle>

        <v-card-actions>
          <v-btn
            class="mx-auto"
            outlined
            rounded
            color="secondary"
            text
            absolute
            bottom
            right
            :href="item.url"
          >
            Read more
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
