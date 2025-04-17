<template>
  <v-container>
    <h1>📍 Detalles de la URL {{ details.short_code }}</h1>

    <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
    <div v-else>
      <Preview :details="details" />
      <TopComponent :total="details.total" :items="details.items"/>
      <History :items="details.items"/>
    </div>
  </v-container>
</template>
  
<script lang="ts">
  import stats from "../apis/stats";
  import url from "../apis/urls";
  import Preview from '../components/Preview.vue';
  import History from "../components/History.vue";
  import TopComponent from "../components/TopComponent.vue";
  import type { Details } from '../types';

  

export default {
  props: ["id"],

  components: {
    History,
    Preview,
    TopComponent
  },

  data() {
    return {
      details: {} as Details,
      loading: true,
    };
  },
  async created() {
    try {
      const response = await stats.get(`/stats?urlId=${this.id}`);
      const responseUrl = await url.get(`/urls/${this.id}`);

      this.details = responseUrl.data.data;
      this.details.items = response.data.data;
      this.details.total = response.data.total;
    } catch (error) {
      console.error("Error al obtener detalles", error);
    } finally {
      this.loading = false;
    }
  },
};
</script>
